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

  @Input() isLoggedIn : boolean = false;
  @Output() isLoggedInEmitter = new EventEmitter<boolean>();

  @Output() loginPageChangeEmitter = new EventEmitter<string>();

  didLastLoginSucceed : boolean = true;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.isLoggedInEmitter.emit(true);
    }
  }

  login() {
    this.authService.login(this.username, this.password).subscribe((res) => {
      console.log('Login success!');
      this.isLoggedInEmitter.emit(true);
      this.loginPageChangeEmitter.emit('home');
    }, (err) => {
      console.log('Login failed!');
      this.didLastLoginSucceed = false;
      this.isLoggedInEmitter.emit(false);
    });
  }

  register() {
    this.loginPageChangeEmitter.emit('register');
  }
}
