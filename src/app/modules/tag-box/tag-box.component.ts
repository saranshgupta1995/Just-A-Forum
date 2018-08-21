import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuestionService } from '../../http/question/question.service';

@Component({
    selector: 'tag-box',
    templateUrl: './tag-box.component.html',
    styleUrls: ['./tag-box.component.css'],
})
export class TagBoxComponent implements OnInit {
    tagBoxes = [['']];
    @Input() taggedWith: string[] = [];
    existingTags: any = [];
    filteredExistingTags: any = [];
    @ViewChild('t') autoCompleteData;
    @ViewChild('newTagToolTip') newTagToolTip;

    constructor(private questionService: QuestionService) {
        if (!this.taggedWith.length) {
            this.fetchAllTags();
        }
    }

    fetchAllTags() {
        this.questionService.fetchAllTags().subscribe(tags => {
            this.existingTags = tags;
        })
    }

    ngOnInit() {
    }

    removeTag(box) {
        this.tagBoxes = this.tagBoxes.filter(x => x[0] !== box[0])
        this.fetchTagFocus();
    }

    fetchTagFocus() {
        setTimeout(() => {
            document.getElementsByClassName('tag-box')[0]['focus']();
        }, 100);
    }

    addNewTag() {
        this.tagBoxes = this.tagBoxes.filter(x => x[0].split(' ').join('').length)
        this.tagBoxes.push(['']);
    }

    stripTextOf(x) {
        return x.toLowerCase().split('').filter(c => 'abcdefghijklmnopqrstuvwxyz1234567890'.includes(c)).join('')
    }

    lastBoxValueChange(e) {
        let val=this.tagBoxes[this.tagBoxes.length - 1][0];
        if (e === ' ') {
            this.addNewTag();
            this.fetchTagFocus();
        } else {
            this.filteredExistingTags = this.existingTags.filter(x => this.stripTextOf(x).includes(this.stripTextOf(val)))
            this.autoCompleteData[(this.filteredExistingTags.length && val) ? 'open' : 'close']();
        }
    }

    newTagPossibility(){
        this.newTagToolTip.open();
    }

    selectTag(tag){
        this.tagBoxes[this.tagBoxes.length - 1][0]=tag;
        this.addNewTag();
        this.fetchTagFocus();
    }

}
