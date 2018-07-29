import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../http/profile/profile.service';

@Component({
    selector: 'my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

    username:string;
    userData:any={};

    constructor(private route: ActivatedRoute, private profileService:ProfileService) {
        this.username = route.snapshot.params['username'];
        this.profileService.fetchUserProfile({username:this.username}).subscribe(res=>{
            this.userData=res;
        })
    }

    ngOnInit() {
    }

    goToTask(e){
        console.log(e);
    }

}
