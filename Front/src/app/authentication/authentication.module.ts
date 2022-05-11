import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '../shared/shared.module';
import {
  AuthModule,
  AUTH_SERVICE,
  PUBLIC_FALLBACK_PAGE_URI,
  PROTECTED_FALLBACK_PAGE_URI
} from 'ngx-auth';

import { AuthenticationService } from './services/authentication.service';
import { TokenStorage } from './services/token-storage.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgxPwdStrengthModule, NgxPwdStrengthService } from "ngx-pwd-strength";

function initializePwdStrength(pwdStrength: NgxPwdStrengthService) {
  return () =>
      pwdStrength.init({
        enableFeedback: false
      });
}

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    AuthModule,
    AuthenticationRoutingModule,
    NgxPwdStrengthModule
  ],
  providers: [
    TokenStorage,
    AuthenticationService,
    { provide: PROTECTED_FALLBACK_PAGE_URI, useValue: '/' },
    { provide: PUBLIC_FALLBACK_PAGE_URI, useValue: '/login' },
    { provide: AUTH_SERVICE, useClass: AuthenticationService },
    { provide: APP_INITIALIZER, useFactory: initializePwdStrength, multi: true, deps: [NgxPwdStrengthService] }
  ]
})
export class AuthenticationModule { }
