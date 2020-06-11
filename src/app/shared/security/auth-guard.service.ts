import { GamesService } from './../../games-list/services/games.service';
import { AuthenticationService } from './../../games-list/services/authentication.service';
// import { AuthGuardService } from './auth-guard.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
    
    return this.gamesService.getIsAuth().pipe(
      map((res: any) => { 
        console.log('AuthGuard result is == ' + res.tokenValidity);
        let validity = Boolean(res.tokenValidity);
        
        if(validity == true) {
          return true;
        }
        
        this.router.navigate(['/login']);
        return false; 
      
      }),
      catchError((err) => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );

  }

}
