import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./UserService.service";
import { Injectable } from "@angular/core";

@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authService: UserService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
       return this.authService.isAthenticated().then((authenticated)=> {
            if(authenticated) {
                return true;
            } else {
               return this.router.navigate(['/'])
            }
        })

    }


    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
        return this.canActivate(route, state);
    }
}