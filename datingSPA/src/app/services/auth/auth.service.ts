import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import alertifyjs from "alertifyjs";
import { JwtHelperService } from "@auth0/angular-jwt";

const HOST_URL = 'http://localhost:5000/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelperService: JwtHelperService = new JwtHelperService();

  constructor(private httpClient : HttpClient) { }

  isLoggedIn() {
    const token = localStorage.getItem('tok');
    if (!token) {
      return false;
    }

    return !this.jwtHelperService.isTokenExpired(token);
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
