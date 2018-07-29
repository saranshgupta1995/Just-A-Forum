import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'task-note',
    templateUrl: './task-note.component.html',
    styleUrls: ['./task-note.component.css']
})
export class TaskNoteComponent implements OnInit {

    progresses:String[]=['10%','20%','20%'];
    tasks:String[]=['Task A',"Task B","Task C"];

    constructor() { }

    ngOnInit() {
    }

}
