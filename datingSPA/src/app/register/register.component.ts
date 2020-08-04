import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

import alertifyjs from 'alertifyjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username: ['default username', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      gender: ['male'],
      displayName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  register(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      alertifyjs.error(`Your form is incomplete or has some invalid fields!`);
      return;
    }

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
