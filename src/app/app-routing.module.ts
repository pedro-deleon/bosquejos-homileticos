import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PreviewComponent} from "./container/preview/preview.component";
import {BosquejoComponent} from "./container/bosquejo/bosquejo.component";
import {BosquejoResolver} from "./container/bosquejo/bosquejo.resolver";
import {FormComponent} from "./container/form/form.component";
import {LoginComponent} from "./login/login.component";
import {ContactComponent} from "./container/contact/contact.component";
import {AboutComponent} from "./container/about/about.component";

const routes: Routes = [
  {path: 'preview', component: PreviewComponent},
  {
    path: 'preview/bosquejo/:id', component: BosquejoComponent,
    resolve: {
      bosquejo: BosquejoResolver
    }
  },
  {
    path: 'form/:accion',
    component: FormComponent
  },
  {
    path: 'form/:accion/:id',
    component: FormComponent,
    resolve: {
      bosquejo: BosquejoResolver
    }
  },
  {
    path: 'contacto',
    component: ContactComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/preview',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
