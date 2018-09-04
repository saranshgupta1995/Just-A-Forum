import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'dsclz-easy-editor',
    templateUrl: './easy-editor.component.html',
    styleUrls: ['./easy-editor.component.css']
})
export class EasyEditorComponent implements OnInit {

    @Input() val='';
    tempVal='';
    @Input() emptyDataMsg='';
    @Output() valEvent=new EventEmitter();

    editMode=false;

    constructor() { }

    ngOnInit() {
    }

    switchModes(ignore){
        this.editMode=!this.editMode;
        if(this.editMode){
            setTimeout(()=>{
                document.getElementById('realInput')['focus']();
            },100)
        }
        if(ignore){
            this.tempVal=this.val;
            return
        }
        this.throwVal();
    }

    throwVal(){
        this.val = this.tempVal ? this.tempVal : '';
        this.valEvent.emit();
    }

}
