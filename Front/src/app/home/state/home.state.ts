import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Movie } from "../../movie/models/movie";


@Injectable({
  providedIn: 'root'
})
export class HomeState {

  // @ts-ignore
  private lastReleaseMovie$ = new BehaviorSubject<Movie[]>(null);
  // @ts-ignore
  private comingSoonMovie$ = new BehaviorSubject<Movie[]>(null);

  getLastReleaseMovie$() {
    return this.lastReleaseMovie$.asObservable();
  }

  setReleaseMovie$(movies: Movie[]) {
    this.lastReleaseMovie$.next(movies);
  }

  getComingSoonMovie$() {
    return this.comingSoonMovie$.asObservable();
  }

  setComingSoonMovie$(movies: Movie[]) {
    this.comingSoonMovie$.next(movies);
  }
}
