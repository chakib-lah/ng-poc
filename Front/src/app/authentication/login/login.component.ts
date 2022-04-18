import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
      private router: Router,
      private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  public login() {
    this.authService
        .login('chakib', 'ngpoc')
        .subscribe(() => this.router.navigateByUrl('/'));
  }
}
