import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoTextComponent } from '../info-text/info-text.component';
import { max } from '../../../../node_modules/rxjs/operators';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

    @ViewChild('loaderText') loadertext: InfoTextComponent;

    constructor() { }

    timer = 0;
    throwBacks = ['Requesting Data from the server', 'Server says Hi', "It's not you, it's us", 'Slow Internet Mate??', "Oh well..", "Requesting Data from the server"];

    ngOnInit() {
        setInterval(() => {
            this.loadertext.showInfo(navigator.onLine ? this.throwBacks[this.timer] : 'Seems like this is the end of the Internet.');
            this.timer = Math.min(this.timer + (Math.random() > 0.85 ? 1 : 0), 5);
        }, 500);
    }

}
