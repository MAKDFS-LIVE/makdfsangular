import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';
import {environment} from 'src/environments/environment'

@Component({
  selector: 'app-conformation',
  templateUrl: './conformation.component.html',
  styleUrls: ['./conformation.component.css']
})
export class ConformationComponent {
  payment:any;loading:any=false;load:any=false;
  imgUrl:any = environment.imgurl;
  user:any;
  constructor(private orgnigation:OrgnigationService,private router: Router) {
    var cnf = localStorage.getItem("conform");
    var use = localStorage.getItem("user");
    if(use !=null){this.user = JSON.parse(use);}
    if(cnf!=null){
      this.payment = JSON.parse(cnf);
    }
    else{this.router.navigate(['/']);}
  }
  conformPayment(){
    if(!this.loading){
      if(confirm("Are you sure, Do you want to confirm this payment?")){
        var pay = this.payment;
        pay.userid = this.payment.userid.split(",")[0];
        this.updatePayment(pay);

        /* this.orgnigation.getUser(pay.userid).subscribe(
          Response=>{
            var nUser:any = Response;
            if(Number(nUser.referralAmount)==10){
              nUser.referralAmount = 30;
              this.orgnigation.saveUser(nUser).subscribe();
            }
            this.updatePayment(pay);
          }) */
      }
    }
  }
  updatePayment(pay:any){
    pay.remark = "Payment confirm and add in your wallet.";
    pay.status = "Confirm";
    this.loading = true;
    var walettran = {userid:pay.userid,icon:this.payment.icon, name:this.payment.name,curency:this.payment.buyCurency, wallet:this.payment.wallet,usdamnt:pay.usdamnt};
    this.orgnigation.saveTransaction(pay).subscribe();
    this.orgnigation.saveWallet(walettran).subscribe();
    this.orgnigation.updateWallet(pay.userid,pay.usdamnt).subscribe(
      Response=>{
        localStorage.removeItem("conform");
        this.router.navigate(['/']);
      }
    );
  }

  disp:any=false;query:any="";
  createDiput(){
    if(this.query.length>0){
      this.load = true;
      this.payment.status="Dispute";
      this.payment.remark=this.query;
      this.orgnigation.saveTransaction(this.payment).subscribe(
        responce=>{
          this.load = false;
          this.disp =false;
          alert("We have successfully received your dispute, Our Team will investigate on it and resolve this issue soon.");
          this.router.navigate(['/']);
        },
        error=>{this.load = false;}
      );
    }
  }

}
