import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { QuestionService } from '../../http/question/question.service';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { CommentService } from '../../http/comment/comment.service';
import { InfoTextComponent } from '../info-text/info-text.component';
import { ProfileService } from '../../http/profile/profile.service';
import { SessionDataService } from '../../session-data.service';
import { TagBoxComponent } from '../tag-box/tag-box.component';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.css'],
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({ opacity: 0 }),
                    animate('150ms', style({ opacity: 1 }))
                ]),
            ]
        )
    ],
})
export class QuestionComponent implements OnInit {

    commentText: string;
    @Input() questionText: string;
    questionData: any = {};
    showScreen = false;
    @ViewChild('infoText') infoText: InfoTextComponent;
    @ViewChild('newQuestionTagBox') newQuestionTagBox: TagBoxComponent;
    quesTags: any = [];
    @Input() new = false;
    @Input() srcHome = false;
    newQuestion='';

    constructor(private questionService: QuestionService, private sessionData: SessionDataService, private activatedRoute: ActivatedRoute, private commentService: CommentService, private profileService: ProfileService, private router: Router) {
    }

    ngOnInit() {
        if (!this.new) {
            this.questionService.fetchQuestionData({
                question: !this.srcHome?this.activatedRoute.snapshot.params['ques']:this.questionText
            }).subscribe(res => {
                this.questionData = res;
                this.getTags();
                this.commentService.fetchQuestionComments({
                    quesId: res['quesId']
                }).subscribe(comments => {
                    this.showScreen = true;
                    this.questionData.comments = comments
                })
            })
        }else{
            this.showScreen=true;
        }
    }

    getTags() {
        this.questionService.fetchQuestionTags({
            quesId: this.questionData['quesId']
        }).subscribe(tags => {
            this.quesTags = tags['map'](x => x.tag);
        })
    }

    addQuestion(){
        this.questionService.addQuestion({
            question: this.newQuestion,
            profileId: this.sessionData.userData['userId'],
            tags: this.newQuestionTagBox.tagBoxes.splice(0, this.newQuestionTagBox.tagBoxes.length-1)
        }).subscribe(res => {
        })
    }

    navigateToQuestion(){
        if(this.srcHome)
            this.router.navigate(['question', this.questionData['question']]);
    }

    sendComment() {
        this.infoText.showProcess('Sending Comment')
        this.commentService.addComment({
            comment: this.commentText,
            commentId: this.questionData.comments.length,
            quesId: this.questionData.quesId
        }).subscribe(res => {
            this.infoText.clear();
            if (res['ok']) {
                this.profileService.addWorth({
                    username: this.sessionData.userData['username'],
                    worth: this.questionData.worth + this.sessionData.userData['worth'],
                    oldWorth: this.sessionData.userData['worth']
                }).subscribe(res=>{
                    this.sessionData.userData['worth']+=this.questionData.worth;
                })
                this.questionData.comments.push({
                    comment: this.commentText,
                    commentId: 0,
                    quesId: this.questionData.quesId
                })
            }
        })
    }

}
