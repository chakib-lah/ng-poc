import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MovieFacade } from "../../movie/movie.facade";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm!: FormGroup;

  constructor(
    private router: Router,
    private movieFacade: MovieFacade
  ) {
  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl(''),
    })
  }

  public getSearchValue() {
    let search = this.searchForm.get('search')?.value;
    this.movieFacade.loadMovies(search)
    this.router.navigate(["/listMovie"]);
  }

}
