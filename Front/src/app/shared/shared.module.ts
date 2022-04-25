import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFondComponent } from './not-fond/not-fond.component';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [
    NotFondComponent,
    NavComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    NavComponent,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SharedModule { }
