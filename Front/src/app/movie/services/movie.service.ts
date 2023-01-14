import { Injectable } from '@angular/core';
import { HttpService } from "../../shared/services/http.service";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { Movie } from "../models/movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService extends HttpService<Movie> {

  private readonly moviesAPI = '/api/movies';

  getMoviesByTitle(value: string | null): Observable<Movie[]> {
    let criteria = value ? 'title=' + value : '';
    return this.getResourceByCriteria(this.moviesAPI, criteria, 'itemsPerPage=3')
      .pipe(
        map((movies: Movie[]) => movies.map(
          movie => ({
            ...movie,
            contentUrl: movie.contentUrl ? this.baseUrl + '/' + movie.contentUrl : null,
            score: movie.score ?? '- -',
            categoryType: movie.categories?.map(category => category.type),
            actorsName: movie.actors?.map(actor => actor.firstName + ' ' + actor.lastName),
          })
        ))
      )
  }

}
