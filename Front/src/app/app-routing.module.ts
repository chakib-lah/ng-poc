import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFondComponent } from "./shared/not-fond/not-fond.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: NotFondComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
