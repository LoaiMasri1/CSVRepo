import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogOptions} from "./models/dialog";
import {Observable} from "rxjs";
import {DialogComponent} from "./components/dialog/dialog.component";

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private dialogRef!: MatDialogRef<DialogComponent>;

  constructor(private readonly _snackBar: MatSnackBar, private _dialog: MatDialog) {
  }

  openSnackBar(message: string, action: string = "Close", duration: number = 2000) {
    this._snackBar.open(message, action, {duration});
  }

  openDialog(options: DialogOptions): Observable<boolean> {

    this.dialogRef = this._dialog.open(DialogComponent, {
        width: '250px',
        data: {
          title: options.title,
          message: options.message,
          confirmText: options.confirmText || "Yes",
          cancelText: options.cancelText || "Cancel"
        }
      }
    );

    return this.dialogRef.afterClosed();
  }
}
