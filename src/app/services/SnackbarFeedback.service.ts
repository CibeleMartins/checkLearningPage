import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarFeedbackComponent } from '../components/snackbar-feedback/snackbar-feedback.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {


  sendValuesForSnackbarFeedbackComponent = new Subject<{viewSnackbar:boolean, message:string, icon:string}>();

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(
    hPosition?: any,
    vPosition?: any,
    style?: any,
    data?: any,
    icon?: string
  ) {
    console.log('icon snackbarservice', icon);
    this.snackBar.openFromComponent(SnackbarFeedbackComponent, {
      data: [data, icon],
      duration: 2000,
      horizontalPosition: hPosition ? hPosition : 'end',
      verticalPosition: vPosition ? vPosition : 'top',
      panelClass: style,
    });
  }

  closeSnackbar() {
    this.snackBar.dismiss();
  }
}
