import { Component } from '@angular/core';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent {
  user:any;curency:any;
  constructor(private orgnigation:OrgnigationService) { 
    var curnc = localStorage.getItem("maincurency");
    if(curnc!=null){this.curency = JSON.parse(curnc);}
    var use = localStorage.getItem("user");
    var pending = localStorage.getItem("pending");
    if(use !=null){
      this.user = JSON.parse(use);
      if(pending!=null){ this.treds = JSON.parse(pending);}
      this.tredHistry();
      window.scroll(0,0);
    }
  }

  treds:any=[];loadtred:any=false;notred:String = "";
  tredHistry(){
    this.treds = [];this.loadtred=true;this.notred="";
    let resp = this.orgnigation.tredHistryAll(this.user.id);
    resp.subscribe(
      (Response:any)=>{
        this.loadtred=false;
        this.treds = Response;
        localStorage.setItem("pending",JSON.stringify(this.treds));
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

  cancelOrder(pos:any){
    /* if(confirm("Are you sure you want to cancel this order?")){
      
      var pendTrad = this.treds[pos];
      if(pendTrad.type == "Buy"){
        var updatedUsdt = JSON.parse(this.usdtData);
        updatedUsdt.wallet = Number(updatedUsdt.wallet) + Number(pendTrad.usdt);
        this.orgnigation.saveOpenWallet(updatedUsdt).subscribe();
      }
      else{
        var updatedCurency = JSON.parse(this.curencyData);
        updatedCurency.wallet = Number(updatedCurency.wallet) + (pendTrad.amount*1);
        this.orgnigation.saveOpenWallet(updatedCurency).subscribe();
      }

      var order = this.treds[pos];
      order.status = "Canceled";
      this.treds = [];this.loadtred=true;this.notred="";
      this.orgnigation.saveTredHistry(order).subscribe(
        responce=>{
          this.tredHistry();
        }
      );
    } */
  }
}
