import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../interfaces/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentRoute.data.subscribe(data => {
      this.users = data.users;
    });
  }
}
