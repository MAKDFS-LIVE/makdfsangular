import { Component } from '@angular/core';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent {
  myCurency:any;
  constructor() { 
    var res = localStorage.getItem("maincurency");
    if(res!=null){this.myCurency = JSON.parse(res)}
    window.scrollTo(0, 0);
  }
  
  ptptrad(){
    localStorage.setItem("curency",JSON.stringify(this.myCurency[0]));
  }
}
