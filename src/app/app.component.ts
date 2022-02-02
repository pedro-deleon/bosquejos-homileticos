import {Component} from '@angular/core';
import {UserService} from "./services/user.service";
import firebase from "firebase/compat/app";
import firestore = firebase.firestore;
import {FirebaseApp, initializeApp} from "@angular/fire/app";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bosquejos';

  constructor(public user: UserService) {


  }

  logout() {
    this.user.logout();
  }
}
