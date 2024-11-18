import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.css']
})
export class OpenComponent {
  user:any;transaction:any=[];loging:any="";nodata:any="";curency:any;openWallet:any=0;
  constructor(public orgnigation:OrgnigationService,private router: Router) { 
    var use = localStorage.getItem("user");
    if(use !=null){
      this.user = JSON.parse(use);
    }
    var curnc = localStorage.getItem("maincurency");
    if(curnc!=null){this.curency = JSON.parse(curnc);}
    this.fetchListed();
    window.scrollTo(0, 0);
    var open = localStorage.getItem("openwallet");
    if(open!=null){
      this.transaction = JSON.parse(open);
      this.updateCurencyValue(this.transaction);
    }
  }

  fetchListed(){
    this.transaction=[];this.loging=false;this.nodata="";
    let resp = this.orgnigation.walletPayment(this.user.id);
    resp.subscribe(
      (Response:any)=>{
        this.transaction=Response;this.nodata="";this.loging=false;
        localStorage.setItem("openwallet",JSON.stringify(this.transaction));
        this.updateCurencyValue(this.transaction);
      },
      error=>{this.transaction = this.baseWallet;this.loging=false;});
  }

  baseWallet:any=[
    {icon:"https://m.makdfs.com/assets/images/99999.png", name:"MAKDFS",	curency:"MAK", wallet:"0",value:0},
    {icon:"https://s2.coinmarketcap.com/static/img/coins/64x64/1.png", name:"Bitcoin",	curency:"BTC", wallet:"0",value:0},
    {icon:"https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png", name:"Ethereum",	curency:"ETH", wallet:"0",value:0},
    {icon:"https://s2.coinmarketcap.com/static/img/coins/64x64/825.png", name:"Tether",	curency:"USDT", wallet:"0",value:0},
    {icon:"https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png", name:"BNB",	curency:"BNB", wallet:"0",value:0},
    {icon:"https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png", name:"USD Coin",	curency:"USDC", wallet:"0",value:0},
    {icon:"https://s2.coinmarketcap.com/static/img/coins/64x64/52.png", name:"XRP",	curency:"XRP", wallet:"0",value:0},
    {icon:"https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png", name:"Cardano",	curency:"ADA", wallet:"0",value:0}
  ]
  updateCurencyValue(curencyList:any){
    this.openWallet = 0;
    for(var i=0;i<curencyList.length;i++){
      const index = this.curency.findIndex((x:any) => x.symbol.toLowerCase() === curencyList[i].curency.toLowerCase());
      curencyList[i].value = (curencyList[i].wallet * this.curency[index].current_price);
      curencyList[i].price = this.curency[index].current_price;
      this.openWallet+= curencyList[i].value;
    }
  }

  loan(pos:any){
    if(Number(this.transaction[pos].wallet)>0){
      localStorage.setItem("loanCurency",JSON.stringify(this.transaction[pos]));
      if(this.transaction[pos].curency=="MAK"){
        this.router.navigate(['/investment/home']);
      }
      else{
        const index = this.curency.findIndex((x:any) => x.symbol.toLowerCase() === this.transaction[pos].curency.toLowerCase());
        localStorage.setItem("curency",JSON.stringify(this.curency[index]));
        this.router.navigate(['/buy/crypto']);
      }
    }
  }
  
  ptptrad(){
    localStorage.setItem("curency",JSON.stringify(this.curency[3]));
  }
}
