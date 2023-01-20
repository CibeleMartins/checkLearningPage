import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from '../app/pages/home/home.component';

const routes: Routes = [];

const RoutesApp: Routes = [
  {path: '', component: HomeComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(RoutesApp)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
