import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SessionDataService {
    userExpLevel: any;

    constructor() { }

    fromRegularlogin=true;
    userData: any = {};
    levelData: any = {};
    userToken:string='';
    userDevice:string='';
    username:string='';

    level_eqs = {
        zero: 0,
        one: 1,
        two: 2,
        three: 3,
        four: 4
    };

    level_weight = {
        zero: 1,
        one: 1.5,
        two: 3,
        three: 5,
        four: 8
    };

    privileges = {
        profileImageAccess: false,
        catchPhraseAccess: false
    }

    decideUserPrivileges() {
        if (this.userData['exp_level']) {
            this.userExpLevel = this.level_eqs[this.userData['exp_level']];
            this.privileges.profileImageAccess = this.userExpLevel > 2;
            this.privileges.catchPhraseAccess = this.userExpLevel != 0;
        }
    }

    levelTasks={
        zero: ['Answer your first question'],
        one:['Be a total worth of 300'],
        two:['Be a total worth of 800','Ask 2 new valued questions'],
    }

    reset(){

        this.fromRegularlogin = true;
        this.userData = {};
        this.levelData = {};
        this.userToken = '';
        this.userDevice='';
        this.username = '';

        this.level_eqs = {
            zero: 0,
            one: 1,
            two: 2,
            three: 3,
            four: 4
        };

        this.level_weight = {
            zero: 1,
            one: 1.5,
            two: 3,
            three: 5,
            four: 8
        };

        this.privileges = {
            profileImageAccess: false,
            catchPhraseAccess: false
        }
    }

    handleError(error: HttpErrorResponse) {
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




}
