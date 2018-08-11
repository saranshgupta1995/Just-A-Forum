import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
    selector: 'profile-privileges',
    templateUrl: './profile-privileges.component.html',
    styleUrls: ['./profile-privileges.component.css']
})
export class ProfilePrivilegesComponent implements OnInit {
    username: string;

    constructor(private route: ActivatedRoute) {
        route.parent.params.subscribe(x =>
             this.username=x['username']
            );
    }

    ngOnInit() {
    }

}
