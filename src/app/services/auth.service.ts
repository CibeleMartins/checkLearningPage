import { User } from './../models/user.model';
import { Observable } from 'rxjs';
import { desenv } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { autoLogout } from '../auth/state/auth.actions';
import { AuthResponseData } from '../models/AuthResponseData.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any;
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      desenv.apiAuth,
      {
        emailUser: email,
        passwordUser: password
      }
    );
  }

  // signUp(email: string, password: string): Observable<AuthResponseData> {
  //   return this.http.post<AuthResponseData>(
  //     'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=rerhhdhdhdfhdfh',
  //     { email, password, returnSecureToken: true }
  //   );
  // }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() * 1000 - 10000000
    );
    const user = new User(
      data.user.emailUser,
      data.tokenAuthorization,
      data.user.id,
      expirationDate
    );
    return user;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;
    console.log('tempo de intervalo: ', timeInterval)
    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout());
      //logout functionality or get the refresh token
    }, timeInterval);
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
        expirationDate
      );
      this.runTimeoutInterval(user);
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
  }
}
