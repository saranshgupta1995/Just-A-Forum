import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { LoginSignupService } from '../../http/login-signup/login-signup.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    userName = '';
    password = '';
    showForm=true;
    @ViewChild('infoText') infoText;
    @Output() onReturn=new EventEmitter();
    @Output() loginEvent=new EventEmitter();

    constructor(private loginSignupService: LoginSignupService) { }

    ngOnInit() {
    }


    onLoginAttempt() {
        this.showForm=false;
        this.infoText.showProcess('Sending Data');
        this.loginSignupService.validateLoginAttempt({
            "userName": this.userName,
            "password": this.password
        })
        .subscribe(res=>{
            this.showForm=true;
            if(!res['status'])
            this.infoText.showError('Invalid Login Credentials');
            else{
                this.infoText.showSuccess('Logged In Successfully');
                this.loginEvent.emit(res['status']);
            }
        })
        
    }

    backFromLogin(){
        this.onReturn.emit('');
    }

}
