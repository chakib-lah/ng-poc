import { NgModule } from '@angular/core';

import { MovieRoutingModule } from './movie-routing.module';
import { SharedModule } from "../shared/shared.module";
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';


@NgModule({
  declarations: [
    MovieDetailComponent,
    MovieListComponent
  ],
  imports: [
    SharedModule,
    MovieRoutingModule
  ]
})
export class MovieModule { }
