import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { User } from '../../interfaces/user';

import alertify from 'alertifyjs';
import { UserService } from '../../services/user/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;

  @ViewChild(NgForm)
  aboutForm: NgForm;

  constructor(private currentRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.currentRoute.data.subscribe(data => this.user = data.user);
  }

  save(): void {
    this.userService.saveUser(this.user).subscribe(() => {
      alertify.success('Saved your changes!');
      this.aboutForm.reset(this.user);
    }, err => {
      alertify.error(err);
    });
  }
}