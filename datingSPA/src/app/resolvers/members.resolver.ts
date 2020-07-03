import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user/user.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import alertify from 'alertifyjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MembersResolver implements Resolve<User[]> {
  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers().pipe(map(users => {
      users.forEach(user => {
        user.lastActive = new Date(user.lastActive);
        user.created = new Date(user.created);
      });
      return users;
    }), catchError(err => {
      alertify.error('Could not retrieve list of users!');
      return throwError(err);
    }));
  }
}
