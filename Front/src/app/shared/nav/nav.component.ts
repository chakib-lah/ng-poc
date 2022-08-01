import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent {


    constructor(public authService: AuthenticationService) {

    }

    public logout() {
        this.authService
            .logout();
    }

}
