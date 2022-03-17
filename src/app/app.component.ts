import {Component} from '@angular/core';
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bosquejos';

  constructor(public user: UserService) {
  }

  onActivate(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  logout() {
    this.user.logout();
  }
}
