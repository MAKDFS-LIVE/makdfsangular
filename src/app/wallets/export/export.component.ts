import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent {
  user:any;usdtData:any;usdtWallet:any;waletLoading:any=true;wltAmnt:any=false;
  constructor(private orgnigation:OrgnigationService,private router: Router) { 
    var use = localStorage.getItem("user");
    if(use !=null){
      this.user = JSON.parse(use);
    }
    this.fetchUsdt();
    window.scrollTo(0, 0);
  }

  exchange:any=[
    {name:"Binance",url:"https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png"},
    {name:"WazirX",url:"https://assets.coingecko.com/markets/images/274/small/wazirx.jpg"},
    {name:"Bybit",url:"https://assets.coingecko.com/markets/images/698/small/bybit_spot.png"},
    {name:"KuCoin",url:"https://assets.coingecko.com/markets/images/61/small/kucoin.png"},
    {name:"OKX",url:"https://assets.coingecko.com/markets/images/96/small/WeChat_Image_20220117220452.png"},
    {name:"HTX",url:"https://assets.coingecko.com/markets/images/25/small/logo_V_colour_black.png"},
    {name:"Bitget",url:"https://assets.coingecko.com/markets/images/540/small/2023-07-25_21.47.43.jpg"},
    {name:"WOO X",url:"https://assets.coingecko.com/markets/images/683/small/woo.png"},
    {name:"Gemini",url:"https://assets.coingecko.com/markets/images/50/small/gemini.png"},
    {name:"BingX",url:"https://assets.coingecko.com/markets/images/812/small/YtFwQwJr_400x400.jpg"},
    {name:"BitMart",url:"https://assets.coingecko.com/markets/images/239/small/Bitmart.png"},
    {name:"CoinW",url:"https://assets.coingecko.com/markets/images/1172/small/coinw.jpeg"},
    {name:"QMall",url:"https://assets.coingecko.com/markets/images/1108/small/qmall.jpeg"},
    {name:"Phemex",url:"https://assets.coingecko.com/markets/images/564/small/phemex_logo.png"},
    {name:"Bitso",url:"https://assets.coingecko.com/markets/images/8/small/Bitso-icon-dark.png"},
    {name:"Indodax",url:"https://assets.coingecko.com/markets/images/3/small/logogram-Indodax-new-_JPG_format.jpg"}
  ]
  
  fetchUsdt(){
    let resp = this.orgnigation.walletCurencyPayment(this.user.id,"USDT");
    resp.subscribe(
      (Response:any)=>{
        this.waletLoading =false;
        this.usdtData = JSON.stringify(Response);
        this.usdtWallet = Number(Response.wallet);
      },
      error=>{
        this.waletLoading =false;
      });
  }


  exchangeShow:any=true;walletShow:any=false;addWalletShow:any=false;
  exchangeSelected:any={name:""};
  account:any=[];nodata:string="";loging:any=false;load:any=false;
  loadWallet(pos:any){
    this.exchangeShow =false;
    this.walletShow = true;
    this.exchangeSelected = this.exchange[pos];
    this.fetchData();
  }
  fetchData(){
    this.account=[];this.loging=true;this.nodata="";
    let resp = this.orgnigation.getWalletByExchange(this.user.id,this.exchangeSelected.name);
    resp.subscribe(
      Response=>{this.account=Response;this.nodata="";this.loging=false;},
      error=>{this.nodata="No any wallet present at this time.";this.account=[];this.loging=false;})
  }

  addWallet(){
    this.addWalletShow=true
    this.walletShow = false;
    this.wallet.patchValue({exchange:this.exchangeSelected.name});
  }
  wallet:any=new FormGroup({
    name: new FormControl("",[Validators.required]),
    walletid: new FormControl("",[Validators.required]),
    exchange: new FormControl(""),
    userid: new FormControl("")
  });
  submit(){
    if (this.wallet.invalid) {
      this.wallet.get('name').markAsTouched();
      this.wallet.get('walletid').markAsTouched();
      var invalidFields:any = [].slice.call(document.getElementsByClassName('ng-invalid'));
      invalidFields[1].focus();
    }
    else{
      this.load = true;
      var wlt = this.wallet.value;
      wlt.userid = this.user.id;
      wlt.status = "Pending";

      this.orgnigation.saveOtherWallet(wlt).subscribe(
        (reponce:any)=>{
          this.load = false;
          this.addWalletShow=false;
          this.wltAmnt = true;
          this.paymentDetails = wlt;
        }
      );
    }
  }

  paymentDetails:any;payAmount:any="";
  loadPayment(pos:any){
    this.paymentDetails = this.account[pos];
    this.walletShow=false;
    this.wltAmnt = true;
  }

  suceess:any=false;
  sendMoney(){
    if(this.payAmount=="" || this.payAmount=="0" || this.payAmount==null){
      alert("Please enter amount!");
    }
    else{
      if(this.payAmount<=this.usdtWallet){
        if(this.payAmount>=100){
          if(this.paymentDetails.exchange=="Binance"){
            var transaction = {userid:this.user.id,paymentid:"",sellerid:this.paymentDetails.name,usdamnt:this.payAmount,transferant:this.paymentDetails.walletid,curency:this.paymentDetails.exchange,recipt:"",status:"Pending",remark:"Payment done but waiting for approval.",datetime:formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en'),icon: "", name:"Exchange",buyCurency:"USDT",wallet:""}
            
            var wData = JSON.parse(this.usdtData);
            wData.wallet = Number(wData.wallet) - Number(this.payAmount);
            this.orgnigation.saveOpenWallet(wData).subscribe();
            this.usdtWallet = Number(wData.wallet);
            this.usdtData = JSON.stringify(wData);
  
            var tredhistry = {userid:this.user.id,curency:"Ethereum",symble:"usdt",amount:this.payAmount,usdt:"0",price:"Exported",type:"Sell",status:"Active",datetime:formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en')}
            this.orgnigation.saveTredHistry(tredhistry).subscribe();
    
            this.orgnigation.saveTransaction(transaction).subscribe(
              Response=>{
                this.suceess = true;
                this.wltAmnt = false;
              }
            );
          }
          else{
            alert("Receiver exchange facing high failure: Please try after some time.");
          }
        }
        else{
          alert("The minimum transfer amount is $100.");
        }
      }
      else{
        alert("Please enter below amount from your USDT wallet.");
      }
    }
  }

}
