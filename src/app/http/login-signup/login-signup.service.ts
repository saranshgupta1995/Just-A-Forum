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

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };


    addnewuser(user: any) {
        return this.http.post(this.httpUrls.addNewUserUrl, user).pipe(catchError(this.handleError));
    }

    validateLoginAttempt(user: any) {
        return this.http.post(this.httpUrls.validateLoginUrl, user).pipe(catchError(this.handleError));
    }

    validateToken(data={token:'my_uniq_token'}) {
        return this.http.post(this.httpUrls.validateTokenUrl, data, { headers: { author: this.sessionData.userToken, device:this.sessionData.userDevice } }).pipe(catchError(this.handleError));
    }

    validateUserName(username: any) {
        return this.http.post(this.httpUrls.validateUsernameUrl, username).pipe(catchError(this.handleError));
    }

    logoutUser(username: any) {
        return this.http.post(this.httpUrls.logoutUserUrl, {username}, { headers: { author: this.sessionData.userToken, device: this.sessionData.userDevice } }).pipe(catchError(this.handleError));
    }

}
