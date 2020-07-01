import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";
import alertifyjs from "alertifyjs";
import { JwtHelperService } from "@auth0/angular-jwt";

const HOST_URL = 'http://localhost:5000/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelperService: JwtHelperService = new JwtHelperService();

  public username: string = '';

  constructor(private httpClient : HttpClient) {
    if (this.isLoggedIn()) {
      this.pushUsername();
    }
  }

  private pushUsername() {
    const token = localStorage.getItem('tok');
    const decodedToken = this.jwtHelperService.decodeToken(token);
    this.username = decodedToken.unique_name;
    console.log(this.username);
  }

  isLoggedIn() {
    const token = localStorage.getItem('tok');
    if (!token) {
      return false;
    }

    try {
      const isTokenExpired = this.jwtHelperService.isTokenExpired(token);
      return !isTokenExpired;
    } catch {
      localStorage.removeItem('tok');
      return false;
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${HOST_URL}login`, { username, password })
      .pipe(map((res: any) => {
        if (res) {
          localStorage.setItem('tok', `Bearer ${res.token}`);
          this.pushUsername();
        }
      }));
  }

  logout(): void {
    localStorage.removeItem('tok');
    this.username = '';
    alertifyjs.success('logged out!');
  }

  register(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${HOST_URL}register`, { username, password });
  }
}
