import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LoaderEnum } from "./loaderEnum";


@Injectable({
  providedIn: 'root'
})
export class LoaderState {

  loaderInitialState: Record<LoaderEnum, boolean> = {
    [LoaderEnum.comingSoonLoading]: false,
    [LoaderEnum.lastReleaseLoading]: false,
    [LoaderEnum.searchLoading]: false
  }

  // @ts-ignore
  private loaderState$ = new BehaviorSubject<Record<LoaderEnum, boolean>>(this.loaderInitialState);

  getLoaderState$() {
    return this.loaderState$.asObservable();
  }

  startLoader$(loaderName: LoaderEnum) {
    let currentLoaderState = this.loaderState$.getValue();
    let newLoaderState = {...currentLoaderState, [LoaderEnum[loaderName]]: true};
    this.loaderState$.next(newLoaderState);
  }

  stopLoader$(loaderName: LoaderEnum) {
    let currentLoaderState = this.loaderState$.getValue();
    let newLoaderState = {...currentLoaderState, [LoaderEnum[loaderName]]: false};
    this.loaderState$.next(newLoaderState);
  }


}
