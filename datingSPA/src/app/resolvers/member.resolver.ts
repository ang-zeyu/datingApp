import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user/user.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import alertify from 'alertifyjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemberResolver implements Resolve<User> {
  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(route.params.username).pipe(catchError(err => {
      alertify.error('Could not retrieve user!');
      return throwError(err);
    }));
  }
}
