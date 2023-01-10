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

  getReleaseMovie$(): Observable<Movie[]> {
    return this.homeState.getLastReleaseMovie$();
  }

  loadLastReleaseMovie() {
    this.homeState.setUpdating$(true);
    this.movieAPI.getLastReleaseMovie()
      .subscribe({
        next: movies => this.homeState.setReleaseMovie$(movies),
        error: err => console.log(err),
        complete: () => this.homeState.setUpdating$(false)
      })
  }

  getComingSoonMovie$(): Observable<Movie[]> {
    return this.homeState.getComingSoonMovie$()
  }

  loadComingSoonMovie() {
    this.homeState.setUpdating$(true);
    this.movieAPI.getComingSoonMovie()
      .subscribe({
        next: movies => this.homeState.setComingSoonMovie$(movies),
        error: err => console.log(err),
        complete: () => this.homeState.setUpdating$(false)
      })
  }


}
