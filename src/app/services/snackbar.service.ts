import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  config: MatSnackBarConfig<any> = {
    duration: 5 * 1000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  };


  constructor(private _snackBar: MatSnackBar) {
  }

  openSnackBar(mensaje: string, action?: string) {
    this._snackBar.open(mensaje, action, this.config);
  }
}
