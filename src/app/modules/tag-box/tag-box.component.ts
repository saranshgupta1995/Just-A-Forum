import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'tag-box',
    templateUrl: './tag-box.component.html',
    styleUrls: ['./tag-box.component.css'],
})
export class TagBoxComponent implements OnInit {
    tagBoxes = [['']];
    @Input() taggedWith:string[]=[];

    constructor() {
    }

    ngOnInit() {
    }

    removeTag(box){
        this.tagBoxes=this.tagBoxes.filter(x=>x[0]!==box[0])
        this.fetchTagFocus();
    }

    fetchTagFocus(){
        setTimeout(() => {
            document.getElementsByTagName('input')[0].focus();
        }, 100);
    }

    addNewTag(){
        this.tagBoxes = this.tagBoxes.filter(x => x[0].split(' ').join('').length)
        this.tagBoxes.push(['']);
    }

    lastBoxValueChange(e) {
        if (e === ' ') {
            this.addNewTag();
            this.fetchTagFocus();
        }
    }

}
