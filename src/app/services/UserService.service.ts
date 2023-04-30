import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { desenv } from 'src/environment/environment';

import { UserRegistered } from '../interfaces/interfacesUser';


import { HttpHeaders } from '@angular/common/http';

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
  isloggedIn: boolean = false;

  headers = new HttpHeaders().append('Access-Control-Allow-Origin', 'http://localhost:4200/').append('Access-Control-Allow-Methods', 'POST');
  constructor(private http: HttpClient) { }

  isAthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.isloggedIn);
        }, 800)
      }
    )

    return promise;
  }

  login(emailUser: string, passwordUser: string) {
    console.log(emailUser, passwordUser)
    this.http.post(desenv.apiAuth, { emailUser: emailUser, passwordUser: passwordUser }, { headers: this.headers }).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
      complete: () => {
        console.log('Usuário autenticado com sucesso!')
        this.isloggedIn = true;
      }
    })

  }


  logout() {
    this.isloggedIn = false;
  }

  register(dataUserRegistered: UserRegistered) {
    this.http.post(desenv.apiRegister, dataUserRegistered).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
      complete: () => console.log('Usuário registrado com sucesso!')
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
