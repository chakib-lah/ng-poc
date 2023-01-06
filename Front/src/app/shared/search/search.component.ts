import { Component, Input, OnInit } from '@angular/core';
import { PageEnum } from "./pageEnum";
import { Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() page!: PageEnum;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public getSearchValue(value: string) {
    this.router.navigateByUrl("/" + this.page + "/" + value);
  }

}
