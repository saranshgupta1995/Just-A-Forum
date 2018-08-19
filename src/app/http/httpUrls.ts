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
    validateTokenUrl = `${environment.serverUrl}/validatetoken`;
    logoutUserUrl = `${environment.serverUrl}/logoutuser`;
    
    // profile urls
    fetchProfileDataUrl = `${environment.serverUrl}/getprofile`;
    fetchUserLevelDataUrl = `${environment.serverUrl}/findUserLevelData`;
    updateWorthUrl = `${environment.serverUrl}/addWorth`;

    //question urls
    addQuestionUrl = `${environment.serverUrl}/addquestion`;
    fetchQuestionDataUrl = `${environment.serverUrl}/fetchquestiondata`;
    fetchQuestionTags = `${environment.serverUrl}/fetchquestiontags`;
    
    //comment urls
    addCommentUrl = `${environment.serverUrl}/addcomment`;
    fetchQuestionCommentsUrl = `${environment.serverUrl}/fetchquestioncomments`;
}
