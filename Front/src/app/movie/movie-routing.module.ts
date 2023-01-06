import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtectedGuard } from "ngx-auth";
import { MovieListComponent } from "./components/movie-list/movie-list.component";

const routes: Routes = [
  {path: 'listMovie', component: MovieListComponent, canActivate: [ProtectedGuard]},
  {path: 'movie/:search', component: MovieListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule {
}
