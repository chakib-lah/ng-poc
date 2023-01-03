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

  lastReleaseMovies: Movie[] = [];
  comingSoonMovies: Movie[] = [];
  sub!: Subscription;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.sub = this.movieService.getReleaseMovie()
      .subscribe(
        movies => {
          this.lastReleaseMovies = movies;
          console.log(this.lastReleaseMovies)
        }
      )

    this.movieService.getComingSoonMovie()
      .subscribe(
        movies => {
          this.comingSoonMovies = movies;
          console.log(this.comingSoonMovies)
        }
      )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
