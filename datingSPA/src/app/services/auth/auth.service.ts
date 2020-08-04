import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import alertifyjs from 'alertifyjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelperService: JwtHelperService = new JwtHelperService();

  public username = '';
  public photoUrl = '';

  constructor(private httpClient: HttpClient) {
    if (this.isLoggedIn()) {
      this.pushStorageDetails();
    } else {
      this.popStorageDetails();
    }
  }

  private pushStorageDetails(): void {
    const token = localStorage.getItem('tok');
    const decodedToken = this.jwtHelperService.decodeToken(token);
    this.username = decodedToken.unique_name;
    this.photoUrl = localStorage.getItem('photoUrl');
  }

  private popStorageDetails(): void {
    localStorage.removeItem('tok');
    localStorage.removeItem('photoUrl');
    this.username = '';
    this.photoUrl = '';
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('tok');
    if (!token) {
      return false;
    }

    try {
      return !this.jwtHelperService.isTokenExpired(token);
    } catch {
      this.popStorageDetails();
      return false;
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${environment.authApiBaseUrl}login`, { username, password })
      .pipe(map((res: any) => {
        if (res) {
          localStorage.setItem('tok', res.token);
          localStorage.setItem('photoUrl', res.user.photoUrl);
          this.pushStorageDetails();
        }
      }));
  }

  logout(): void {
    this.popStorageDetails();
    alertifyjs.success('logged out!');
  }

  register(user: any): Observable<any> {
    return this.httpClient.post(`${environment.authApiBaseUrl}register`, user);
  }

  changeMainPhoto(photoUrl: string): void {
    this.photoUrl = photoUrl;
    localStorage.setItem('photoUrl', photoUrl);
  }
}
