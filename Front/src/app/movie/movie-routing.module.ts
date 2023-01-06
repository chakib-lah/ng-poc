import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMovieComponent } from "./components/list-movie/list-movie.component";
import { ProtectedGuard } from "ngx-auth";
import { SearchMovieComponent } from "./components/search-movie/search-movie.component";

const routes: Routes = [
  {path: 'listMovie', component: ListMovieComponent, canActivate: [ProtectedGuard]},
  {path: 'movie/:search', component: SearchMovieComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule {
}
