import { Injectable } from '@angular/core';
import { HttpService } from "../../shared/services/http.service";
import { Movie } from '../models/movie';
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MovieService extends HttpService<Movie> {


  getReleaseMovie(): Observable<Movie[]> {
    return this.getResourceByCriteria('/api/movies', 'dateRelease=desc')
      .pipe(
        map((movies: Movie[]) => movies.map(
          movie => ({
            ...movie,
            contentUrl: movie.contentUrl ? this.baseUrl + '/' + movie.contentUrl : null
          })
        ))
      )
  }

}
