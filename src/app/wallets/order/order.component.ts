import { Component } from '@angular/core';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  ex2:any=true;ex3:any=false;

  user:any;curency:any;
  constructor(public orgnigation:OrgnigationService) { 
    var curnc = localStorage.getItem("maincurency");
    if(curnc!=null){this.curency = JSON.parse(curnc);}
    var use = localStorage.getItem("user");
    var pending = localStorage.getItem("pending");
    if(use !=null){
      this.user = JSON.parse(use);
      if(pending!=null){ 
        this.tradList = JSON.parse(pending);
        this.openOrder();
      }
      this.tredHistry();
      window.scroll(0,0);
    }
  }

  tradList:any=[];
  treds:any=[];loadtred:any=false;notred:String = "";
  tredHistry(){
    var pending = localStorage.getItem("pending");
    if(pending==null){this.treds=[];this.tradList=[];this.loadtred=true;this.notred="";}    
    let resp = this.orgnigation.tredAllHistry(this.user.id);
    resp.subscribe(
      (Response:any)=>{
        this.treds=[];
        this.loadtred=false;
        this.tradList = Response;
        localStorage.setItem("pending",JSON.stringify(this.tradList));
        this.openOrder();
      },
      error=>{
        this.loadtred=false;
        this.notred="No data"
      });
  }
  
  openCurency(pos:any){
    var symble = this.treds[pos].symble;
    var sCurency;
    for(var i=0;i<this.curency.length;i++){
      const index = this.curency.findIndex((x:any) => x.symbol.toLowerCase() === symble.toLowerCase());
      sCurency = this.curency[index];
      break;
    }
    localStorage.setItem("curency",JSON.stringify(sCurency));
  }

  openOrder(){
    this.ex2=true;this.ex3=false;this.treds=[];
    for(var i=0;i<this.tradList.length;i++){
      if(this.tradList[i].status=="Pending"){
        this.treds.push(this.tradList[i]);
      }
    }
    if(this.treds.length==0){this.notred="No data"}else{this.notred="";}
  }
  pastOrder(){
    this.ex2=false;this.ex3=true;this.treds=[];
    for(var i=0;i<this.tradList.length;i++){
      if(this.tradList[i].status!="Pending"){
        this.treds.push(this.tradList[i]);
      }
    }
    if(this.treds.length==0){this.notred="No data"}else{this.notred="";}
  }
}
