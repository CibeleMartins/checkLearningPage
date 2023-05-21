import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// import { FormsModule } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavContainer, MatSidenavModule, MatSidenavContent} from '@angular/material/sidenav';

import { TeximateModule } from 'ngx-teximate';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { LayoutHomeComponent } from './components/layout-home/layout-home.component';
import { LayoutLoginRegistrationComponent } from './components/layout-login-registration/layout-login-registration.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarFeedbackComponent } from './components/snackbar-feedback/snackbar-feedback.component';
import { AnnotationsComponent } from './pages/annotations/annotations.component';
import { AnnotationComponent } from './components/annotation/annotation.component';
import { MainlGuard } from './services/main.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutHomeComponent,
    LayoutLoginRegistrationComponent,
    LoginComponent,
    RegisterComponent,
    SnackbarFeedbackComponent,
    AnnotationsComponent,
    AnnotationComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TeximateModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [ MainlGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
