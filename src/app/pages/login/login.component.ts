import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { UserService } from 'src/app/services/UserService.service';
import { AuthService } from 'src/app/services/Auth.service';
import { SnackBarService } from 'src/app/services/SnackbarFeedback.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signupForm!: FormGroup;
  isFirstLoginOfUser!: boolean;
  styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '100vh',
    width: '80vh',
    paddingRight: '7%',
  };
  options: AnimationOptions = {
    path: '/assets/lottie-login-2.json',
  };
  constructor(private router: Router, private authService: AuthService, private userService: UserService, private feedbackService: SnackBarService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userEmail': new FormControl(
        'cibeletlogin11@hotmail.com',
        [Validators.required, Validators.email, this.emailValidator.bind(this)],
        null
      ),
      'userPassword': new FormControl('12345678', [
        Validators.required,
        this.passwordValidator.bind(this),
      ]),
    });
  }

  emailValidator(control: FormControl): { [s: string]: boolean } {
    if (
      control.value &&
      control.errors &&
      control.errors['email'] &&
      control.value.length > 4
    ) {
      this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({ viewSnackbar: true, message: 'E-mail inválido', icon: '../../../assets//warningIcon.png' })
      return { emailInvalid: true };
    }

    return null;
  }

  passwordValidator(control: FormControl): { [s: string]: boolean } {
    setTimeout(() => {
      if (control.value && control.value.length < 6) {
        this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({ viewSnackbar: true, message: 'Senha inválida', icon: '../../../assets//warningIcon.png' })
      }
    }, 1500);

    return null;
  }

  signUp() {
    if (this.signupForm.invalid) {
      this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({ viewSnackbar: true, message: 'Campos do formulário inválidos.', icon: '../../../assets//warningIcon.png' })
    } else {
      this.authService.login(this.signupForm.get('userEmail').value, this.signupForm.get('userPassword').value).subscribe({
        next: (data) => { this.authService.setUserInLocalStorage(this.userService.formatUser(data)), data.user.isLogged = true, this.authService.userSubject.next(data), this.isFirstLoginOfUser = data.user.isFirstLogin },
        error: (e) => {
          this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({ viewSnackbar: true, message: e.error.message, icon: '../../../assets//warningIcon.png' })
        },
        complete: () => {
          this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({ viewSnackbar: true, message: 'Login realizado com sucesso!', icon: '../../../assets//successIcon.png' })
          setTimeout(() => {
            this.signupForm.reset();
            if (this.isFirstLoginOfUser) {
              this.router.navigate(['/seja-bem-vindo'])
            } else {
              this.router.navigate(['/anotacoes'])
            }
          }, 1000)

        }
      })
    }
  }
}
