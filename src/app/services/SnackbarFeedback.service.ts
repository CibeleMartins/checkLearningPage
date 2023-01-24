import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarFeedbackComponent } from '../components/snackbar-feedback/snackbar-feedback.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  //create an instance of MatSnackBar

  constructor(private snackBar: MatSnackBar) {}

  /* It takes three parameters 
    1.the message string 
    2.the action 
    3.the duration, alignment, etc. */

  openSnackBar(
    hPosition?: any,
    vPosition?: any,
    style?: any,
    data?: string
  ) {
    this.snackBar.openFromComponent(SnackbarFeedbackComponent, {
      data: data,
      duration: 5000,
      horizontalPosition: hPosition ? hPosition : 'end',
      verticalPosition: vPosition ? vPosition : 'top',
      panelClass: style,
    });
  }

  closeSnackbar() {
    this.snackBar.dismiss();
  }
}
