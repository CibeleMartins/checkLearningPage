import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-layout-login-registration',
  templateUrl: './layout-login-registration.component.html',
  styleUrls: ['./layout-login-registration.component.css'],
})
export class LayoutLoginRegistrationComponent implements OnInit, OnChanges {
  @Input() viewSnackbar!: boolean;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    // console.log(this.viewSnackbar);
    if (this.viewSnackbar) {
      this._snackBar.open('Cannonball!!', 'Splash', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
  
    }
  }
}
