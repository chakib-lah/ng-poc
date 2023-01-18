import { Injectable } from '@angular/core';
import { HttpService } from "../../shared/services/http.service";
import { Observable } from "rxjs/internal/Observable";
import { map } from "rxjs/operators";
import { Movie } from "../models/movie";
import { PagedResults } from "../../shared/models/pagedResults";

@Injectable({
  providedIn: 'root'
})
export class MovieService extends HttpService<Movie> {

  private readonly moviesAPI = '/api/movies';

  getMoviesByTitle(value: string | undefined, pageIndex = 1, pageSize = 3): Observable<PagedResults<Movie[]>> {
    let criteria = value ? 'title=' + value : '';
    return this.genericSearchApi(this.moviesAPI,  ...[criteria,'page=' + pageIndex,'itemsPerPage=' + pageSize])
      .pipe(
        map((data: PagedResults<Movie[]>) => {
            const movies = data.results.map(
              movie => ({
                ...movie,
                contentUrl: movie.contentUrl ? this.baseUrl + movie.contentUrl : null,
                score: movie.score ?? '- -',
                categoryType: movie.categories?.map(category => category.type),
                actorsName: movie.actors?.map(actor => actor.firstName + ' ' + actor.lastName),
              })
            );
            return {
              results: movies,
              totalRecords: data.totalRecords
            };
          }
        )
      )
  }

}
