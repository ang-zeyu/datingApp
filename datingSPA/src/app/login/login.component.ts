import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { AuthService } from "../services/auth/auth.service";
import alertify from "alertifyjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username : string;
  password : string;

  @Output() loggedInEmitter = new EventEmitter<string>();

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.loggedInEmitter.emit('already');
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  login() {
    this.authService.login(this.username, this.password).subscribe((res) => {
      alertify.success("Login successful! Redirected you to our home page...")
      this.loggedInEmitter.emit('success');
    }, (err) => {
      alertify.error("Login failed! Check your username or password.")
      this.loggedInEmitter.emit('failed');
    });
  }

  switchToRegister() {
    this.loggedInEmitter.emit('register');
  }
}
