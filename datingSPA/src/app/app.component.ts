import { Component } from '@angular/core';
import { AuthService } from "./services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'datingSPA';

  currentPage: string;

  constructor(public authService: AuthService) {
    this.currentPage = this.authService.isLoggedIn()
      ? 'home'
      : 'login';
  }

  onLogin($event: string) {
    if ($event === 'success') {
      this.currentPage = 'home';
    } else if ($event === 'register') {
      this.currentPage = 'register';
    }
  }

  onRegister($event: string) {
    if ($event === 'login' || $event === 'registered') {
      this.currentPage = 'login';
    }
  }

  logout() {
    this.authService.logout();
    this.currentPage = 'login';
  }
}
