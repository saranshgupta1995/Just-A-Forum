import { Component, OnInit, Output, EventEmitter, ViewChild, ContentChildren, TemplateRef, ElementRef } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
    AuthService,
    SocialUser,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular5-social-login';
import { SessionDataService } from '../../session-data.service';
import { LoginSignupService } from '../../http/login-signup/login-signup.service';
import { Router } from '../../../../node_modules/@angular/router';
@Component({
    selector: 'app-modal-login',
    templateUrl: './modal-login.component.html',
    styleUrls: ['./modal-login.component.css'],

})
export class ModalLoginComponent implements OnInit {
    userName: string = "";
    password: string = "";
    email: string = "";
    username: string = "";
    private user: SocialUser;
    public authorized: boolean = false;
    checkSocialName: Boolean = false;
    loginUserName: string;
    loginPassword: string;
    @Output() onReturn = new EventEmitter();
    @Output() loginEvent = new EventEmitter();
    @Output() trigger = new EventEmitter();
    @ViewChild('content') content;
    @ViewChild('verified') verified: ElementRef;
    @ViewChild('username_verified') username_verified: ElementRef;
  
    modalReference: any;
    modalReference1: any;

    setUserName: string = '';
    setPassword: string = '';
    error = "";
    validUsername = false;
    ngOnInit() {
    }
    closeResult: string;
    constructor(private router: Router, private sessionData: SessionDataService, private modalService: NgbModal, private socialAuthService: AuthService, private loginSignupService: LoginSignupService) {
    }
    open(content = this.content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
        this.modalReference.result.then((result) => { }, (reason) => {
            this.getDismissReason(reason);
        });
    }

    public socialSignIn(socialPlatform: string) {

        let socialPlatformProvider;
        if (socialPlatform == "facebook") {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        } else if (socialPlatform == "google") {
            socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }

        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                
                if (userData != null) {
                    this.authorized = true;
                    this.user = userData;
                    
                    this.open2(this.verified)
                    this.email = this.user.email
                    this.username = this.user.name
                }
            }
        );
    }

    public signOut() {
        this.socialAuthService.signOut();
        this.authorized = false;
    }

    private getDismissReason(reason: any): any {
        if (reason === ModalDismissReasons.ESC) {
            this.trigger.emit('x')
            this.checkSocialName = false
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            

            this.trigger.emit('x');
            this.checkSocialName = false
        } else {
            this.trigger.emit('x');
            this.checkSocialName = false
        }
    }


    open2(content) {
        this.modalReference1 = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'sm' })
        this.modalReference1.result.then((result) => {

        }, (reason) => {

        });
    }
    open3(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' }).result.then((result) => {

        }, (reason) => {

        });
    }
    login() {
        this.loginSignupService.validateLoginAttempt({
            "username": this.loginUserName,
            "password": this.loginPassword
        })
            .subscribe(res => {
                if (res['username'] == 'not found') { }
                // this.infoText.showError('Invalid Login Credentials');
                else if (res['unverified']) {
                    // this.infoText.showError('Account Pending Email Verification');
                }
                else {
                    // this.loginTrigger.emit("trigger")
                    this.modalReference.close();
                    this.sessionData.username = this.loginUserName;
                    this.sessionData.fromRegularlogin = true;
                    // this.infoText.showSuccess('Logged in Successfully');
                    localStorage.setItem("desocializeAuth", res['token'])
                    localStorage.setItem("device", res['deviceId'])
                    this.sessionData.userToken = res['token'];
                    this.sessionData.userDevice = res['deviceId'];
                    this.loginEvent.emit(true);
                    this.router.navigate(['/profile', res['username']]);
                }
            })
    }
    //login1 is used for social login
    login1() {
        //call register
        this.loginSignupService.addNewUser({
            "username": this.setUserName,
            "password": this.setPassword,
            "email": this.email,
            "social": true
        })
            .subscribe(res => {
                
                if (res['status']) {
                    
                    this.login3()
                }

            })


    }
    //login2 is used for social login
    login2() {
        this.loginSignupService.validateLoginAttempt({
            "username": this.setUserName,
            "password": this.setPassword
        })
            .subscribe(res => {
                

                this.modalReference.close();
                this.modalReference1.close();
                this.sessionData.username = this.setUserName;
                this.sessionData.fromRegularlogin = true;
                // this.infoText.showSuccess('Logged in Successfully');
                localStorage.setItem("desocializeAuth", res['token'])
                localStorage.setItem("device", res['deviceId'])
                this.sessionData.userToken = res['token'];
                this.sessionData.userDevice = res['deviceId'];
                this.loginEvent.emit(true);
                this.router.navigate(['/profile', res['username']]);
            })
    }

    validateUsername() {
        this.validUsername = false;
        this.loginSignupService.validateUserName({ 'username': this.setUserName })
            .subscribe(res => {
                

                if (res['status']) {
                    

                    // this.infoText.showError('Username Already Exists');
                    this.error = "Username Already Exists";
                } else {
                    

                    this.validUsername = true;
                    // this.infoText.clear();
                    this.error = "";
                }
            })
    }

    login3() {
        this.loginSignupService.validateLoginAttempt({
            "username": this.setUserName,
            "password": this.setPassword
        })
            .subscribe(res => {
                console.warn("Reeeee",res);
                
                if (res['username'] == 'not found') { }
                // this.infoText.showError('Invalid Login Credentials');
                else if (res['unverified']) {
                    // this.infoText.showError('Account Pending Email Verification');
                }
                else {
                    // this.loginTrigger.emit("trigger")
                    this.modalReference.close();
                    this.modalReference1.close();
                    this.sessionData.username = this.setUserName;
                    
                    this.sessionData.fromRegularlogin = true;
                    // this.infoText.showSuccess('Logged in Successfully');
                    localStorage.setItem("desocializeAuth", res['token'])
                    localStorage.setItem("device", res['deviceId'])
                    this.sessionData.userToken = res['token'];
                    this.sessionData.userDevice = res['deviceId'];
                    console.warn("fghj",this.sessionData);
                    this.loginEvent.emit(true);
                    this.router.navigate(['/profile', res['username']]);                   
                    
                }
            })
    }
    openSmallModal(){
        this.checkSocialName?'':this.open3(this.username_verified)
    }
}
