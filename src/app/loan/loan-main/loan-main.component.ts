import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-loan-main',
  templateUrl: './loan-main.component.html',
  styleUrls: ['./loan-main.component.css']
})
export class LoanMainComponent {
  user:any;transaction:any=[];loging:any="";nodata:any="";curency:any;
  openWallet:any=0;
  constructor(private orgnigation:OrgnigationService,private router: Router) { 
    var use = localStorage.getItem("user");
    var curnc = localStorage.getItem("maincurency");
    if(curnc!=null){this.curency = JSON.parse(curnc);}

    window.scrollTo(0, 0);
    if(use !=null){
      this.user = JSON.parse(use);

      var open = localStorage.getItem("openwallet");
      if(open!=null){
        this.transaction = JSON.parse(open);
        this.updateCurencyValue(this.transaction);
      }
      this.fetchListed();
    }

  }

  fetchListed(){
    if(this.transaction.length==0){this.loging=true;this.transaction=[];}
    this.nodata="";
    let resp = this.orgnigation.walletPayment(this.user.id);
    resp.subscribe(
      (Response:any)=>{
        this.transaction=Response;this.nodata="";this.loging=false;
        this.updateCurencyValue(this.transaction);
      },
      error=>{this.nodata = "No coin available.";this.loging=false;});
  }

  updateCurencyValue(curencyList:any){
    this.openWallet = 0;
    for(var i=0;i<curencyList.length;i++){
      const index = this.curency.findIndex((x:any) => x.symbol.toLowerCase() === curencyList[i].curency.toLowerCase());
      curencyList[i].value = (curencyList[i].wallet * this.curency[index].current_price);
      curencyList[i].price = this.curency[index].current_price;
      curencyList[i].selected = true;
      this.openWallet+= curencyList[i].value;
    }
  }
  
  loan(pos:any){
    if(Number(this.transaction[pos].wallet)>0){
      localStorage.setItem("loanCurency",JSON.stringify(this.transaction[pos]));
      this.router.navigate(['/loan/home']);
    }
  }

  messgage:any="";
  procide(){
    if(this.openWallet>=100){
      var curency:any=[];
      for(var i=0;i<this.transaction.length;i++){
        if(this.transaction[i].selected){
          curency.push(this.transaction[i]);
        }
      }
      localStorage.setItem("loanCurency",JSON.stringify(curency));
      this.router.navigate(['/loan/home']);
    }
    else{
      this.messgage = "We offer loans starting from $100, but unfortunately, your open wallet does not have a sufficient balance.";
    }
  }

  checked(pos:any){
    if(this.transaction[pos].selected){this.transaction[pos].selected=false;}
    else{this.transaction[pos].selected=true;}
    this.openWallet = 0;this.messgage = "";
    for(var i=0;i<this.transaction.length;i++){
      if(this.transaction[i].selected){
        this.openWallet+= this.transaction[i].value;
      }
    }
  }
}
