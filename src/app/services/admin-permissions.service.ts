import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable, map, of, switchMap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminPermissionsService implements CanActivate {
blah2: any;
  constructor(private authService: AuthenticationService, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.getAuthState().pipe(
      switchMap(user => user ? this.userService.get(user.uid).valueChanges() : of(null)),
      map(appUser => appUser ? appUser.isAdmin : false
      ));
  }
}
