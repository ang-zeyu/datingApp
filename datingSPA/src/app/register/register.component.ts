import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

import alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register(): void {
    this.authService.register(this.username, this.password).subscribe((res) => {
      alertifyjs.success(`Registration success! Go ahead and login!`);
      this.switchToLogin();
    }, (err) => {
      let reason;
      if (typeof err === 'object') {
        reason = Object.values(err).join(', ');
      } else {
        reason = err;
      }
      alertifyjs.error(`Registration failed!<br>${reason}`);
    });
  }

  switchToLogin(): void {
    this.router.navigate(['login']);
  }
}
