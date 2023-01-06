import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { PageEnum } from "../search/pageEnum";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  pageValue = PageEnum;

  constructor(public authService: AuthenticationService) {
  }

  public logout() {
    this.authService
      .logout();
  }

}
