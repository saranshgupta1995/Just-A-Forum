import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HttpUrls {

    addNewUserUrl ='http://localhost:3000/addNewUser';
    validateLoginUrl ='http://localhost:3000/validateUserLogin'

}
