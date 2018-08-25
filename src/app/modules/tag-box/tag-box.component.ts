import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuestionService } from '../../http/question/question.service';

@Component({
    selector: 'tag-box',
    templateUrl: './tag-box.component.html',
    styleUrls: ['./tag-box.component.css'],
})
export class TagBoxComponent implements OnInit {
    tagBoxes = [['','']];
    @Input() taggedWith: string[] = [];
    existingTags: any = [];
    isATagPossibilty = false;
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
        this.isATagPossibilty = false;
        this.tagBoxes = this.tagBoxes.filter(x => x[0].split('-').join('').length)
        this.tagBoxes.push(['','']);
        this.fetchTagFocus();
    }

    highlightSubstr(str, substr = this.stripTextOf(this.tagBoxes[this.tagBoxes.length - 1][0])) {
        let start = str.indexOf(substr)
        let end = str.indexOf(substr) + substr.length
        return str.substr(0, start) +
            '<span class="query-match">' +
            str.substr(start, end - start) +
            '</span>' +
            str.substr(end);
    }

    stripTextOf(x) {
        return x.replace(/[^A-Za-z0-9-]/g, '-').replace(/(-)(?=\1)/gi, '').toLowerCase()
    }

    lastBoxValueChange(e) {
        let val = this.stripTextOf(this.tagBoxes[this.tagBoxes.length - 1][0]);
        this.filteredExistingTags = this.existingTags.filter(x => x.includes(val))
        this.autoCompleteData[(this.filteredExistingTags.length && val) ? 'open' : 'close']();
    }

    cancelThisTagPossibility() {
        this.isATagPossibilty = false;
        this.newTagToolTip.close();
        this.fetchTagFocus();
    }

    newTagPossibility() {
        this.isATagPossibilty = true;
        this.tagBoxes[this.tagBoxes.length - 1][0] = this.stripTextOf(this.tagBoxes[this.tagBoxes.length - 1][0])
        this.newTagToolTip.open();
    }

    selectTag(tag) {
        this.tagBoxes[this.tagBoxes.length - 1][0] = tag;
        this.addNewTag();
    }

}
