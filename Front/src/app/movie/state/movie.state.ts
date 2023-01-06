import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Movie } from "../models/movie";


@Injectable({
  providedIn: 'root'
})
export class MovieState {

  // @ts-ignore
  private movies$ = new BehaviorSubject<Movie[]>(null);

  getMovies$() {
    return this.movies$.asObservable();
  }

  setMovies$(movies: Movie[]) {
    this.movies$.next(movies);
  }

}
