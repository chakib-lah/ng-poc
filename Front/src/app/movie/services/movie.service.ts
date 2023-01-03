import { Injectable } from '@angular/core';
import { HttpService } from "../../shared/services/http.service";
import { Movie } from '../models/movie';
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class MovieService extends HttpService<Movie> {

  pipe = new DatePipe('en-US');
  today = new Date();
  todayFormat = this.pipe.transform(this.today, 'YYYY-MM-dd');

  getReleaseMovie(): Observable<Movie[]> {
    return this.getResourceByCriteria('/api/movies', ...['dateRelease[before]=' + this.todayFormat,'order[dateRelease]=desc'])
      .pipe(
        map((movies: Movie[]) => movies.map(
          movie => ({
            ...movie,
            contentUrl: movie.contentUrl ? this.baseUrl + '/' + movie.contentUrl : null
          })
        ))
      )
  }

  getComingSoonMovie(): Observable<Movie[]> {
    return this.getResourceByCriteria('/api/movies', 'dateRelease[after]=' + this.todayFormat)
      .pipe(
        map((movies: Movie[]) => movies.map(
          movie => ({
            ...movie,
            contentUrl: movie.contentUrl ? this.baseUrl + '/' + movie.contentUrl : null,
            score: movie.score ?? '- -',
          })
        ))
      )
  }

}
