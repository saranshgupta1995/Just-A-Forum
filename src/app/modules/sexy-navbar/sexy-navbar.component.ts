import { Component, OnInit } from '@angular/core';
import { transition, animate, state, style, trigger } from '@angular/animations';
import { SessionDataService } from '../../session-data.service';
import { ProfileService } from '../../http/profile/profile.service';
import { LoginSignupService } from '../../http/login-signup/login-signup.service';

@Component({
    selector: 'sexy-navbar',
    templateUrl: './sexy-navbar.component.html',
    styleUrls: ['./sexy-navbar.component.css'],
    animations: [
        trigger('shrinker', [
            // state('inactive', style({ right:-800 })),
            // state('active', style({ right:0 })),
            transition('active => inactive', [
                style({ right:0 }),
                animate(200, style({ right:-800 }),)]),
            transition('inactive => active', [
                style({ right:-800 }),
                animate(200, style({ right:0 }),)])
        ])
    ]
})
export class SexyNavbarComponent implements OnInit {

    name='login';
    buttonViewState='active'
    loginFormViewState='inactive'
    loginFormView=false;
    signupFormViewState='inactive'
    signupFormView=false;
    animTime=200;
    errorState=false;
    loggedIn=false;
    constructor(private loginSignupService: LoginSignupService, private profileService: ProfileService, private sessionData: SessionDataService) { 
        let token = localStorage.getItem('desocializeAuth');
        if(token && token!=='undefined'){
            this.loggedIn=true;
            this.sessionData.fromRegularlogin = false;
            sessionData.userToken=token;
            this.loginSignupService.validateToken()
                .subscribe(res => {
                    this.profileService.fetchUserProfile({ username: res['user'] }).subscribe(res => {
                        sessionData.userData = res;
                        this.sessionData.decideUserPrivileges();
                        this.profileService.fetchUserLevelData({ username: sessionData.userData.username, exp_level: sessionData.userData['exp_level'] }).subscribe(res => {
                            sessionData.userTasks = res;
                            if (sessionData.userData['exp_level'] == 'zero') {
                                sessionData.userTasks.taskList = ['Answer your first question'];
                            }
                            console.log(sessionData)
                        });
                    });
                })
        }
    }

    ngOnInit() {
    }

    logoutUser(){
        console.log('calling main func')
        localStorage.clear();
        this.loggedIn=false;
        this.sessionData.reset();
    }
    
    loginEvent(status){
        this.loggedIn=status;
    }
   
    toggleToLogin() {
        this.buttonViewState = this.buttonViewState === 'active' ? 'inactive' : 'active';
        let that=this
        setTimeout(()=>{
            that.loginFormView = !that.loginFormView;
            that.loginFormViewState = that.loginFormViewState === 'active' ? 'inactive' : 'active';
        }, that.animTime)
    }

    toggleToSignup() {
        this.buttonViewState = this.buttonViewState === 'active' ? 'inactive' : 'active';
        let that=this
        setTimeout(()=>{
            that.signupFormView = !that.signupFormView;
            that.signupFormViewState = that.signupFormViewState === 'active' ? 'inactive' : 'active';
        }, that.animTime)
    }

    toggleToHomeNav(src){
        if(src=='login')
        this.loginFormViewState = this.loginFormViewState === 'active' ? 'inactive' : 'active';
        else
        this.signupFormViewState = this.signupFormViewState === 'active' ? 'inactive' : 'active';
        let that=this;
        setTimeout(() => {
            if (src == 'login')
            that.loginFormView = !that.loginFormView;
            else
            that.signupFormView = !that.signupFormView;
            that.buttonViewState = that.buttonViewState === 'active' ? 'inactive' : 'active';
        }, that.animTime)
    }

}
