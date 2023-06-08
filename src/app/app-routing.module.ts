import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../app/pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AnnotationsComponent } from './pages/annotations/annotations.component';
import { AnnotationComponent } from './components/annotation/annotation.component';
import { AuthGuard } from './services/Auth.guard';
import { FirstLoginComponent } from './pages/first-login/first-login.component';
import { config } from 'rxjs';

const routes: Routes = [];

const RoutesApp: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'seja-bem-vindo', component: FirstLoginComponent },
  { path: 'cadastro', component: RegisterComponent },
  {
    path: 'anotacoes', component: AnnotationsComponent, canActivate: [AuthGuard]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(RoutesApp, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})


export class AppRoutingModule { }
