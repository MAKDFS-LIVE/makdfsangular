import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-p2p-trading',
  templateUrl: './p2p-trading.component.html',
  styleUrls: ['./p2p-trading.component.css']
})
export class P2pTradingComponent {
  @ViewChild('listed') listed: ElementRef|any;
  mak:any=83.27;
  account:any=[];wall:any;openmak:any;openMakAmount:any=0;convert:any=false;convAmount:any="";
  usdAmnt:any="";user:any;curency:any;loading2:any=false;
  loading:any = false;loging:any=false;nodata:String="";
  constructor(private orgnigation:OrgnigationService) { 
    var use = localStorage.getItem("user");
    if(use!=null){
      this.user = JSON.parse(use);
      this.user.openWallet =0;
    }
    var curnc = localStorage.getItem("maincurency");
    if(curnc!=null){this.curency = JSON.parse(curnc);}

    this.mak = Number(localStorage.getItem("inr"))+0.40;

    this.fetchListed();
    this.fetchData();
    this.fetchWallet();
    //this.fetchINR();
  }
  
  /* fetchINR(){
    let resp = this.orgnigation.getCurrencyExchange(3,'INR');
    resp.subscribe(
      (Response:any)=>{
        this.mak = Number(Response) + 0.40;
      });
  } */
  sellar:any=[];
  fetchWallet(){
    this.orgnigation.walletCurencyPayment(this.user.id,"USDT").subscribe(
      (Response:any)=>{
        this.wall = Response;
        this.user.openWallet = Number(this.wall.wallet);
        this.loading2 = false;
      });

    this.orgnigation.walletCurencyPayment(this.user.id,"MAK").subscribe(
      (Response:any)=>{
        this.openmak = Response;
        this.openMakAmount = Number(this.openmak.wallet);
        this.loading2 = false;
      });
  }

  fetchListed(){
    this.sellar=[];this.loging=true;this.nodata="";
    let resp = this.orgnigation.getSelfPayment(this.user.id);
    resp.subscribe(
      (Response:any)=>{this.sellar=Response;this.nodata="";this.loging=false;},
      error=>{this.nodata="No any account present at this time.";this.sellar=[];this.loging=false;})
  }

  fetchData(){
    this.account=[];
    let resp = this.orgnigation.getAccountById(this.user.id);
    resp.subscribe(Response=>{this.account=Response;})
  }
  
  filldata:any=new FormGroup({
    amount: new FormControl("",[Validators.required]),
    accountType: new FormControl("",[Validators.required])
  });
  convertdata:any=new FormGroup({
    convAmount: new FormControl("",[Validators.required])
  });
  
  sellAmount(){
    if (this.filldata.invalid) {
      this.filldata.get('amount').markAsTouched();
      this.filldata.get('accountType').markAsTouched();
      var invalidFields:any = [].slice.call(document.getElementsByClassName('ng-invalid'));
      invalidFields[0].focus();
    }
    else{
      if(Number(this.filldata.value.amount)>Number(this.user.openWallet)){
        this.usdAmnt = "";
        this.filldata.value.amount = "";
        this.filldata.get('amount').markAsTouched();
        var invalidFields:any = [].slice.call(document.getElementsByClassName('usdAmnt'));
        invalidFields[0].focus();
        alert("You can't enter amount more than your open wallet.");
      }
      else{
        if(this.loading==false){
          this.loading = true;
          var data = this.filldata.value.accountType;
          var details = {userid:this.user.id,accountid:data.split(",")[0],paymentType:data.split(",")[1],quantity:this.filldata.value.amount,selled:"0",completation:"0",status:"Active"};
          
          this.wall.wallet = Number(this.wall.wallet) - Number(this.filldata.value.amount);
          this.orgnigation.saveOpenWallet(this.wall).subscribe();
          this.orgnigation.savePayment(details).subscribe(
            Response=>{
              this.loading = false;this.nodata=""
              this.sellar.push(Response);
              this.listed.nativeElement.click();
            }
          );
        }
      }
    }
  }

  convertNow(){
    if (this.convertdata.invalid) {
      this.convertdata.get('convAmount').markAsTouched();
      var invalidFields:any = [].slice.call(document.getElementsByClassName('ng-invalid'));
      invalidFields[0].focus();
    }
    else{
      if(Number(this.convAmount) > Number(this.openMakAmount)){
        alert("You can't enter amount more than your wallet.");
      }
      else{
        if(!this.loading2){
          this.loading2 = true;
          var usdtamnt = (this.convAmount * this.curency[0].current_price);

          var newUsdt:any;
          if(this.wall!=null){
            newUsdt = this.wall;
            newUsdt.wallet = Number(newUsdt.wallet) + usdtamnt;
          }
          else{
            newUsdt = {userid:this.user.id,icon:"https://s2.coinmarketcap.com/static/img/coins/64x64/825.png", name:"Tether",curency:"USDT", wallet:usdtamnt,usdamnt:usdtamnt};
          }
          this.openmak.wallet = Number(this.openmak.wallet) - this.convAmount;
          this.convAmount = "";
          this.orgnigation.saveOpenWallet(this.openmak).subscribe();
          this.orgnigation.saveOpenWallet(newUsdt).subscribe(
            Response=>{
              this.fetchWallet();
            }
          );
        }
      }
    }
  }
}
