import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Output() fileUploaded = new EventEmitter<File>();
  selectedFile!: File;

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, 'UTF-8');
    fileReader.onload = () => {
      this.fileUploaded.emit(this.selectedFile)
      this.snackBar.open('File uploaded successfully', 'Close', {duration: 2000});
    };
    fileReader.onerror = (error) => {
      console.log(error);
      this.snackBar.open('Error while reading files', 'Close', {
        duration: 2000,
      });
    }
  }
}
