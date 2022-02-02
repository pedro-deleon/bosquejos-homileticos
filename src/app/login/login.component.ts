import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebaseui from 'firebaseui';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import {Router} from "@angular/router";
import Config = firebaseui.auth.Config;
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  ui: firebaseui.auth.AuthUI | undefined;


  constructor(private afAuth: AngularFireAuth,
              private router: Router) {
    this.afAuth.app.then(app => {
      const uiConfig: Config = {
        signInOptions: [
          {
            provider: EmailAuthProvider.PROVIDER_ID,
            fullLabel: 'Iniciar sesión con Email'
          },
          {
            provider: GoogleAuthProvider.PROVIDER_ID,
            fullLabel: 'Iniciar sesión con Google'
          }

        ],
        callbacks: {
          signInSuccessWithAuthResult: this.onLoginSuccesful.bind(this)
        }
      };

      this.ui = new firebaseui.auth.AuthUI(app.auth());
      this.ui.start("#firebaseui-auth-container", uiConfig);

      this.ui.disableAutoSignIn();

    });
  }

  ngOnInit(): void {
  }

  onLoginSuccesful(result: any) {
    console.log(result);
    this.router.navigateByUrl("/preview");
    return true;
  }

  ngOnDestroy() {
    this.ui?.delete();
  }

}
