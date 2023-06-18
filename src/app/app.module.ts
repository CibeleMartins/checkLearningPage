import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavContainer, MatSidenavModule, MatSidenavContent } from '@angular/material/sidenav';

import { TeximateModule } from 'ngx-teximate';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { LayoutHomeComponent } from './components/layout-home/layout-home.component';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarFeedbackComponent } from './components/snackbar-feedback/snackbar-feedback.component';
import { AnnotationsComponent } from './pages/annotations/annotations.component';
import { AnnotationComponent } from './components/annotation/annotation.component';
import { AuthGuard } from './services/Auth.guard';
import { FirstLoginComponent } from './pages/first-login/first-login.component';
import { LayoutLoginRegistrationComponent } from './components/layout-login-registration/layout-login-registration.component';
import { SlideComponent } from './components/slide/slide.component';
import { CarouselModule } from '@coreui/angular';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { LottieComponent } from './components/lottie/lottie.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { SnackbarConfirmationDeleteComponent } from './components/snackbar-confirmation-delete/snackbar-confirmation-delete.component';
import { ModalPdfComponent } from './components/modal-pdf/modal-pdf.component';


export function playerFactory() {
  return player;
}

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
    FirstLoginComponent,
    SlideComponent,
    LottieComponent,
    LoadingSpinnerComponent,
    SnackbarConfirmationDeleteComponent,
    ModalPdfComponent,

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
    CarouselModule,
    LottieModule.forRoot({ player: playerFactory }),
    AngularEditorModule

  ],
  providers: [AuthGuard,{
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
