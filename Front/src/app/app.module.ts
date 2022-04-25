import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieComponent } from './movie/components/movie.component';
import { MovieModule } from './movie/movie.module';
import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { WelcomeComponent } from './home/welcome.component';
import { environment } from '../environments/environment';
import { BASE_URL } from './tokens';
import { AuthenticationModule } from './authentication/authentication.module';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MovieModule,
    AdminModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    AuthenticationModule,
    AppRoutingModule
  ],
  providers: [
    { provide: BASE_URL, useValue: environment.apiUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
