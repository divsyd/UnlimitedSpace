import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AccountServiceService} from '../servers/account/account-service.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authservice: AccountServiceService,
              private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuth = this.authservice.getIsAuth();
    if (!isAuth) {
      this.router.navigate(['/users/login']);
    }
    return isAuth;
  }
}
