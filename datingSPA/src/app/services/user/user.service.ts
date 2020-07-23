import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.userApiBaseUrl);
  }

  getUser(username: string): Observable<User> {
    return this.http.get<User>(`${environment.userApiBaseUrl}${username}`);
  }

  // tslint:disable-next-line:ban-types
  saveUser(user: User): Observable<Object> {
    return this.http.put(`${environment.userApiBaseUrl}${user.username}`, user);
  }

  setUserMainPhoto(username: string, id: number): Observable<object> {
    return this.http.post(`${environment.userApiBaseUrl}${username}/photos/main/${id}`, {});
  }
}
