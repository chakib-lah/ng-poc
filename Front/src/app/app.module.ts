import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieModule } from './movie/movie.module';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';
import { environment } from '../environments/environment';
import { BASE_URL } from './tokens';
import { AuthenticationModule } from './authentication/authentication.module';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './shared/nav/nav.component';
import { NotFondComponent } from './shared/not-fond/not-fond.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeModule } from "./home/home.module";

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NotFondComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HomeModule,
    MovieModule,
    AdminModule,
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
