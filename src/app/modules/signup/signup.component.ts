import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    userName='';
    password='';
    userEmail='';
  constructor() { }

  ngOnInit() {
  }

    onLoginAttempt() {
        console.log(this.userName, this.password, this.userEmail);
    }

}
