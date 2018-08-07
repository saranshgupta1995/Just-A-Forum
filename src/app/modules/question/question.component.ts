import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../http/question/question.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { CommentService } from '../../http/comment/comment.service';

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
    questionData:any={};

  constructor(private questionService:QuestionService, private activatedRoute:ActivatedRoute, private commentService:CommentService) { }

  ngOnInit() {
      this.questionService.fetchQuestionData({
          question:this.activatedRoute.snapshot.params['ques']
      }).subscribe(res=>{
          this.questionData=res;
          this.commentService.fetchQuestionComments({
              quesId:res['quesId']
          }).subscribe(comments=>{
              this.questionData.comments=comments
          })
          console.log(res)
      })
  }

    sendComment(){
        this.commentService.addComment({
            comment: this.commentText,
            commentId:0,
            quesId:this.questionData.quesId
        }).subscribe(res=>{
            console.log(res)
        })
    }

}
