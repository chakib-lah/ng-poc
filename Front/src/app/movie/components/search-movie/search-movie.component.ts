import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss']
})
export class SearchMovieComponent implements OnInit {

  search : string | null = "";
  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
     this.search = this.route.snapshot.paramMap.get('search');

  }

}
