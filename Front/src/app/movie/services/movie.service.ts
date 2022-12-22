import { Injectable } from '@angular/core';
import { HttpService } from "../../shared/services/http.service";
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService extends HttpService<Movie> {

}
