import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signupForm: FormGroup | undefined;

  constructor() { }

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      'userEmail': new FormControl()
    })
  }

}
