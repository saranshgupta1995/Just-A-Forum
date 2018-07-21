import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'info-text',
    templateUrl: './info-text.component.html',
    styleUrls: ['./info-text.component.css']
})
export class InfoTextComponent implements OnInit {

    infoText = '';
    infoType = '';

    constructor() { }

    ngOnInit() {
    }

    showError(err){
        this.infoText=err;
        this.infoType='err';
    }

    showInfo(info){
        this.infoText=info;
        this.infoType='info';
    }

    showSuccess(succ){
        this.infoText=succ;
        this.infoType='succ';
    }

    clear(){
        this.infoText = '';
        this.infoType = '';
    }


}
