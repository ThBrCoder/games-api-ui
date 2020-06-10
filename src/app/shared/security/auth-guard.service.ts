import { GamesService } from './../../games-list/services/games.service';
import { AuthenticationService } from './../../games-list/services/authentication.service';
// import { AuthGuardService } from './auth-guard.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private gamesService: GamesService,
    private router: Router) {

  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | 
  import("@angular/router").UrlTree | 
  import("rxjs").Observable<boolean | 
  import("@angular/router").UrlTree> | 
  Promise<boolean | 
  import("@angular/router").UrlTree> {

    // const isAuth = this.authService.getIsAuth(); // Need to create service which will call for token

    const isAuth = this.gamesService.getIsAuth();

    if(!isAuth) {
      this.router.navigate(['/login']);
    }

    // return isAuth;
    return true;
  }


}
