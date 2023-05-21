import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthResponseData } from '../interfaces/AuthResponseData.model';


@Injectable()
export class MainlGuard implements CanActivate {
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
          console.log('profile guard depois de clicar logout: ', this.profile)
            this.router.navigate(['/login']);
            return '';
          } else {
            return this.authService.getUserFromLocalStorage().userIsLogged;
          };
    
    })

    console.log(this.authService.getUserFromLocalStorage().userIsLogged)
    return this.authService.getUserFromLocalStorage().userIsLogged;
  }
}