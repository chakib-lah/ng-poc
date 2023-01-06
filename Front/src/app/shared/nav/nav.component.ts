import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  search: string = "";

  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {

  }

  public logout() {
    this.authService
      .logout();
  }

  public getMovie(value: string) {
    this.router.navigateByUrl("/movie/"+ value);
    //this.router.navigate(['/movie', {search: value}]);

  }

}
