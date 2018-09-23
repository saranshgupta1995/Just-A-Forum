import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HttpUrls } from '../httpUrls';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionDataService } from '../../session-data.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

    constructor(private http: HttpClient, private httpUrls: HttpUrls, private sessionData:SessionDataService) { }
    
    addQuestion(ques: any) {
        return this.http.post(this.httpUrls.addQuestionUrl, ques, { headers: { author: this.sessionData.userToken } }).pipe();
    }

    fetchQuestionData(data: any) {
        return this.http.post(this.httpUrls.fetchQuestionDataUrl, data, { headers: { author: this.sessionData.userToken } }).pipe();
    }

    fetchLatestQuestions() {
        return this.http.post(this.httpUrls.fetchLatestQuestionsUrl, { hhhjsydisk: 'jhyut' }, { headers: { author: this.sessionData.userToken } }).pipe();
    }

    fetchQuestionTags(data: any) {
        return this.http.post(this.httpUrls.fetchQuestionTags, data, { headers: { author: this.sessionData.userToken } }).pipe();
    }

    fetchAllTags() {
        return this.http.post(this.httpUrls.fetchAllTags, {}, { headers: { author: this.sessionData.userToken } }).pipe();
    }
}
