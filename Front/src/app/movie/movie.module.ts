import { NgModule } from '@angular/core';

import { MovieRoutingModule } from './movie-routing.module';
import { SharedModule } from "../shared/shared.module";


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    MovieRoutingModule
  ]
})
export class MovieModule { }
