import { Component, OnInit } from '@angular/core';
import { transition, animate, state, style, trigger } from '@angular/animations';

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
    constructor() { }

    ngOnInit() {
    }

    toggleToLogin() {
        this.buttonViewState = this.buttonViewState === 'active' ? 'inactive' : 'active';
        let that=this
        setTimeout(()=>{
            that.loginFormView = !that.loginFormView;
            that.loginFormViewState = that.loginFormViewState === 'active' ? 'inactive' : 'active';
        }, that.animTime)
    }

    loginEvent(status){
        this.loggedIn=status;
    }

    signupEvent(status){
        this.loggedIn=status;
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
