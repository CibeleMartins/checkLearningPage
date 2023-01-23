import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class NgMaterialModule { }