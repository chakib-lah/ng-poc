import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PublicGuard } from 'ngx-auth';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login', canActivate: [ PublicGuard ], component: LoginComponent },
  { path: 'register', canActivate: [ PublicGuard ], component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
