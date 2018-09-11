import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../http/profile/profile.service';
import { TaskRoutes } from '../../http/taskRoutes';
import { QuestionService } from '../../http/question/question.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { SessionDataService } from '../../session-data.service';

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

    username: string;
    userData: any = {};
    taskData: any = {};
    askingQuestion = false;
    newQuestion = '';
    catchPhrase='';

    constructor(private route: ActivatedRoute, private profileService: ProfileService, private taskRoutes: TaskRoutes, private router: Router, private questionService: QuestionService, public sessionData: SessionDataService) {

        this.username = sessionData.userData.username;
        if (sessionData.fromRegularlogin) {
            this.profileService.fetchUserProfile({ username: this.username }).subscribe(res => {
                sessionData.userData = JSON.parse(JSON.stringify(res));
                this.sessionData.decideUserPrivileges();
                this.profileService.fetchUserLevelData({ username: this.username, exp_level: res['exp_level'] }).subscribe(res => {
                    sessionData.levelData = res;    
                    sessionData.levelData.taskList = sessionData.levelTasks[sessionData.userData['exp_level']];
                });
            });
        }
    }
    ngOnInit() {
    }

    initAskQuestion() {
        this.askingQuestion = true;
    }

    goToTask(e) {
        this.router.navigate(this.taskRoutes[e]);
    }

    catchCatchPhrase(e){
        this.sessionData.levelData['catchPhrase']=e;
        this.profileService.updateCatchPhrase({
            username:this.sessionData.userData['username'],
            catchPhrase: this.sessionData.levelData['catchPhrase'],
            // 'catchPhrase': this.catchPhrase,
            exp_level:this.sessionData.userData['exp_level']
        }).subscribe()
    }

}
