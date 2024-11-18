import { Component } from '@angular/core';

@Component({
  selector: 'app-qr-profile',
  templateUrl: './qr-profile.component.html',
  styleUrls: ['./qr-profile.component.css']
})
export class QrProfileComponent {
  user:any;
  constructor() {
    var us = localStorage.getItem("user");
    if(us!=null){this.user = JSON.parse(us);}
  }

}
