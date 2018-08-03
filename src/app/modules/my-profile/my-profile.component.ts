import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../http/profile/profile.service';
import { TaskRoutes } from '../../http/taskRoutes';

@Component({
    selector: 'my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

    username:string;
    userData:any={};
    taskData:any={};

    constructor(private route: ActivatedRoute, private profileService:ProfileService,private taskRoutes:TaskRoutes, private router:Router) {
        this.username = route.snapshot.params['username'];
        this.profileService.fetchUserProfile({username:this.username}).subscribe(res=>{
            this.userData=res;
            this.profileService.fetchUserLevelData({username:this.username,exp_level:this.userData['exp_level']}).subscribe(res=>{
                this.taskData=res;
                if(this.userData['exp_level']=='zero'){
                    this.taskData.tasks=['Answer your first question']
                }
            });
        });
    }

    ngOnInit() {
    }

    goToTask(e){
        this.router.navigate(this.taskRoutes[e]);        
    }

}
