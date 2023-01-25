import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarFeedbackComponent } from '../components/snackbar-feedback/snackbar-feedback.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(
    hPosition?: any,
    vPosition?: any,
    style?: any,
    data?: any,
    icon?: string
  ) {
    this.snackBar.openFromComponent(SnackbarFeedbackComponent, {
      data: [data, icon],
      duration: 1500,
      horizontalPosition: hPosition ? hPosition : 'end',
      verticalPosition: vPosition ? vPosition : 'top',
      panelClass: style,
    });
  }

  closeSnackbar() {
    this.snackBar.dismiss();
  }
}
