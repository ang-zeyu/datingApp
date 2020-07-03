import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-member-page',
  templateUrl: './member-page.component.html',
  styleUrls: ['./member-page.component.css']
})
export class MemberPageComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const username: string = this.currentRoute.snapshot.params.username;
    this.userService.getUser(username).subscribe(
      user => this.user = user,
      err => console.log(err)
    );
  }
}
