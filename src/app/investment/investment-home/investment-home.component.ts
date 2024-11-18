import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-investment-home',
  templateUrl: './investment-home.component.html',
  styleUrls: ['./investment-home.component.css']
})
export class InvestmentHomeComponent {
  user:any;curency:any;usdtAmnt:any="";
  loanPreview:any=false;
  loading:any=false;account:any={};
  constructor(private orgnigation:OrgnigationService,private router: Router) { 
    var use = localStorage.getItem("user");
    var cur = localStorage.getItem("loanCurency");
    if(use !=null){this.user = JSON.parse(use);}
    if(cur!=null){this.curency = JSON.parse(cur);}
    else{this.router.navigate(['/']);}
    window.scrollTo(0, 0);
  }


  investPayment(){
    if(this.usdtAmnt>0){
      if(this.usdtAmnt<= (this.curency.value*1)){
        if(confirm("Are you sure you want to invest?")){
          if(!this.loading){
            this.loading = true;
            this.account.usdtAmnt = this.usdtAmnt;
            this.account.makAmnt = (this.usdtAmnt / this.curency.price);
            this.account.icon = this.curency.icon;
            this.account.curency = this.curency.curency;
            this.account.name = this.curency.name;
            this.account.value = this.curency.value;
            this.account.userid = this.user.id;
            this.account.status = "Active";
            this.account.remark = "Investment successful!";
            this.account.datetime = formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en');
            
            this.orgnigation.saveInvestment(this.account).subscribe(
              Response=>{
                this.loading = false;
                this.router.navigate(['/wallet/locked']);
              },
              (error:any)=>{
                this.loading = false;
                alert("Technical error!");
              }
            );
          }
        }
      }
      else{
        alert("The entered amount is not available in your wallet.");
      }
    }
    else{
      alert("Please enter amount.");
    }
  }
}
