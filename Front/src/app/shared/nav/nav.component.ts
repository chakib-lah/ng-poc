import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


    constructor(public authService: AuthenticationService) {

    }

    ngOnInit(): void {
    }


    public logout() {
        this.authService
            .logout();
    }

}
