import { Component, OnInit } from '@angular/core';
import { LoginSignupService } from '../../http/login-signup/login-signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    userName='';
    password='';
    userEmail='';
  constructor(private loginSignupService:LoginSignupService) { }

  ngOnInit() {
  }

    onSignupAttempt() {
        this.loginSignupService.addNewUser({
            "userName":this.userName,
            "password":this.password,
            "email":this.userEmail
        });
    }

}
