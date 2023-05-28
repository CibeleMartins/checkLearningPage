import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { SnackBarService } from 'src/app/services/SnackbarFeedback.service';
import { AuthService } from 'src/app/services/auth.service';


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
  @Input() changeClasses!: boolean;
  @Input() styles!: Partial<CSSStyleDeclaration>;
  @Input() optionsLottie!: AnimationOptions;

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
