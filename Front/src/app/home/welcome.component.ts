import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication/services/authentication.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {

  }

  public logout() {
    this.authService
        .logout();
  }
}
