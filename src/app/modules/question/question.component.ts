import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '../../http/question/question.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { CommentService } from '../../http/comment/comment.service';
import { InfoTextComponent } from '../info-text/info-text.component';
import { ProfileService } from '../../http/profile/profile.service';
import { SessionDataService } from '../../session-data.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({opacity: 0 }),
                    animate('150ms', style({opacity: 1 }))
                ]),
            ]
        )
    ],
})
export class QuestionComponent implements OnInit {

    commentText:string;
    questionText:string;
    questionData: any = {};
    showScreen=false;
    @ViewChild('infoText') infoText:InfoTextComponent;
    
    constructor(private questionService:QuestionService, private sessionData:SessionDataService, private activatedRoute:ActivatedRoute, private commentService:CommentService, private profileService: ProfileService) { 
    }
        
    ngOnInit() {
      this.questionService.fetchQuestionData({
          question:this.activatedRoute.snapshot.params['ques']
      }).subscribe(res=>{
          console.log(res)
          this.questionData=res;
          this.commentService.fetchQuestionComments({
              quesId:res['quesId']
          }).subscribe(comments=>{
              this.showScreen=true;
              this.questionData.comments=comments
            })
        })
        
    }
    
    sendComment(){
        this.infoText.showProcess('Sending Comment')
        this.commentService.addComment({
            comment: this.commentText,
            commentId:this.questionData.comments.length,
            quesId:this.questionData.quesId
        }).subscribe(res=>{
            this.infoText.clear();
            if(res['ok']){
                this.profileService.addWorth({
                    username: this.sessionData.userData['username'],
                    worth: this.questionData.worth + this.sessionData.userData['worth']
                }).subscribe()
                this.questionData.comments.push({
                    comment: this.commentText,
                    commentId: 0,
                    quesId: this.questionData.quesId
                })
            }
        })
    }
    
}
