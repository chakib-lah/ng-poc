import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from 'ngx-auth';
import { TokenStorage } from './token-storage.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { BASE_URL } from '../../tokens';



interface AccessData {
  token: string;
  refresh_token: string;
}

@Injectable()
export class AuthenticationService implements AuthService {

  constructor(
      private http: HttpClient,
      private tokenStorage: TokenStorage,
      @Inject(BASE_URL) protected baseUrl: string
  ) {}

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @returns {Observable<boolean>}
   * @memberOf AuthService
   */
  public isAuthorized(): Observable < boolean > {
    return this.tokenStorage
        .getAccessToken()
        .pipe(map(token => !!token));
  }

  /**
   * Get access token
   * @description Should return access token in Observable from e.g.
   * localStorage
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable < string > {
    return this.tokenStorage.getAccessToken();
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   * @returns {Observable<any>}
   */
  public refreshToken(): Observable <AccessData> {
    // @ts-ignore
    return this.tokenStorage
        .getRefreshToken()
        .pipe(
            // @ts-ignore
            switchMap((refreshToken: string) =>
                this.http.post(this.baseUrl+`/api/token/refresh`, { refreshToken })
            ),
            tap((tokens: AccessData) => this.saveAccessData(tokens)),
            catchError((err) => {
              this.logout();

              return throwError(() => new Error(err));
            })
        );
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentialy checks status
   * @param {Response} response
   * @returns {boolean}
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   * @param {string} url
   * @returns {boolean}
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/refresh');
  }

  /**
   * EXTRA AUTH METHODS
   */

  public login(username: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl+`/api/login_check`, {
      username, password
    })
        // @ts-ignore
        .pipe(tap((tokens: AccessData) => this.saveAccessData(tokens)));
  }

  /**
   * Logout
   */
  public logout(): void {
    this.tokenStorage.clear();
    location.reload();
  }

  /**
   * Save access data in the storage
   *
   * @private
   * @param {AccessData} data
   */
  private saveAccessData({ token, refresh_token }: AccessData) {
    this.tokenStorage
        .setAccessToken(token)
        .setRefreshToken(refresh_token);
  }

}