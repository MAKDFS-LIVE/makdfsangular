import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  intrest:any;weeks:any=0;
  constructor() { 
    var curnc = localStorage.getItem("loaddeatails");
    if(curnc!=null){
      this.intrest = JSON.parse(curnc);
    }
  }

}
