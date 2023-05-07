import { exhaustMap, map } from 'rxjs/operators';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { isAuthenticated } from '../auth/state/auth.selector';
import { UserService } from './UserService.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router, private userService: UserService, private authService: AuthService) { }
  persistInAnnotationsRoute: boolean = true;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):| boolean| UrlTree| Observable<boolean | UrlTree>| Promise<boolean | UrlTree> {
    return this.store.select(isAuthenticated).pipe(
      map((authenticate) => {
        if (!authenticate && typeof this.authService.getUserFromLocalStorage().userId === 'number' ) {
          return this.router.createUrlTree(['auth']);
        }
        return true;
      })
    );
  }
}