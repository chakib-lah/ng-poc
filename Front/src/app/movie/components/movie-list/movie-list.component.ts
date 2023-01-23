import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MovieFacade } from "../../movie.facade";
import { startWith, Subject, takeUntil } from "rxjs";
import { Movie } from "../../models/movie";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { LoaderEnum } from "../../../shared/spinner/loaderEnum";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {

  imageWidth = 140;
  imageHeight = 140;
  errorMessage = '';
  totalRecords = 0;
  pageSize = 3;
  pageSizeOptions = [3, 5, 10];
  destroy$: Subject<boolean> = new Subject<boolean>();
  movies: Movie[] = [];
  dataSource!: MatTableDataSource<Movie>;
  displayedColumns: string[] = ['image', 'title', 'dateRelease', 'category', 'actors'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  spinnerValue = LoaderEnum;

  constructor(
    private route: ActivatedRoute,
    private movieFacade: MovieFacade) {
  }

  ngOnInit(): void {
    this.movieFacade.getMoviesWithTotalRecords$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: movies => {
          this.dataSource = new MatTableDataSource<Movie>(movies?.results);
          this.totalRecords = movies?.totalRecords;
          this.movies = movies?.results;
        },
        error: err => this.errorMessage = err
      });

  }

  ngAfterViewInit() {
    this.movieFacade.getSearchFilter$()
      .subscribe({
          next: filter => this.paginator.page.pipe(
            startWith({})
          ).subscribe(() => {
            const pageNumber = this.paginator.pageIndex + 1;
            const pageSize = this.paginator.pageSize;
            this.movieFacade.loadMovies(filter, pageNumber, pageSize);
          })
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
