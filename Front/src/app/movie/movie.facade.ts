import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { LoaderEnum } from "../shared/spinner/loaderEnum";
import { LoaderState } from "../shared/spinner/loader.state";
import { MovieState } from "./state/movie.state";
import { Movie } from "./models/movie";
import { MovieService } from "./services/movie.service";
import { PagedResults } from "../shared/models/pagedResults";

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

  getMoviesWithTotalRecords$() {
    return this.movieState.getMoviesWithTotalRecords$();
  }

  getSearchFilter$(): Observable<string>{
    return this.movieState.getSearchFilter$();
  }

  loadMovies(value: string, pageItem= 1, pageSize = 3) {
    this.loaderState.startLoader$(LoaderEnum.searchLoading);
    this.movieAPI.getMoviesByTitle(value, pageItem, pageSize)
      .subscribe({
        next: (movies:PagedResults<Movie[]>) => {
          this.movieState.setMoviesWithTotalRecords$(movies);
        },
        error: err => console.log(err),
        complete: () => this.loaderState.stopLoader$(LoaderEnum.searchLoading)
      })
  }

  applyFilter(filter: string){
    this.movieState.setSearchFilter$(filter);
  }

}
