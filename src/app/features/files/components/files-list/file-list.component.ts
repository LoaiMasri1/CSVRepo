import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FilesService} from '../../files.service';
import {MyFile} from '../../models/MyFile';
import {Subscription} from 'rxjs';
import {MaterialService} from '../../../../shared/material/material.service';
import {UserRole} from 'src/app/features/auth/models/enum/role.enum';

@Component({
  selector: 'app-files-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'size', 'actions'];
  @Input() isLoading: boolean = false;
  files: MyFile[] = [];
  subscription: Array<Subscription> = [];
  userRole: UserRole = UserRole.READ;

  constructor(
    private readonly _fileService: FilesService,
    private readonly _materialService: MaterialService
  ) {
  }

  ngOnInit(): void {
    this.getFiles();
    this.userRole = JSON.parse(localStorage.getItem('payload') || '{}')[
      'custom:role'
      ] as UserRole;
  }

  private getFiles() {
    this.isLoading = true;
    this.subscription.push(
      this._fileService.getFiles().subscribe({
        next: (files) => {
          this.files = files;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
          this.isLoading = false;
        },
        complete: () => (this.isLoading = false),
      })
    );
  }

  downloadFile(fileName: string) {
    this.isLoading = true;
    this.subscription.push(
      this._fileService.downloadFile(fileName).subscribe({
        next: (response) => window.open(response.url),
        error: (error) => console.error(error),
        complete: () => (this.isLoading = false),
      })
    );
  }

  deleteFile(fileName: string) {
    this.subscription.push(
      this._materialService
        .openDialog({
          title: 'Delete File',
          message: 'Are you sure you want to delete this file?',
        })
        .subscribe((result: boolean) => {
          if (!result) return;
          this.deleteFileConfirm(fileName);
        })
    );
  }

  deleteFileConfirm(fileName: string) {
    this.isLoading = true;
    this.subscription.push(
      this._fileService.deleteFile(fileName).subscribe({
        next: () => {
          this._materialService.openSnackBar('File deleted successfully');
          this.files = this.files.filter((file) => file.fileName !== fileName);
        },
        error: (error) => {
          console.error(error);
          this._materialService.openSnackBar('Error deleting file');
          this.isLoading = false;
        },
        complete: () => (this.isLoading = false),
      })
    );
  }

  exportFile(fileName: string) {
    this.isLoading = true;
    this.subscription.push(
      this._fileService.exportFile(fileName).subscribe({
        next: (response) => {
          const json = JSON.stringify(response, null, 2);
          const blob = new Blob([json], {type: 'application/json'});
          const url = window.URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.download = `${fileName.split('.')[0]}.json`;
          anchor.href = url;
          anchor.click();
        },
        error: (error) => console.error(error),
        complete: () => (this.isLoading = false),
      })
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
