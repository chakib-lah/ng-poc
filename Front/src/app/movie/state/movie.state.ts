import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Movie } from "../models/movie";
import { PagedResults } from "../../shared/models/pagedResults";


@Injectable({
  providedIn: 'root'
})
export class MovieState {

  // @ts-ignore
  private movies$ = new BehaviorSubject<Movie[]>(null);

  // @ts-ignore
  private moviesWithTotalRecords$ = new BehaviorSubject<PagedResults<Movie[]>>(null);

  // @ts-ignore
  private searchFilter$ = new BehaviorSubject<string>('');


  getMovies$() {
    return this.movies$.asObservable();
  }

  setMovies$(movies: Movie[]) {
    this.movies$.next(movies);
  }

  getMoviesWithTotalRecords$() {
    return this.moviesWithTotalRecords$.asObservable();
  }

  setMoviesWithTotalRecords$(pagedMovies: PagedResults<Movie[]>) {
    this.moviesWithTotalRecords$.next(pagedMovies);
  }

  getSearchFilter$() {
    return this.searchFilter$.asObservable();
  }

  setSearchFilter$(filter: string) {
    this.searchFilter$.next(filter);
  }

}
