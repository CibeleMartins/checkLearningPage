import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/UserService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signupForm!: FormGroup;
  viewSnackbar: boolean = false;
  messageSnackBar!: string;
  warningIcon!: string;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userEmail': new FormControl(
        null,
        [Validators.required, Validators.email, this.emailValidator.bind(this)],
        null
      ),
      'userPassword': new FormControl(null, [
        Validators.required,
        this.passwordValidator.bind(this),
      ]),
    });
  }

  emailValidator(control: FormControl): { [s: string]: boolean } {
    // console.log(control)
    if (
      control.value &&
      control.errors &&
      control.errors['email'] &&
      control.value.length > 4
    ) {
      this.viewSnackbar = !this.viewSnackbar;
      this.messageSnackBar = 'E-mail inválido.';
      this.warningIcon = '../../../assets//warningIcon.png';

      return { emailInvalid: true };
    }

    return null;
  }

  passwordValidator(control: FormControl): { [s: string]: boolean } {
    setTimeout(() => {
      if (control.value && control.value.length < 6) {
        this.viewSnackbar = !this.viewSnackbar;
        this.messageSnackBar = 'Senha inválida.';
        this.warningIcon = '../../../assets//warningIcon.png';
      }
    }, 1500);

    return null;
  }

  signUp() {
    if (this.signupForm.invalid) {
      this.viewSnackbar = !this.viewSnackbar;
      this.messageSnackBar = 'Campos do formulário inválidos.';
      this.warningIcon = '../../../assets//warningIcon.png';
    } else {
      this.viewSnackbar = !this.viewSnackbar;
      this.messageSnackBar = 'Login realizado com sucesso!';
      this.warningIcon = '../../../assets//successIcon.png';
     
      setTimeout(()=> {
         this.signupForm.reset();
      }, 1000)

      this.userService.login()
      console.log(this.userService.isloggedIn)
      this.router.navigate(['/anotacoes'])
    }

    
  }
}
