import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import alertify from 'alertifyjs';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      alertify.alert('You are already logged in! Redirecting you to the home page...');
      this.router.navigate(['home']);
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe((res) => {
      alertify.success('Login successful! Redirected you to our home page...');
      this.router.navigate(['home']);
    }, (err) => {
      alertify.error('Login failed! Check your username or password.');
    });
  }

  switchToRegister(): void {
    this.router.navigate(['register']);
  }
}
