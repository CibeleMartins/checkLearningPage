import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from '../app/pages/home/home.component';
import { LayoutLoginRegistrationComponent } from './components/layout-login-registration/layout-login-registration.component';

const routes: Routes = [];

const RoutesApp: Routes = [
  {path: '', component: HomeComponent },
  {path: 'login', component: LayoutLoginRegistrationComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(RoutesApp)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
