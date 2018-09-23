import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpUrls } from './../httpUrls';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { SessionDataService } from '../../session-data.service';
@Injectable({

    providedIn: 'root'
})
export class LoginSignupService {

    constructor(private http: HttpClient, private httpUrls: HttpUrls, private sessionData:SessionDataService) { }

    addnewuser(user: any) {
        return this.http.post(this.httpUrls.addNewUserUrl, user).pipe();
    }

    validateLoginAttempt(user: any) {
        return this.http.post(this.httpUrls.validateLoginUrl, user).pipe();
    }

    validateToken(data={token:'my_uniq_token'}) {
        return this.http.post(this.httpUrls.validateTokenUrl, data, { headers: { author: this.sessionData.userToken, device: this.sessionData.userDevice } }).pipe();
    }

    validateUserName(username: any) {
        return this.http.post(this.httpUrls.validateUsernameUrl, username).pipe();
    }

    logoutUser(username: any) {
        return this.http.post(this.httpUrls.logoutUserUrl, { username }, { headers: { author: this.sessionData.userToken, device: this.sessionData.userDevice } }).pipe();
    }

}
