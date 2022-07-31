import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  private user: any;
  public roles: boolean | undefined


    constructor(public authService: AuthenticationService) {

    }

    ngOnInit(): void {
      this.user = this.authService.getAccessData()
      this.roles = this.user.roles.includes('ROLE_ADMIN');
    }


    public logout() {
        this.authService
            .logout();
    }

}
