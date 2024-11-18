import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-loan-home',
  templateUrl: './loan-home.component.html',
  styleUrls: ['./loan-home.component.css']
})
export class LoanHomeComponent {
  user:any;curency:any;usdtAmnt:any="";
  freedPay:any=false;
  account:any={};loading:any=false;makVaue:any=0;
  totalAmount:any = 0;

  constructor(private orgnigation:OrgnigationService,private router: Router) { 
    var use = localStorage.getItem("user");
    var cur = localStorage.getItem("loanCurency");

    if(cur!=null){
      this.curency = JSON.parse(cur);
      for(var i=0;i<this.curency.length;i++){
        this.totalAmount+= this.curency[i].value;
      }
    }
    if(use !=null){this.user = JSON.parse(use);}
    window.scrollTo(0, 0);
  }

  recevedPayment(){
    if(this.usdtAmnt>=100){
      if(this.usdtAmnt<=this.totalAmount){
        this.freedPay =true;
        this.payableusd();
        this.creditable = (this.usdtAmnt - (this.usdtAmnt * (this.intrest.sequrity/100)));
      }
      else{
        alert("Entered amount not available in your wallet.");
      }
    }
    else{
      alert("Minimum loan amount is $100.");
    }
  }
  
  conformLoan(){
    if(!this.loading){
      if(confirm("Are you sure you want to confirm?")){
        this.loading = true;
        this.account.icon = this.curency.icon;
        this.account.curency = this.curency.curency;
        this.account.name = this.curency.name;
        this.account.value = this.curency.usdamnt;
        this.account.userid = this.user.id;
        this.account.status = "Approved";
        this.account.remark = "Your payment has been credited in your MAK account.";
        this.account.datetime = formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en');
        
        this.account.usdtAmnt = this.usdtAmnt;
        this.account.localCurency = (this.usdtAmnt / this.curency.price);
        this.account.creditedUsd = this.creditable;
        this.account.creditedMak = (this.creditable / this.makVaue);
        this.account.recoveryUsd = this.paybleusdt;
        this.account.recoveryMak = (this.paybleusdt / this.makVaue);
        this.account.tenure = this.weeks;

        this.account.interestRate = this.intrest.intrest;
        this.account.processingfee = this.intrest.procesing;
        this.account.sequrity = this.intrest.sequrity;
        this.account.preeningfee = this.intrest.preening;
        this.account.finalInterest = this.weeks* (this.intrest.intrest/48);


        this.orgnigation.saveLoan(this.account).subscribe(
          Response=>{
            var walettran = {userid:this.user.id,icon:"https://m.makdfs.com/assets/images/99999.png", name:"MAKDFS",curency:"MAK", wallet:this.account.creditedMak,datetime:formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en')};
            this.orgnigation.saveWallet(walettran).subscribe();
            //this.orgnigation.saveTransaction(pay).subscribe();

            this.curency.wallet = ((this.usdtAmnt / this.curency.price)*-1);
            this.orgnigation.saveWallet(this.curency).subscribe();
            this.loading = false;
            this.router.navigate(['/wallet/loan']);
          },
          (error:any)=>{
            this.loading = false;
            alert("Technical error!");
          }
        );
      }
    }
  }

  intrest:any={procesing:2,intrest:24,sequrity:40,preening:0}

  weeks:any=1;
  plush(num:any){
    if(this.weeks==1 && num<0){return;}
    this.weeks += num;
    this.payableusd();
  }

  creditable:any=0; paybleusdt:any=0;
  payableusd(){
    var procesingFee = (this.usdtAmnt * (this.intrest.procesing/100));
    var intrest = (this.usdtAmnt * ((this.weeks * (this.intrest.intrest/48))/100));
    this.paybleusdt = this.usdtAmnt + procesingFee + intrest;
  }
  

}
