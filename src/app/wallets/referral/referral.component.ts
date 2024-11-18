import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.css']
})

export class ReferralComponent {
  user:any;refferWallet:any=0;inr:any;transaction:any=[];loging:any=true;minimumWithdraw:any=10;referralAmount:any=0;
  widra:any=false;
  finalLenth:any=0;
  loading:any=true;account:any=[];
  constructor(private orgnigation:OrgnigationService,private router: Router) { 
    var use = localStorage.getItem("user");
    this.inr = Number(localStorage.getItem("inr"));
    if(use !=null){
      this.user = JSON.parse(use);
      this.refferWallet = Number(this.user.refferWallet);
      this.referralAmount = Number(this.user.referralAmount);
      /* if(this.referralAmount == 40){this.minimumWithdraw=200;}
      else if(this.referralAmount == 30){this.minimumWithdraw=150;}
      else if(this.referralAmount == 20){this.minimumWithdraw=100;}
      else if(this.referralAmount == 10){this.minimumWithdraw=70;}
      else if(this.referralAmount == 5){this.minimumWithdraw=25;} */
      
      this.getTransaction();
      this.fetchData();
    }
    window.scrollTo(0, 0);
  }

  fetchData(){
    let resp = this.orgnigation.getAccountById(this.user.id);
    resp.subscribe(Response=>{this.account=Response;});
  }

  getTransaction(){
    this.loging = true;
    this.orgnigation.histrybytype(this.user.id,"Referral").subscribe(
      (Response:any)=>{
        this.transaction = Response;
        this.loging = false;
      });
  }


  withdrawal(){
    if(this.refferWallet<this.minimumWithdraw){
      alert("The minimum withdrawal is $"+this.minimumWithdraw+". Share with your friends to increase your balance.");
    }
    else{
      this.widra = true;
    }
  }

  updateamount:any=new FormGroup({
    amount: new FormControl("",[Validators.required])
  });

  load:any=false;
  submit(){
    if(this.account.length==0){
      alert("You haven't listed any bank details. Please add at least one account before requesting a withdrawal.");
      this.router.navigate(['/p2p/add-account']);
    }
    else{
      if (this.updateamount.invalid) {
        this.updateamount.get('amount').markAsTouched();
        var invalidFields:any = [].slice.call(document.getElementsByClassName('ng-invalid'));
        invalidFields[1].focus();
      }
      else{
        var value = Number(this.updateamount.value.amount);
        if(value<this.minimumWithdraw){
          alert("The minimum withdrawal is $"+this.minimumWithdraw+". Share with your friends to increase your balance.");
          this.updateamount.reset();
        }
        else{
          if(value<=this.refferWallet){
            if(!this.load){
              this.load = true;
              var transaction = {userid:this.user.id,sponcerid:"",sponcername	:"Self",amount:(value*-1),curency:"INR",datetime:formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en'),note:"Payment requested for withdrawal.",status:"Pending",type:"Referral"};
  
              this.user.refferWallet = Number(this.user.refferWallet) - value;
              this.refferWallet = this.user.refferWallet;
              localStorage.setItem("user",JSON.stringify(this.user));
              this.orgnigation.saveUser(this.user).subscribe();
              this.orgnigation.saveHistry(transaction).subscribe(
                (Response:any)=>{
                  this.getTransaction();
                  this.load = false;
                  this.updateamount.reset();
                  this.widra = false;
                  alert("We have received your withdrawal request. Your account will be credited within 12 hours.");
                });
            }
          }
          else{
            alert("Please enter an amount lower than your available balance.");
            this.updateamount.reset();
          }
        }
      }
    }
  }
}
