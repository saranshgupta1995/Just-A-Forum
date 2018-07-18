import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HttpUrls {

    addNewUserUrl =`${environment.serverUrl}/addNewUser`;
    validateLoginUrl = `${environment.serverUrl}/validateUserLogin`;

}
