import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    loggedIn: boolean = false;

    constructor(private authService: AuthenticationService) {

    }

    ngOnInit(): void {
        this.loggedIn = this.authService.isLoggedIn();
    }


    public logout() {
        this.authService
            .logout();
    }

}
