import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: any, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.getAuthState().pipe(
      map(user => {
        if (user) {
          return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      })
    );
  }
}
