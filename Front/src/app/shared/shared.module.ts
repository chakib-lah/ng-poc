import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFondComponent } from './not-fond/not-fond.component';



@NgModule({
  declarations: [
    NotFondComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule
  ]
})
export class SharedModule { }
