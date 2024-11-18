import { Component } from '@angular/core';

@Component({
  selector: 'app-not-available',
  templateUrl: './not-available.component.html',
  styleUrls: ['./not-available.component.css']
})
export class NotAvailableComponent {
  allCurency:any;
  constructor() { 
    var curnc = localStorage.getItem("maincurency");
    if(curnc!=null){
      this.allCurency = JSON.parse(curnc);
    }

  }

  crypto(pos:any){
    localStorage.setItem("curency",JSON.stringify(this.allCurency[pos]));
  }
}
