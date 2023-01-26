import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from '../app/pages/home/home.component';
import { LayoutLoginRegistrationComponent } from './components/layout-login-registration/layout-login-registration.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AnnotationsComponent } from './pages/annotations/annotations.component';
import { AnnotationComponent } from './components/annotation/annotation.component';

const routes: Routes = [];

const RoutesApp: Routes = [
  {path: '', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'cadastro', component: RegisterComponent},
  {path: 'anotacoes', component: AnnotationsComponent, children: [
    {path: ':userLoggedId', component: AnnotationComponent}
  ]}
]
@NgModule({
  imports: [RouterModule.forRoot(RoutesApp)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
