import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TeximateModule } from 'ngx-teximate';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { LayoutHomeComponent } from './components/layout-home/layout-home.component';
import { LayoutLoginRegistrationComponent } from './components/layout-login-registration/layout-login-registration.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutHomeComponent,
    LayoutLoginRegistrationComponent,
    LoginComponent,
    RegisterComponent,

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TeximateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
