import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { LoginSignupService } from '../../http/login-signup/login-signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    userName='';
    password='';
    userEmail = '';
    showForm=true;
    validUsername=false;
    @Output() onReturn = new EventEmitter();
    @Output() signupEvent = new EventEmitter();
    @ViewChild('infoText') infoText;
    
  constructor(private loginSignupService:LoginSignupService) { }

  ngOnInit() {
  }

    onSignupAttempt() {
        if(!this.validUsername){
            this.infoText.showError('Username Already Exists');
            return
        }
        this.showForm = false;
        this.infoText.showProcess('Sending Data');
        this.loginSignupService.addNewUser({
            "userName":this.userName,
            "password":this.password,
            "email":this.userEmail
        })
            .subscribe(res => {
                if (!res['status'])
                    this.infoText.showError('An account is already linked with the same email');
                else {
                    this.infoText.showSuccess('Please verify account through the received email');
                    this.showForm = true;
                    this.signupEvent.emit(res['status']);
                }
            })
    }

    validateUsername(){
        this.validUsername=false;
        this.loginSignupService.validateUserName({'username':this.userName})
        .subscribe(res=>{
            if(res['status']){
                this.infoText.showError('Username Already Exists');
            }else{
                this.validUsername=true;
                this.infoText.clear();
            }
        })
    }

    backFromLogin() {
        this.onReturn.emit('');
    }


}
