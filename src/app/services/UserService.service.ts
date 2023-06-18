import { User } from '../interfaces/user.model';
import { Subject } from 'rxjs';
import { desenv } from 'src/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponseData } from '../interfaces/AuthResponseData.model';
import { UserRegistered } from '../interfaces/interfacesUser';
import { SnackBarService } from './SnackbarFeedback.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  userSubject: Subject<AuthResponseData> = new Subject();


  constructor(private http: HttpClient, private feedbackService: SnackBarService) { }

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
    return this.http.post(desenv.apiRegister, dataUserRegistered)
  }

}
