import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { AuthService } from "../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username : string;
  password : string;

  @Output() loggedInEmitter = new EventEmitter<string>();

  didLastLoginSucceed : boolean = true;

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
      console.log('Login success!');
      this.loggedInEmitter.emit('success');
    }, (err) => {
      console.log('Login failed!');
      this.didLastLoginSucceed = false;
      this.loggedInEmitter.emit('failed');
    });
  }

  switchToRegister() {
    this.loggedInEmitter.emit('register');
  }
}
