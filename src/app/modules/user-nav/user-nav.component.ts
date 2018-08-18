import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SessionDataService } from '../../session-data.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
    selector: 'user-nav',
    templateUrl: './user-nav.component.html',
    styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

    @Output() logoutEvent=new EventEmitter();

    constructor(private router: Router, private sessionData:SessionDataService) {
    }

    ngOnInit() {
    }

    logoutUser(){
        this.logoutEvent.emit('')
    }

    goToProfile(){
        this.router.navigate(['/profile', this.sessionData.userData['username']]);
    }

    goToHome(){
        this.router.navigate(['/home']);
    }

}
