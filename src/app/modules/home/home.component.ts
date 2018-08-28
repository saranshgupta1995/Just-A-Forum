import { Component, OnInit } from '@angular/core';
import { SessionDataService } from '../../session-data.service';
import { HttpClient } from '../../../../node_modules/@angular/common/http';

@Component({
    selector: 'my-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    pendingTasks;
    newDevTask = {
        task: '',
        dev: '',
        summary: ''
    };

    constructor(private http: HttpClient, public sessionData: SessionDataService) {
    }

    ngOnInit() {
    }

    devURL ="http://obscure-sea-69570.herokuapp.com"

    getDevStuff() {
        this.http.post(`${this.devURL}/showDevTasks`, { jk: 'lol' }, { headers: { author: this.sessionData.userToken } }).subscribe(res => {
            this.pendingTasks = res['tasks'];
        })
    }

    addDevStuff() {
        this.http.post(`${this.devURL}/addDevTasks`, this.newDevTask, { headers: { author: this.sessionData.userToken } }).subscribe(res => {
        })
    }

    removeDevTask(task) {
        this.http.post(`${this.devURL}/deleteDevTask`, task, { headers: { author: this.sessionData.userToken } }).subscribe(res => {
        })
    }
}
