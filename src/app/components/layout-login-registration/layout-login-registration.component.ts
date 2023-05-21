import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { SnackBarService } from 'src/app/services/SnackbarFeedback.service';
import { AuthService } from 'src/app/services/auth.service';

// import {
//   MatSnackBar,
//   MatSnackBarHorizontalPosition,
//   MatSnackBarVerticalPosition,
// } from '@angular/material/snack-bar';

@Component({
  selector: 'app-layout-login-registration',
  templateUrl: './layout-login-registration.component.html',
  styleUrls: ['./layout-login-registration.component.css'],
})
export class LayoutLoginRegistrationComponent implements OnInit, OnChanges {
  @Input() viewSnackbar!: boolean;
  @Input() message!: string;
  @Input() icon!: string;
  @Input() imageIsHidden!: boolean;
  
  constructor(private feedbackService: SnackBarService, private authService: AuthService) {}

  ngOnInit(): void {
 
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    // console.log(this.viewSnackbar);
    if (this.viewSnackbar) {
      this.feedbackService.openSnackBar(null, null, null, this.message, this.icon)
  
    }
  }

  logout() {
    this.authService.logout()
  }
}
