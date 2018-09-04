import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SessionDataService {
    userExpLevel: any;

    constructor() { }

    fromRegularlogin=true;
    userData: any = {};
    userTasks: any = {};
    userToken:string='';
    userDevice:string='';
    userName:string='';

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
        this.userTasks = {};
        this.userToken = '';
        this.userDevice='';
        this.userName = '';

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


}
