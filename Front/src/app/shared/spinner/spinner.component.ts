import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LoaderEnum } from "./loaderEnum";
import { Subject, takeUntil } from "rxjs";
import { LoaderState } from "./loader.state";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  @Input() loader!: LoaderEnum
  destroy$: Subject<boolean> = new Subject<boolean>();
  isLoading: boolean = false;

  constructor(private loaderState: LoaderState) {
  }

  ngOnInit(): void {
    this.loaderState.getLoaderState$()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: loaderState => this.isLoading = loaderState[this.loader],
        error: err => console.log(err)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


}
