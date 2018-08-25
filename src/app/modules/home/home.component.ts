import { Component, OnInit } from '@angular/core';
import { SessionDataService } from '../../session-data.service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    username='';

  constructor(public sessionData:SessionDataService) {
   }

  ngOnInit() {
  }

}
