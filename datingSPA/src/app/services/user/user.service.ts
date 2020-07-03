import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';

const USER_API_BASE_URL = `${environment.apiBaseUrl}users/`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(USER_API_BASE_URL);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${USER_API_BASE_URL}${id}`);
  }
}
