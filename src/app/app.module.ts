import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from "./layout/layout.module";
import {MatSharedModule} from "./mat-shared-module/mat-shared.module";
import {ContainerModule} from "./container/container.module";
import {AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR} from "@angular/fire/compat/auth";
import {AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from "@angular/fire/compat/functions";
import { LoadingComponent } from './shared/loading/loading.component';
import { LoginComponent } from './login/login.component';
import {AngularFireModule, FirebaseApp} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import * as Firestore from 'firebase/firestore';







@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ContainerModule,
    MatSharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule
  ],
  providers: [
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['http://localhost', 9099] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['http://localhost', 8080] : undefined },
    { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['http://localhost', 5001] : undefined },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
