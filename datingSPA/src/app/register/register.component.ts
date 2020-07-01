import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from "../services/auth/auth.service";

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
      console.log(`Registration success! ${res}`);
      this.registerEmitter.emit('registered');
    }, (err) => {
      console.log(`Registration failed! ${err}`);
    });
  }

  switchToLogin() {
    this.authService.logout();
    this.registerEmitter.emit('login');
  }
}
