import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from "../services/auth/auth.service";
import alertifyjs from "alertifyjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username : string;
  password : string;

  @Output() registerEmitter = new EventEmitter<string>();

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  register() {
    this.authService.register(this.username, this.password).subscribe((res) => {
      alertifyjs.success(`Registration success! Go ahead and login!`);
      this.registerEmitter.emit('registered');
    }, (err) => {
      const reason = Object.values(err).join(', ')
      alertifyjs.error(`Registration failed!<br>${reason}`);
    });
  }

  switchToLogin() {
    this.registerEmitter.emit('login');
  }
}
