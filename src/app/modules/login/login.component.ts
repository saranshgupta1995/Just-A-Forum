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
            if(res['username']=='not found')
            this.infoText.showError('Invalid Login Credentials');
            else if(res['unverified']){
                this.infoText.showError('Account Pending Email Verification');
            }else{
                this.infoText.showSuccess('Logged in Successfully');
                this.loginEvent.emit(true);
            }
        })
        
    }

    backFromLogin(){
        this.onReturn.emit('');
    }

}
