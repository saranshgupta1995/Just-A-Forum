import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginSignupService } from '../../http/login-signup/login-signup.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    userName = '';
    password = '';
    @Output() onReturn=new EventEmitter();
    @Output() loginEvent=new EventEmitter();

    constructor(private loginSignupService: LoginSignupService) { }

    ngOnInit() {
    }


    onLoginAttempt() {
        this.loginSignupService.validateLoginAttempt({
            "userName": this.userName,
            "password": this.password
        })
        .subscribe(res=>{
            this.loginEvent.emit(res['status']);
        })
        
    }

    backFromLogin(){
        this.onReturn.emit('');
    }

}
