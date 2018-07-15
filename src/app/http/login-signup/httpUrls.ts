import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HttpUrls {

    addNewUserUrl ='http://obscure-sea-69570.herokuapp.com/addNewUser';
    validateLoginUrl ='http://obscure-sea-69570.herokuapp.com/validateUserLogin'

}
