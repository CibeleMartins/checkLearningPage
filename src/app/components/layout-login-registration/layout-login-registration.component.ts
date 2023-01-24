import { Component, OnInit, Output } from '@angular/core';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-layout-login-registration',
  templateUrl: './layout-login-registration.component.html',
  styleUrls: ['./layout-login-registration.component.css']
})
export class LayoutLoginRegistrationComponent implements OnInit {

  @Output() snackbar!: boolean;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnack(data: any) {

    if (data) {
      this._snackBar.open('Cannonball!!', 'Splash', {
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      console.log('dsdgsdgs')
    }
    
  }

}
