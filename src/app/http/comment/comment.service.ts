import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { HttpUrls } from '../httpUrls';
import { catchError } from 'rxjs/operators';
import { SessionDataService } from '../../session-data.service';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient, private httpUrls: HttpUrls, private sessionData: SessionDataService) { }
    
    addComment(data: any) {
        return this.http.post(this.httpUrls.addCommentUrl, data, { headers: { author: this.sessionData.userToken } }).pipe(catchError(this.sessionData.handleError));
    }

    fetchQuestionComments(data: any) {
        return this.http.post(this.httpUrls.fetchQuestionCommentsUrl, data, { headers: { author: this.sessionData.userToken } }).pipe(catchError(this.sessionData.handleError));
    }
}
