import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { SpinnerComponent } from './spinner/spinner.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    SpinnerComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SpinnerComponent,
    SearchComponent
  ]
})
export class SharedModule {
}
