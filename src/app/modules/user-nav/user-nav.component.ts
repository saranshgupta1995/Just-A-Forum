import { Component, OnInit } from '@angular/core';
import { LoginSignupService } from '../../http/login-signup/login-signup.service';
import { ProfileService } from '../../http/profile/profile.service';
import { SessionDataService } from '../../session-data.service';

@Component({
    selector: 'user-nav',
    templateUrl: './user-nav.component.html',
    styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
