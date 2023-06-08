import { User } from '../interfaces/user.model';
import { Observable, Subject, observable } from 'rxjs';
import { desenv } from 'src/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthResponseData } from '../interfaces/AuthResponseData.model';
import { UserRegistered } from '../interfaces/interfacesUser';
import { AnnotationModel } from '../interfaces/AnnotationModel.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userSubject: Subject<AuthResponseData> = new Subject();
  newAnnotations: Subject<AnnotationModel[]> = new Subject();
  
  constructor(private http: HttpClient, private authService: AuthService) {}

  formatUser(data: AuthResponseData) {
    const user = new User(
      data.user.emailUser,
      data.tokenAuthorization,
      data.user.id,
      true
    );
    return user;
  }

  register(dataUserRegistered: UserRegistered) {
    this.http.post(desenv.apiRegister, dataUserRegistered).subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log(error),
      complete: () => console.log('Usuário registrado com sucesso!')
    })
  }

  registerAnnotationUser(annotation: AnnotationModel) {
    const user = this.authService.getUserFromLocalStorage()
    let headerObj = new HttpHeaders().set("Authorization", user.userToken)
    return  this.http.post(desenv.apiAnnotations, annotation, {headers:headerObj})
  }

  getAnnotationsOfUser() {
    const user = this.authService.getUserFromLocalStorage()
    let headerObj = new HttpHeaders().set("Authorization", user.userToken)
    return this.http.get(desenv.apiAnnotations, {headers:headerObj})
  }
}
