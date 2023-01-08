import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Movie } from "../../movie/models/movie";


@Injectable({
  providedIn: 'root'
})
export class HomeState {

  private updating$ = new BehaviorSubject<boolean>(false);
  // @ts-ignore
  private movies$ = new BehaviorSubject<Movie[]>(null);


  isUpdating$() {
    return this.updating$.asObservable();
  }

  setUpdating$(isUpdating: boolean) {
    this.updating$.next(isUpdating);
  }

  getMovies$() {
    return this.movies$.asObservable();
  }

  setMovies(movies: Movie[]) {
    this.movies$.next(movies);
  }

}
