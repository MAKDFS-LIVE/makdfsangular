import { Component } from '@angular/core';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-final-conformation',
  templateUrl: './final-conformation.component.html',
  styleUrls: ['./final-conformation.component.css']
})
export class FinalConformationComponent {
  user:any;
  constructor(private orgnigation:OrgnigationService) {
    var use = localStorage.getItem("user");
    if(use !=null){this.user = JSON.parse(use);}
  }


  
  disp:any=false;query:any="";
  createDiput(){
    this.disp =false;
    if(this.query.length>0){
      alert("We have successfully received your dispute, Our Team will investigate on it and resolve this issue soon.");
    }
  }
}
