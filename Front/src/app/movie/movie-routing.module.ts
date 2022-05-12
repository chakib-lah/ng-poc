import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieComponent } from "./components/movie.component";
import { ProtectedGuard } from "ngx-auth";

const routes: Routes = [
  { path: 'listMovie', component: MovieComponent , canActivate: [ProtectedGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
