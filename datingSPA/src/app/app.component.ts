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
  username: string;

  constructor(private authService: AuthService) {
    this.currentPage = this.authService.isLoggedIn()
      ? 'home'
      : 'login';
    this.authService.username.subscribe(username => {
      this.username = username;
    });
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
