import { Component, OnInit ,ViewChild,Output,EventEmitter} from '@angular/core';
import { LoginSignupService } from '../../http/login-signup/login-signup.service';
import { Router } from '@angular/router';
import { SessionDataService } from '../../session-data.service';
@Component({
  selector: 'app-big-login',
  templateUrl: './big-login.component.html',
  styleUrls: ['./big-login.component.css']
})
export class BigLoginComponent implements OnInit {

    username = '';
    password = '';
    showForm = true;
    @ViewChild('infoText') infoText;
    @Output() onReturn = new EventEmitter();
    @Output() loginEvent = new EventEmitter();

    constructor(private sessionData: SessionDataService, private loginSignupService: LoginSignupService, private router: Router) { }

    ngOnInit() {
    }


    onLoginAttempt() {
        console.warn("Q");
        
        this.showForm = false;
        // this.infoText.showProcess('Sending Data');
        this.loginSignupService.validateLoginAttempt({
            "username": this.username,
            "password": this.password
        })
            .subscribe(res => {
                this.showForm = true;
                if (res['username'] == 'not found')
                    this.infoText.showError('Invalid Login Credentials');
                else if (res['unverified']) {
                    this.infoText.showError('Account Pending Email Verification');
                } else {
                    this.sessionData.username = this.username;
                    this.sessionData.fromRegularlogin = true;
                    this.infoText.showSuccess('Logged in Successfully');
                    localStorage.setItem("desocializeAuth", res['token'])
                    localStorage.setItem("device", res['deviceId'])
                    this.sessionData.userToken = res['token'];
                    this.sessionData.userDevice = res['deviceId'];
                    this.loginEvent.emit(true);
                    this.router.navigate(['/profile', res['username']]);
                }
            })

    }

    backFromLogin() {
        this.onReturn.emit('');
    }


}
