import { Component, OnInit } from '@angular/core';
import { createElement } from '../../../../node_modules/@angular/core/src/view/element';

@Component({
    selector: 'tag-box',
    templateUrl: './tag-box.component.html',
    styleUrls: ['./tag-box.component.css']
})
export class TagBoxComponent implements OnInit {
    tagBoxes = [['']];

    constructor() {
    }

    ngOnInit() {
    }

    removeTag(box){
        this.tagBoxes=this.tagBoxes.filter(x=>x[0]!==box[0])
    }

    lastBoxValueChange(e) {
        if (e === ' ') {
            this.tagBoxes.push(['']);
            setTimeout(()=>{
                document.getElementsByTagName('input')[0].focus();
            },100)
        }
    }

}