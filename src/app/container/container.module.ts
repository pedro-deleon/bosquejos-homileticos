import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreviewComponent} from "./preview/preview.component";
import {MatSharedModule} from "../mat-shared-module/mat-shared.module";
import { BosquejoComponent } from './bosquejo/bosquejo.component';
import {AppRoutingModule} from "../app-routing.module";
import { FormComponent } from './form/form.component';
import { PuntosDesarrolloComponent } from './form/puntos-desarrollo/puntos-desarrollo.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [
      PreviewComponent,
      BosquejoComponent,
      FormComponent,
      PuntosDesarrolloComponent,
      AboutComponent,
      ContactComponent
    ],
  imports: [
    CommonModule,
    MatSharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class ContainerModule { }
