import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/UserService.service';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor( private router: Router, private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userEmail': new FormControl(
        'cibeleadmin@hotmail.com',
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

    }

    this.authService.login(this.signupForm.get('userEmail').value, this.signupForm.get('userPassword').value).subscribe({
      next: (data)=>{this.authService.setUserInLocalStorage(this.userService.formatUser(data)), data.user.isLogged = true, this.authService.userSubject.next(data)},
      error: (error)=>{alert(`Erro no login: ${error}`)},
      complete:()=>{this.router.navigate(['/anotacoes'])}
    })

    this.router.navigate(['/anotacoes'])
    
  }
}
