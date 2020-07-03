import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import alertifyjs from 'alertifyjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelperService: JwtHelperService = new JwtHelperService();

  public username = '';

  constructor(private httpClient: HttpClient) {
    if (this.isLoggedIn()) {
      this.pushUsername();
    }
  }

  private pushUsername(): void {
    const token = localStorage.getItem('tok');
    const decodedToken = this.jwtHelperService.decodeToken(token);
    this.username = decodedToken.unique_name;
  }

  isLoggedIn(): boolean {
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
    return this.httpClient.post(`${environment.authApiBaseUrl}login`, { username, password })
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
    return this.httpClient.post(`${environment.authApiBaseUrl}register`, { username, password });
  }
}
