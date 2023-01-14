import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { LoaderEnum } from "../shared/spinner/loaderEnum";
import { LoaderState } from "../shared/spinner/loader.state";
import { MovieState } from "./state/movie.state";
import { Movie } from "./models/movie";
import { MovieService } from "./services/movie.service";

@Injectable({
  providedIn: 'root'
})
export class MovieFacade {
  constructor(
    private movieAPI: MovieService,
    private movieState: MovieState,
    private loaderState: LoaderState
  ) {
  }

  getMovies$(): Observable<Movie[]> {
    return this.movieState.getMovies$();
  }

  loadMovies(value: string|null) {
    this.loaderState.startLoader$(LoaderEnum.searchLoading);
    this.movieAPI.getMoviesByTitle(value)
      .subscribe({
        next: movies => this.movieState.setMovies$(movies),
        error: err => console.log(err),
        complete: () => this.loaderState.stopLoader$(LoaderEnum.searchLoading)
      })
  }

}
