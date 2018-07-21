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
    @Output() onReturn = new EventEmitter();
    @Output() signupEvent = new EventEmitter();
    @ViewChild('infoText') infoText;
    
  constructor(private loginSignupService:LoginSignupService) { }

  ngOnInit() {
  }

    onSignupAttempt() {
        this.showForm = false;
        this.infoText.showProcess('Sending Data');
        this.loginSignupService.addNewUser({
            "userName":this.userName,
            "password":this.password,
            "email":this.userEmail
        })
            .subscribe(res => {
                this.showForm = true;
                if (!res['status'])
                    this.infoText.showError('Signup failed');
                else {
                    this.infoText.showSuccess('Please verify account through the received email');
                    this.signupEvent.emit(res['status']);
                }
            })
    }

    backFromLogin() {
        this.onReturn.emit('');
    }


}
