import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import alertifyjs from "alertifyjs";

const HOST_URL = 'http://localhost:5000/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient) { }

  isLoggedIn() {
    return !!localStorage.getItem('tok');
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${HOST_URL}login`, { username, password })
      .pipe(map((res: any) => {
        if (res) {
          localStorage.setItem('tok', `Bearer ${res}`);
        }
      }));
  }

  logout(): void {
    localStorage.removeItem('tok');
    alertifyjs.success('logged out!');
  }

  register(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${HOST_URL}register`, { username, password });
  }
}
