import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FilesService, MyFile} from "../../files.service";

@Component({
  selector: 'app-files-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {
  files: MyFile[] = [];
  @Output() uploadedFiles = new EventEmitter<MyFile[]>();
  displayedColumns: string[] = ['name', 'size', 'actions'];
  isLoading:boolean = false;

  constructor(private fileService: FilesService) {
  }

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): void {
    this.isLoading = true;
    this.fileService.getFiles().subscribe({
        next: files => this.files = files,
        error: error => console.error(error),
        complete: () => this.isLoading = false
      });
    this.uploadedFiles.emit(this.files);
  }

  downloadFile(file: MyFile): void {
    this.isLoading = true;
    this.fileService.downloadFile(file).subscribe({
        next: data => {
          const blob = new Blob([data], {type: 'text/csv'});
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = file.name;
          link.click();
        },
        error: error => console.error(error),
        complete: () => this.isLoading = false
      });
  }

  deleteFile(fileId: string): void {
    this.isLoading = true;
    this.fileService.deleteFile(fileId).subscribe(
      {
        next: () => this.getFiles(),
        error: error => console.error(error),
        complete: () => this.isLoading = false
      }
    );
  }


  convertToJson(file: MyFile): void {
    this.isLoading = true;
    this.fileService.convertToJson(file).subscribe(
      {
        next: () => this.getFiles(),
        error: error => console.error(error),
        complete: () => this.isLoading = false
      }
    );
  }


}
