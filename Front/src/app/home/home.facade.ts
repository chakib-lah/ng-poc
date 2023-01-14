import { Injectable } from "@angular/core";
import { HomeService } from "./services/home.service";
import { HomeState } from "./state/home.state";
import { Observable } from "rxjs/internal/Observable";
import { Movie } from "../movie/models/movie";
import { LoaderEnum } from "../shared/spinner/loaderEnum";
import { LoaderState } from "../shared/spinner/loader.state";

@Injectable({
  providedIn: 'root'
})
export class HomeFacade {
  constructor(
    private homeAPI: HomeService,
    private homeState: HomeState,
    private loaderState: LoaderState
  ) {
  }

  getReleaseMovie$(): Observable<Movie[]> {
    return this.homeState.getLastReleaseMovie$();
  }

  loadLastReleaseMovie() {
    this.loaderState.startLoader$(LoaderEnum.lastReleaseLoading);
    this.homeAPI.getLastReleaseMovie()
      .subscribe({
        next: movies => this.homeState.setReleaseMovie$(movies),
        error: err => console.log(err),
        complete: () => this.loaderState.stopLoader$(LoaderEnum.lastReleaseLoading)
      })
  }

  getComingSoonMovie$(): Observable<Movie[]> {
    return this.homeState.getComingSoonMovie$()
  }

  loadComingSoonMovie() {
    this.loaderState.startLoader$(LoaderEnum.comingSoonLoading);
    this.homeAPI.getComingSoonMovie()
      .subscribe({
        next: movies => this.homeState.setComingSoonMovie$(movies),
        error: err => console.log(err),
        complete: () => this.loaderState.stopLoader$(LoaderEnum.comingSoonLoading)
      })
  }


}
