import { Component, OnInit } from '@angular/core';
import { transition, animate, state, style, trigger } from '@angular/animations';

@Component({
    selector: 'sexy-navbar',
    templateUrl: './sexy-navbar.component.html',
    styleUrls: ['./sexy-navbar.component.css'],
    animations: [
        trigger('shrinker', [
            state('inactive', style({ height: 0 })),
            state('active', style({ height: '*' })),
            // state('active', style({
            //     backgroundColor: '#cfd8dc',
            //     transform: 'scale(1.1)'
            // })),
            transition('active => inactive', [
                style({ height: '*' }),
                animate(100, style({ height: 0 }),)]),
            transition('inactive => active', [
                style({ height: 0 }),
                animate(100, style({ height: '*' }),)])
        ])
    ]
})
export class SexyNavbarComponent implements OnInit {

    name='login';
    state='active'
    loginFormView=false;
    constructor() { }

    ngOnInit() {
    }

    toggleState() {
        this.state = this.state === 'active' ? 'inactive' : 'active';
        let that=this
        setTimeout(()=>{
            that.loginFormView = !that.loginFormView;
        },100)
    }

}
