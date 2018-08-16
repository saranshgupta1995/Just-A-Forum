import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'user-nav',
    templateUrl: './user-nav.component.html',
    styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {

    @Output() logoutEvent=new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    logoutUser(){
        this.logoutEvent.emit('')
    }

}
