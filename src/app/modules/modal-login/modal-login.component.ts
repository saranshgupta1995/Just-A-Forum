import { Component, OnInit, Output, EventEmitter, ViewChild, ContentChildren } from '@angular/core';
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
  username: string = "";
  password: string = "";
  private user: SocialUser;
  public authorized: boolean = false;
  @Output() onReturn = new EventEmitter();
  @Output() loginEvent = new EventEmitter();
  @ViewChild('content') content;
  // @ContentChildren(TdDataTableTemplateDirective) tem plates;
  ngOnInit() {
  }
  closeResult: string;
  constructor(private router: Router, private sessionData: SessionDataService, private modalService: NgbModal, private socialAuthService: AuthService, private loginSignupService: LoginSignupService) {
  }
  open(content = this.content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
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
        // Now sign-in with userData        
        if (userData != null) {
          this.authorized = true;
          this.user = userData;
          // login via facebook / login
          this.loginSignupService.validateLoginAttempt({
            "username": this.username,
            "password": this.password
          })
            .subscribe(res => {
              if (res['username'] == 'not found') { }
              // this.infoText.showError('Invalid Login Credentials');
              else if (res['unverified']) {
                // this.infoText.showError('Account Pending Email Verification');
              } else {
                this.sessionData.username = this.username;
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
      }
    );
  }

  public signOut() {
    this.socialAuthService.signOut();
    this.authorized = false;
  }

}
