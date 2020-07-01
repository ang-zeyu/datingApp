import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'datingSPA';

  currentPage: string = 'login'
  isLoggedIn: boolean = false;

  onLogin($event: string) {
    this.currentPage = $event;
  }

  onRegister($event: string) {
    this.currentPage = $event;
  }
}
