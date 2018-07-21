import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'info-text',
    templateUrl: './info-text.component.html',
    styleUrls: ['./info-text.component.css']
})
export class InfoTextComponent implements OnInit {

    infoText = '';
    infoType = '';
    processId;

    constructor() { }

    ngOnInit() {
    }

    showError(err){
        this.clearProcess();
        this.infoText=err;
        this.infoType='err';
    }

    showInfo(info){
        this.clearProcess();
        this.infoText=info;
        this.infoType='info';
    }

    showSuccess(succ){
        this.clearProcess();
        this.infoText=succ;
        this.infoType='succ';
    }

    clearProcess(){
        if (this.processId) {
            clearInterval(this.processId);
            this.processId = undefined;
        }
    }

    clear(){
        this.clearProcess();
        this.infoText = '';
        this.infoType = '';
    }

    showProcess(process){
        this.infoType='info';
        let counterBlimp=1;
        let blimps=['','.','..','...'];
        this.infoText=process;
        this.processId=setInterval(()=>{
            this.infoText = `${blimps[counterBlimp]}${process}`;
            counterBlimp=counterBlimp===3?0:counterBlimp+1;
        },500)
    }


}
