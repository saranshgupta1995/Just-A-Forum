import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SessionDataService {

    constructor() { }

    userData: any = {};
    userTasks: any = {};

    level_eqs = {
        zero: 0,
        one: 1,
        two: 2,
        three: 3,
        four: 4,
    };

    privileges = {
        profileImageAccess: false,
        catchPhraseAccess: false
    }

    decideUserPrivileges() {
        if (this.userData['exp_level'])
        {
            this.privileges.profileImageAccess = this.level_eqs[this.userData['exp_level']] > 2;
            this.privileges.catchPhraseAccess = this.level_eqs[this.userData['exp_level']] != 0;
        }
    }


}
