import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import {BASE_URL} from "../../tokens";

@Injectable({
  providedIn: 'root'
})
export class HttpService<R> {

  constructor(
    protected http: HttpClient,
    @Inject(BASE_URL) protected baseUrl: string
  ) {
  }

  getResources(url: string): Observable<R[]> {
    const serviceUrl = this.baseUrl + url;
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<R[]>(serviceUrl, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  getResourceById(url: string, id: number): Observable<R> {
    const serviceUrl = this.baseUrl + url + '/' + id;
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<R>(serviceUrl, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  getResourceByCriteria(url: string, ...criteria: string[]): Observable<R[]> {
    const serviceUrl = this.baseUrl + url + '?' + criteria.join('&');
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.get<R[]>(serviceUrl, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  createResource(url: string, resource: R): Observable<R> {
    const serviceUrl = this.baseUrl + url;
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post<R>(serviceUrl, resource, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  editResource(url: string, id: number, resource: R): Observable<R> {
    const serviceUrl = this.baseUrl + url + '/' + id;
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.put<R>(serviceUrl, resource, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  deleteResource(url: string, id: number): Observable<R> {
    const serviceUrl = this.baseUrl + url + '/' + id;
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.delete<R>(serviceUrl, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  protected handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.error.violations}`;
    }
    console.error(err);
    return throwError(() => new Error(errorMessage));
  }
}
