import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../http/question/question.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

    commentText:string;
    questionText:string;
    questionData:any={};

  constructor(private questionService:QuestionService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
      this.questionService.fetchQuestionData({
          question:this.activatedRoute.snapshot.params['ques']
      }).subscribe(res=>{
          this.questionData=res;
      })
  }

    sendComment(){
        this.questionService.addComment({
            question: this.questionText,
            commentIds:[0]
        })
    }

}
