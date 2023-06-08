import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './Auth.service';
import { AuthResponseData } from '../interfaces/AuthResponseData.model';


@Injectable()
export class AuthGuard implements CanActivate {
  profile: AuthResponseData;
  routeActivator: boolean = true;
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    this.authService.userSubject.subscribe((user)=> {
        this.profile = user;
        if (!this.profile.tokenAuthorization.includes("Bearer")) {
            this.router.navigate(['/login']);
            return '';
          } else {
            return this.authService.getUserFromLocalStorage().userIsLogged;
          };
    
    })

    return this.authService.getUserFromLocalStorage().userIsLogged;
  }
}