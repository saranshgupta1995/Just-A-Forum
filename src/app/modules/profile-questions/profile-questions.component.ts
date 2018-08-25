import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../http/profile/profile.service';

@Component({
    selector: 'profile-questions',
    templateUrl: './profile-questions.component.html',
    styleUrls: ['./profile-questions.component.css']
})
export class ProfileQuestionsComponent implements OnInit {

    userQuestions;

    constructor(private profileService: ProfileService) {
        profileService.fetchUserQuestions().subscribe(res => {
            console.log(res)
            this.userQuestions = res;
            this.userQuestions.sort((a,b)=>{
                return ~~a.quesId.split('.')[1] - ~~b.quesId.split('.')[1]
            })
        })
    }

    ngOnInit() {

    }

}
