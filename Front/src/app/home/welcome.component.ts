import {Component, OnDestroy, OnInit} from '@angular/core';
import { MovieService } from "../movie/services/movie.service";
import {Movie} from "../movie/models/movie";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  sub!: Subscription;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.sub = this.movieService.getReleaseMovie()
      .subscribe(
        movies => {
          this.movies = movies;
          console.log(this.movies)
        }
      )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
