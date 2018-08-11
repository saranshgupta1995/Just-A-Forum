import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { SessionDataService } from '../../session-data.service';

@Component({
    selector: 'profile-privileges',
    templateUrl: './profile-privileges.component.html',
    styleUrls: ['./profile-privileges.component.css']
})
export class ProfilePrivilegesComponent implements OnInit {
    privileges:any;

    constructor(private sessionData:SessionDataService) {
        this.privileges=sessionData.privileges;
    }

    ngOnInit() {
    }

}
