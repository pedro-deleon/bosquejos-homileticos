import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {MatSharedModule} from "../mat-shared-module/mat-shared.module";



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatSharedModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class LayoutModule { }
