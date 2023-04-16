import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { UserRegistered } from '../interfaces/interfacesUser';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private annotationsUser: {
    idUser: number;
    title: string;
    date: string;
    description: string;
    annotation: string;
    color: string;
  }[] = [];

  constructor(private http: HttpClient) {}

  login() {

  }

  register (dataUserRegistered: UserRegistered) {
    this.http.post(environment.development.apiRegister, dataUserRegistered).subscribe({
      next: (data)=> console.log(data),
      error: (error)=> console.log(error),
      complete: ()=> console.log('Usuário registrado com sucesso!')
    })
  }

  registerAnnotationUser(annotation: {
    idUser: number;
    title: string;
    date: string;
    description: string;
    annotation: string;
    color: string;
  }) {
    this.annotationsUser.push(annotation);
    console.log(this.annotationsUser)
  }

  getAnnotationsUser() {
    console.log(this.annotationsUser.slice())
    return this.annotationsUser;
  }
}
