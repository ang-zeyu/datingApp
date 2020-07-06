import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user/user.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import alertify from 'alertifyjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MemberEditResolver implements Resolve<User> {
  constructor(private userService: UserService, private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.username).pipe(map(user => {
      user.lastActive = new Date(user.lastActive);
      user.created = new Date(user.created);
      return user;
    }), catchError(err => {
      alertify.error('Could not retrieve user!');
      return throwError(err);
    }));
  }
}
