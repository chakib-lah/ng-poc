import { Component, OnInit } from '@angular/core';
import { MovieService } from "../../services/movie.service";

@Component({
  selector: 'app-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.scss']
})
export class ListMovieComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getResources('/api/movies')
        .subscribe(movies => console.log(movies));
  }

}
