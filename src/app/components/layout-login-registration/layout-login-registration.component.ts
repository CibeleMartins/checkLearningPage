import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { SnackBarFeedbackService } from 'src/app/services/SnackbarFeedback.service';
import { AuthService } from 'src/app/services/Auth.service';
import { SnackbarConfirmationDeleteComponent } from '../snackbar-confirmation-delete/snackbar-confirmation-delete.component';
import { SnackbarFeedbackComponent } from '../snackbar-feedback/snackbar-feedback.component';


@Component({
  selector: 'app-layout-login-registration',
  templateUrl: './layout-login-registration.component.html',
  styleUrls: ['./layout-login-registration.component.css'],
})
export class LayoutLoginRegistrationComponent implements OnInit {
  @Input() imageIsHidden!: boolean;
  @Input() changeClasses!: boolean;
  @Input() styles!: Partial<CSSStyleDeclaration>;
  @Input() optionsLottie!: AnimationOptions;

  constructor(private feedbackService: SnackBarFeedbackService, private authService: AuthService) { }

  ngOnInit(): void {
    this.feedbackService.sendValuesForSnackbarFeedbackComponent.subscribe({
      next: (data) => {
        console.log('dados do feedback component no layout login registration', data)
        if (data.viewSnackbar && !data.isConfirmationDelete) {
          this.feedbackService.openSnackBar(null, null, null, null, data.message, data.icon, null, null,  SnackbarFeedbackComponent)

        } else {
          this.feedbackService.openSnackBar('center', 'top', 'container-snackbar-confirmation-delete', 15000, data.message, data.icon, data.idAnnotationClicked, data.index, SnackbarConfirmationDeleteComponent)
        }
      },
      error: (e) => console.log(e),
      complete: () => console.log('complete infos feedback component no layout login registration')
    })
  }

  logout() {
    this.authService.logout()
  }
}
