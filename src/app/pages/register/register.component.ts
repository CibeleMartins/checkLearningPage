import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  signupForm!: FormGroup;
  viewSnackbar: boolean = false;
  messageSnackBar!: string;
  warningIcon!: string;

  constructor() { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'completeName': new FormControl('', [Validators.required, Validators.minLength(10), this.completeNameValidator.bind(this)], null),
      'email': new FormControl('', [Validators.required, Validators.email, this.emailValidator.bind(this)], null),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)], null),
      'confirmationPassword': new FormControl('', [Validators.required], null),
    })
  }

  completeNameValidator(control: FormControl): {[s: string]: boolean} {

    setTimeout(()=>{
      if(control.errors) {
        this.viewSnackbar = !this.viewSnackbar;
        this.messageSnackBar = 'O nome completo muito pequeno.';
        this.warningIcon = '../../../assets//warningIcon.png';
        // return{'minLengthPasswordError': true}
      }
     
    }, 5000)

    
    console.log(control)
   

    return null;
  }

  emailValidator(control: FormControl): { [s: string]: boolean } {

    // console.log(control)
    if (
      control.value && control.errors &&
     control.errors['email']
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
        this.messageSnackBar = 'Senha muito pequena.';
        this.warningIcon = '../../../assets//warningIcon.png';
      }
    }, 3000);

    return null;
  }

}
