import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;

  constructor(private loc:Location, private router:Router, private routerSer:RouterService){
    router.events.subscribe((val) => {
      if (loc.path().indexOf('listview') > -1){
        this.isNoteView = false;
      }
    })
  }

  switchView(){
    if (this.isNoteView) {
      this.routerSer.routeToListView();
      this.isNoteView = false;
    } else {
      this.routerSer.routeToNoteView();
      this.isNoteView = true;
    }
  }
}
