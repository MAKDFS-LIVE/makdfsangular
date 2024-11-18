import { Component } from '@angular/core';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-my-funds',
  templateUrl: './my-funds.component.html',
  styleUrls: ['./my-funds.component.css']
})
export class MyFundsComponent {
  user:any;openWallet:any=0;inr:any=83.27;
  curency:any=[];totalWallet:any=0;loging:any=true;
  constructor(public orgnigation:OrgnigationService) { 
    this.user = localStorage.getItem("user");
    var curnc = localStorage.getItem("maincurency");
    this.inr = Number(localStorage.getItem("inr"));
    if(curnc!=null){this.curency = JSON.parse(curnc);}
    if(this.user !=null){
      this.user = JSON.parse(this.user);
      this.fetchOpenWallet();
      var myfund = localStorage.getItem("myfund");
      if(myfund!=null){
        this.updateCurencyValue(JSON.parse(myfund));
      }
    }
  }

  fetchOpenWallet(){
    let resp = this.orgnigation.walletPayment(this.user.id);
    resp.subscribe(
      (Response:any)=>{
        this.loging = false;
        localStorage.setItem("myfund",JSON.stringify(Response));
        this.updateCurencyValue(Response);
      },
      error=>{
        this.loging = false;
        this.updateCurencyValue([]);
      });
  }
  
  updateCurencyValue(curencyList:any){
    this.openWallet = 0;
    for(var i=0;i<curencyList.length;i++){
      const index = this.curency.findIndex((x:any) => x.symbol.toLowerCase() === curencyList[i].curency.toLowerCase());
      curencyList[i].value = (curencyList[i].wallet * this.curency[index].current_price);
      curencyList[i].price = this.curency[index].current_price;
      this.openWallet+= curencyList[i].value;
    }
    this.user.openWallet = this.openWallet;
    this.updateWallet();
  }

  slidesStore:any=[
    {img:"bg-7",link:"cancer-medicine",name:"Open",name2:"Wallet",wallet:"0.00",url:"/wallet/open",discount:"27"},
    {img:"bg-5",link:"cancer-medicine",name:"Investment",name2:"Wallet",wallet:"0.00",url:"/wallet/locked",discount:"27"},
    {img:"bg-5",link:"cancer-medicine",name:"Loan",name2:"Wallet",wallet:"0.00",url:"/wallet/loan",discount:"27"},
    {img:"bg-5",link:"cancer-medicine",name:"Referral",name2:"Wallet",wallet:"0.00",url:"/wallet/referral",discount:"27"},
    {img:"bg-5",link:"cancer-medicine",name:"Pending",name2:"Wallet",wallet:"0.00",url:"/wallet/pending",discount:"27"}
  ];

  updateWallet(){
    var refw = (Number(this.user.refferWallet));
    //var refw = (Number(this.user.refferWallet)/this.inr);
    /* if(refw<200){refw = 200;}
    refw = (refw/this.inr); */
    for(var i=0;i<5;i++){
      if(i==0){this.slidesStore[i].wallet = Number(this.user.openWallet).toFixed(3)}
      if(i==1){this.slidesStore[i].wallet = Number(this.user.lockedWallet).toFixed(3)}
      if(i==2){this.slidesStore[i].wallet = Number(this.user.loanWallet).toFixed(3)}
      if(i==3){this.slidesStore[i].wallet = refw.toFixed(3)}
      if(i==4){this.slidesStore[i].wallet = Number(this.user.pendingWallet).toFixed(3)}
    }
    this.totalWallet = Number(this.slidesStore[0].wallet) + Number(this.slidesStore[1].wallet) + Number(this.slidesStore[2].wallet) + refw + Number(this.slidesStore[4].wallet);
    this.loging =false;
  }
}
