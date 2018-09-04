import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TaskRoutes {

    // Task Level 0
    'Answer your first question' = ['question','What are you like?'];

    // Task level 1
    'Be a total worth of 300'=[''];
    
    // Task Level 2
    'Be a total worth of 800'=[''];
    'Ask 2 new valued questions'=[''];
}
