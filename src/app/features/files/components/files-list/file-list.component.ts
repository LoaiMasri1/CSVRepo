import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilesService} from "../../files.service";
import {MyFile} from "../../models/MyFile";
import {Observable, Subscription} from "rxjs";
import {MaterialService} from "../../../../shared/material/material.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "../../../../shared/material/components/dialog/dialog.component";
import {DialogOptions} from "../../../../shared/material/models/dialog";

@Component({
  selector: 'app-files-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', "size", 'actions'];
  isLoading: boolean = false;
  files: MyFile[] = [];
  public dialogRef!: MatDialogRef<DialogComponent>;
  subscription: Array<Subscription> = [];

  constructor(private readonly _fileService: FilesService,
              private readonly _materialService: MaterialService) {
  }

  ngOnInit(): void {
    this.getFiles();
  }

  private getFiles() {
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
      {
        next: (result: boolean) => {
          if (!result) return;
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
      }
    ))
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
