import {Component, OnDestroy, OnInit} from '@angular/core';
import { MovieService } from "../movie/services/movie.service";
import { Movie } from "../movie/models/movie";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

  lastReleaseMovies: Movie[] = [];
  comingSoonMovies: Movie[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getReleaseMovie()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        movies => {
          this.lastReleaseMovies = movies;
        }
      )

    this.movieService.getComingSoonMovie()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        movies => {
          this.comingSoonMovies = movies;
        }
      )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
