import { NgModule } from '@angular/core';

import { MovieRoutingModule } from './movie-routing.module';
import { SharedModule } from "../shared/shared.module";
import { ListMovieComponent } from "./components/list-movie/list-movie.component";
import { SearchMovieComponent } from './components/search-movie/search-movie.component';


@NgModule({
  declarations: [
    ListMovieComponent,
    SearchMovieComponent,
  ],
  imports: [
    SharedModule,
    MovieRoutingModule
  ]
})
export class MovieModule { }
