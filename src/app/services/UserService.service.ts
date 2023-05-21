import { User } from '../interfaces/user.model';
import { Observable, Subject, observable } from 'rxjs';
import { desenv } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthResponseData } from '../interfaces/AuthResponseData.model';
import { UserRegistered } from '../interfaces/interfacesUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  timeoutInterval: any;
  userSubject: Subject<AuthResponseData> = new Subject();
  
  constructor(private http: HttpClient) {}

  formatUser(data: AuthResponseData) {
    const user = new User(
      data.user.emailUser,
      data.tokenAuthorization,
      data.user.id,
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

}
