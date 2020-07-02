import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'datingSPA';

  currentPage: string;

  constructor(public authService: AuthService, public router: Router) {
    this.currentPage = this.authService.isLoggedIn()
      ? 'home'
      : 'login';
  }

  login(): void {
    this.router.navigate(['login']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
