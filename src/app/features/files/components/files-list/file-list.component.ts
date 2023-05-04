import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FilesService} from "../../files.service";
import {MyFile} from "../../models/MyFile";
import {Subscription} from "rxjs";
import {MaterialService} from "../../../../shared/material/material.service";

@Component({
  selector: 'app-files-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit, OnDestroy, OnChanges {
  displayedColumns: string[] = ['name', "size", 'actions'];
  @Input() isLoading: boolean = false;
  @Input() isFileUploaded: boolean = false;
  files: MyFile[] = [];
  subscription: Array<Subscription> = [];

  constructor(private readonly _fileService: FilesService,
              private readonly _materialService: MaterialService) {
  }

  ngOnInit(): void {
    this.getFiles();
  }

  ngOnChanges() {
    console.log(this.isFileUploaded)
    if (!this.isFileUploaded) return;
    this.getFiles();
    this.isFileUploaded = false;
  }

  private getFiles() {
    console.log("get files")
    this.isLoading = true;
    this.subscription.push(this._fileService.getFiles().subscribe({
        next: (files) => {
          this.files = files;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        },
        complete: () => this.isLoading = false
      })
    )
  }

  downloadFile(fileName: string) {
    this.isLoading = true;
    this.subscription.push(this._fileService.downloadFile(fileName).subscribe({
      next: (response) => window.open(response.url),
      error: (error) => console.error(error),
      complete: () => this.isLoading = false
    }))
  }

  deleteFile(fileName: string) {
    this.subscription.push(this._materialService.openDialog({
      title: "Delete File",
      message: "Are you sure you want to delete this file?"
    }).subscribe(
      (result: boolean) => {
        if (!result) return;
        this.deleteFileConfirm(fileName);
      }
    ))
  }

  deleteFileConfirm(fileName: string) {
    this.isLoading = true;
    this.subscription.push(this._fileService.deleteFile(fileName).subscribe({
      next: () => {
        this._materialService.openSnackBar("File deleted successfully");
        this.getFiles();
      },
      error: (error) => {
        console.error(error);
        this._materialService.openSnackBar("Error deleting file");
        this.isLoading = false;
      },
      complete: () => this.isLoading = false
    }))
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
