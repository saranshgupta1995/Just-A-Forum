import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HttpUrls } from '../httpUrls';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionDataService } from '../../session-data.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

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
    fetchUserProfile(user: any) {
        return this.http.post(this.httpUrls.fetchProfileDataUrl, user, { headers: { author: this.sessionData.userToken } }).pipe(catchError(this.handleError));
    }

    fetchUserLevelData(user: any) {
        return this.http.post(this.httpUrls.fetchUserLevelDataUrl, user, { headers: { author: this.sessionData.userToken } }).pipe(catchError(this.handleError));
    }

    addQuestion(question: any) {
        return this.http.post(this.httpUrls.addQuestionUrl, question, { headers: { author: this.sessionData.userToken } }).pipe(catchError(this.handleError));
    }

    addWorth(data: any) {
        return this.http.post(this.httpUrls.updateWorthUrl, data, { headers: { author: this.sessionData.userToken } }).pipe(catchError(this.handleError));
    }

    fetchUserQuestions() {
        return this.http.post(this.httpUrls.fetchUserQuestionsUrl, {userId:this.sessionData.userData['userId']}, { headers: { author: this.sessionData.userToken } }).pipe(catchError(this.handleError));
    }

    updateCatchPhrase(data) {
        return this.http.post(this.httpUrls.updateCatchPhraseUrl, data, { headers: { author: this.sessionData.userToken } }).pipe(catchError(this.handleError));
    }
}
