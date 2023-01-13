import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MovieFacade } from "../../movie.facade";
import { Subject, takeUntil } from "rxjs";
import { Movie } from "../../models/movie";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  movies: Movie[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieFacade: MovieFacade) {
  }

  ngOnInit(): void {
    this.movieFacade.getMovies$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: movies => {
          this.movies = movies;
          console.log(movies)
        },
        error: err => console.log(err)
      });
    this.movieFacade.loadMovies(null)
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
