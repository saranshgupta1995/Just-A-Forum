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

    constructor(private http: HttpClient, private httpUrls: HttpUrls, private sessionData: SessionDataService) { }
    
    fetchUserProfile(user: any) {
        return this.http.post(this.httpUrls.fetchProfileDataUrl, user, { headers: { author: this.sessionData.userToken } }).pipe(catchError(this.sessionData.handleError));
    }

    fetchUserLevelData(user: any) {
        return this.http.post(this.httpUrls.fetchUserLevelDataUrl, user, { headers: { author: this.sessionData.userToken } }).pipe(catchError(this.sessionData.handleError));
    }

    addQuestion(question: any) {
        return this.http.post(this.httpUrls.addQuestionUrl, question, { headers: { author: this.sessionData.userToken } }).pipe(catchError(this.sessionData.handleError));
    }

    addWorth(data: any) {
        return this.http.post(this.httpUrls.updateWorthUrl, data, { headers: { author: this.sessionData.userToken } }).pipe(catchError(this.sessionData.handleError));
    }

    fetchUserQuestions() {
        return this.http.post(this.httpUrls.fetchUserQuestionsUrl, { userId: this.sessionData.userData['userId'] }, { headers: { author: this.sessionData.userToken } }).pipe(catchError(this.sessionData.handleError));
    }

    updateCatchPhrase(data) {
        return this.http.post(this.httpUrls.updateCatchPhraseUrl, data, { headers: { author: this.sessionData.userToken } }).pipe(catchError(this.sessionData.handleError));
    }
}
