import {Component, EventEmitter, Output} from '@angular/core';
import {MaterialService} from "../../../../shared/material/material.service";
import {FilesService} from "../../files.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  selectedFile!: File;
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private readonly _materialService: MaterialService,
              private readonly _fileService: FilesService) {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    this.isLoading.emit(true);
    this._fileService.uploadFile(this.selectedFile).subscribe(
      {
        next: () => {
          this._materialService.openSnackBar("File uploaded successfully please refresh the page to see the changes", "Close");
          this.isLoading.emit(false);
        },
        error: (error) => {
          console.error(error);
          this._materialService.openSnackBar("Error uploading file", "Close");
          this.isLoading.emit(false);
        },
        complete: () => this.isLoading.emit(false)
      }
    )
  }
}
