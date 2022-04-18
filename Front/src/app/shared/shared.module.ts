import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFondComponent } from './not-fond/not-fond.component';
import {MaterialModule} from './material.module';



@NgModule({
  declarations: [
    NotFondComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
