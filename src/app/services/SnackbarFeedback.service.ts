import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackbarFeedbackComponent } from '../components/snackbar-feedback/snackbar-feedback.component';
import { Subject } from 'rxjs';
import { SnackbarConfirmationDeleteComponent } from '../components/snackbar-confirmation-delete/snackbar-confirmation-delete.component';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class SnackBarFeedbackService {


  sendValuesForSnackbarFeedbackComponent = new Subject<{viewSnackbar:boolean, message:string, icon:string, isConfirmationDelete?: boolean, idAnnotationClicked?: number, index?: number}>();

  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(
    hPosition?: any,
    vPosition?: any,
    style?: any,
    duration?: number,
    data?: any,
    icon?: string,
    idAnnotationClicked?: number, index?: number,
    component?: ComponentType<SnackbarFeedbackComponent | SnackbarConfirmationDeleteComponent>
  ) {
    console.log('icon snackbarservice', icon);
    this.snackBar.openFromComponent(component,{
      data: [data, icon, idAnnotationClicked, index],
      duration: duration ? duration : 2000,
      horizontalPosition: hPosition ? hPosition : 'end',
      verticalPosition: vPosition ? vPosition : 'top',
      panelClass: style ? style : '',
      
    });
  }
  closeSnackbar() {
    this.snackBar.dismiss();
  }
}
