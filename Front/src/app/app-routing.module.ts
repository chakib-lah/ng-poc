import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from "./home/welcome.component";
import { NotFondComponent } from "./shared/not-fond/not-fond.component";

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent},
  { path: '', component: WelcomeComponent},
  { path: '**', component: NotFondComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
