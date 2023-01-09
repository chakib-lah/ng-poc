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
    return this.homeState.getLastReleaseMovie$();
  }

  loadLastReleaseMovie() {
    this.movieAPI.getLastReleaseMovie()
      .subscribe({
        next: movies => this.homeState.setReleaseMovie$(movies),
        error: err => console.log(err)
      })
  }

  getComingSoonMovie$(): Observable<Movie[]> {
    return this.homeState.getComingSoonMovie$()
  }

  loadComingSoonMovie() {
    this.movieAPI.getComingSoonMovie()
      .subscribe({
        next: movies => this.homeState.setComingSoonMovie$(movies),
        error: err => console.log(err)
      })
  }


}
