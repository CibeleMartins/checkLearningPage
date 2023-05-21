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
export class AuthService {
  timeoutInterval: any;
  userSubject: Subject<AuthResponseData> = new Subject();
  
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      desenv.apiAuth,
      {
        emailUser: email,
        passwordUser: password
      }
    );
  }


  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        true
      );
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }

    this.userSubject.next( {	expiresIn: false,
      tokenAuthorization: '',
        user: {
        id: null,
        nameUser: '',
        emailUser: '',
        photoUser:'',
        dateRegister: '',
        isLogged: false
      }})
  }
}
