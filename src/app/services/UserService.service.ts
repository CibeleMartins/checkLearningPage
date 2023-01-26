import { Injectable } from '@angular/core';

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
  }[] = [];

  constructor() {}

  receiveAnnotationUser(annotation: {
    idUser: number;
    title: string;
    date: string;
    description: string;
    annotation: string;
  }) {
    this.annotationsUser.push(annotation);
    console.log(this.annotationsUser)
  }

  getAnnotationsUser() {
    console.log(this.annotationsUser.slice())
    return this.annotationsUser;
  }
}
