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

  constructor() {}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userEmail: new FormControl(null, [Validators.required, Validators.email]),
      userPassword: new FormControl(null, Validators.minLength(6)),
    });
  }

  signUp() {
    if (this.signupForm.get('userEmail')?.invalid && this.signupForm.get('userEmail')?.invalid) {
        this.viewSnackbar = !this.viewSnackbar
    }
  }
}
