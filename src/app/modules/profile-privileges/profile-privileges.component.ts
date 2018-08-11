import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { SessionDataService } from '../../session-data.service';

@Component({
    selector: 'profile-privileges',
    templateUrl: './profile-privileges.component.html',
    styleUrls: ['./profile-privileges.component.css']
})
export class ProfilePrivilegesComponent implements OnInit {
    username: string;

    constructor(private sessionData:SessionDataService) {
        console.log(sessionData);
    }

    ngOnInit() {
    }

}
