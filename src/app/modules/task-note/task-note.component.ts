import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'task-note',
    templateUrl: './task-note.component.html',
    styleUrls: ['./task-note.component.css']
})
export class TaskNoteComponent implements OnInit {

    @Input() progresses:String[]=['10%','20%','20%'];
    @Input() tasks:String[]=['Task A',"Task B","Task C"];
    @Output() runTask:EventEmitter<string>=new EventEmitter(); 
    
    constructor() { }

    ngOnInit() {
    }

    goToTask(task){
        this.runTask.emit(task);
    }

}
