import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MovieFacade } from "../../movie.facade";
import { Subject, takeUntil } from "rxjs";
import { Movie } from "../../models/movie";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {

  pageTitle = 'Movie List';
  imageWidth = 140;
  imageHeight = 140;
  errorMessage = '';
  destroy$: Subject<boolean> = new Subject<boolean>();
  movies: Movie[] = [];
  dataSource!: MatTableDataSource<Movie>;
  displayedColumns: string[] = ['image', 'title', 'dateRelease', 'actors', 'category'];

  constructor(
    private route: ActivatedRoute,
    private movieFacade: MovieFacade) {
  }

  ngOnInit(): void {
    this.movieFacade.getMovies$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: movies => {
          this.dataSource = new MatTableDataSource<Movie>(movies)
          this.movies = movies;
          console.log(movies)
        },
        error: err => this.errorMessage = err
      });
    if (!this.movies) {
      this.movieFacade.loadMovies(null);
    }

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
