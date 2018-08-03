import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TaskRoutes {

    // Task Level 0
    'Answer your first question' = ['question','What are you like?'];
}
