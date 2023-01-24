import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signupForm!: FormGroup;
  viewSnackbar: boolean = false;
  messageSnackBar!: string;

  constructor() {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userEmail: new FormControl(null, [Validators.required, Validators.email]),
      userPassword: new FormControl(null, Validators.minLength(6)),
    });
  }

  signUp() {
    if (
      // this.signupForm.get('userEmail')?.invalid &&
      // this.signupForm.get('userPassword')?.invalid &&
      // this.signupForm.get('userEmail')?.touched &&
      // this.signupForm.get('userPassword')?.touched
      this.signupForm.invalid
    ) {
      this.viewSnackbar = !this.viewSnackbar;
      this.messageSnackBar = 'Campos do formulário inválidos.'
    }

    if (this.signupForm.get('userEmail')?.invalid && this.signupForm.get('userEmail')?.touched) {
      this.viewSnackbar = !this.viewSnackbar;
      this.messageSnackBar = 'E-mail inválido.'
    }
    if (this.signupForm.get('userPassword')?.invalid && this.signupForm.get('userPassword')?.touched) {
      this.viewSnackbar = !this.viewSnackbar;
      this.messageSnackBar = 'Senha inválida.'
    }
  }
}
