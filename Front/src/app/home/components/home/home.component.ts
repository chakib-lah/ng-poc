import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from "../../../movie/models/movie";
import { Subject, takeUntil } from "rxjs";
import { HomeFacade } from "../../home.facade";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  lastReleaseMovies: Movie[] = [];
  comingSoonMovies: Movie[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading: boolean = false;

  constructor(private homeFacade: HomeFacade) {
  }

  ngOnInit(): void {
    this.homeFacade.isUpdating$()
      .subscribe({
        next: isUpdating => this.isLoading = isUpdating,
        error: err => console.log(err)
      });

    this.homeFacade.getReleaseMovie$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: movies => this.lastReleaseMovies = movies,
        error: err => console.log(err)
      });
    this.homeFacade.loadLastReleaseMovie();

    this.homeFacade.getComingSoonMovie$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: movies => this.comingSoonMovies = movies,
        error: err => console.log(err)
      });
    this.homeFacade.loadComingSoonMovie();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
