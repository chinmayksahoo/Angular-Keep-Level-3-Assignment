import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private authServ: AuthenticationService, public routeServ: RouterService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const booleanPromise = this.authServ.isUserAuthenticated(this.authServ.getBearerToken());
      return booleanPromise.then((authenticated) => {
        if (!authenticated) {
          this.routeServ.routeToLogin();
        }
        return authenticated;
      });
  }
}
