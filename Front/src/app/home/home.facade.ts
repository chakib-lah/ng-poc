import { Injectable } from "@angular/core";
import { MovieService } from "./services/movie.service";
import { HomeState } from "./state/home.state";
import { Observable } from "rxjs/internal/Observable";
import { Movie } from "../movie/models/movie";

@Injectable({
  providedIn: 'root'
})
export class HomeFacade {
  constructor(
    private movieAPI: MovieService,
    private homeState: HomeState
  ) {
  }

  isUpdating$(): Observable<boolean> {
    return this.homeState.isUpdating$();
  }

  getMovies$(): Observable<Movie[]> {
    return this.homeState.getMovies$();
  }

  getReleaseMovie$(): Observable<Movie[]> {
    return this.movieAPI.getReleaseMovie();
  }

  getComingSoonMovie$(): Observable<Movie[]> {
    return this.movieAPI.getComingSoonMovie()
  }


}
