import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate, 
    Router, 
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})

export class AuthGuardActivate implements CanActivate {
    constructor(private userService: UserService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): 
    boolean 
    | UrlTree 
    | Observable<boolean | UrlTree> 
    | Promise<boolean | UrlTree> {
        if(this.userService.isLoggedIn) {
            return true;
        } else {
            this.router.navigate(["login"]);
            return false ;
        }
    }
}