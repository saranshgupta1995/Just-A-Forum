import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpUrls {

    // login-signups urls
    addNewUserUrl =`${environment.serverUrl}/addNewUser`;
    validateLoginUrl = `${environment.serverUrl}/validateUserLogin`;
    validateUsernameUrl = `${environment.serverUrl}/validateUsername`;
    
    // profile urls
    fetchProfileDataUrl = `${environment.serverUrl}/getprofile`;
    fetchUserLevelDataUrl = `${environment.serverUrl}/findUserLevelData`;

    //question urls
    addQuestionUrl = `${environment.serverUrl}/addquestion`;
    fetchQuestionDataUrl = `${environment.serverUrl}/fetchquestiondata`;
    
    //comment urls
    addCommentUrl = `${environment.serverUrl}/addcomment`;
    fetchQuestionCommentsUrl = `${environment.serverUrl}/fetchquestioncomments`;
}
