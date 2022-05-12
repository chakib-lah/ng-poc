import { Component, OnInit } from '@angular/core';
import {MovieService} from "../services/movie.service";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getRessources('/api/movies')
        .subscribe(movies => console.log(movies));
  }

}
