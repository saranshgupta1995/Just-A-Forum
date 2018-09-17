import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'dsclz-big-fat-text',
    templateUrl: './big-fat-text.component.html',
    styleUrls: ['./big-fat-text.component.css']
})
export class BigFatTextComponent implements OnInit {

    @Input() fontSize=12;

    constructor() { }

    ngOnInit() {
        document.getElementsByTagName('h1')[0].style.fontSize=this.fontSize+'em';
    }

}
