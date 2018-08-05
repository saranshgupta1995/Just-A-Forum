import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../http/profile/profile.service';
import { TaskRoutes } from '../../http/taskRoutes';
import { QuestionService } from '../../http/question/question.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.css'],
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
export class MyProfileComponent implements OnInit {

    username:string;
    userData:any={};
    taskData:any={};
    askingQuestion=false;
    newQuestion='';

    constructor(private route: ActivatedRoute, private profileService:ProfileService,private taskRoutes:TaskRoutes, private router:Router, private questionService:QuestionService) {
        this.username = route.snapshot.params['username'];
        this.profileService.fetchUserProfile({username:this.username}).subscribe(res=>{
            this.userData=res;
            console.log(this.userData);
            this.profileService.fetchUserLevelData({username:this.username,exp_level:this.userData['exp_level']}).subscribe(res=>{
                this.taskData=res;
                if(this.userData['exp_level']=='zero'){
                    this.taskData.tasks=['Answer your first question']
                }
            });
        });
    }

    askQuestion(){
        console.log(this.newQuestion);
        this.questionService.addQuestion({
            question:this.newQuestion,
            profileId:this.userData.userId
        }).subscribe(res=>{
            console.log(res);
        })
    }

    ngOnInit() {
    }

    initAskQuestion(){
        this.askingQuestion=true;
    }

    goToTask(e){
        this.router.navigate(this.taskRoutes[e]);        
    }

}
