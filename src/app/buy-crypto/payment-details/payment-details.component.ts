import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent {
  cnfpay:any=false;
  inrAmnt:any="";
  usdAmnt:any="";
  recever:any;newpay:any;
  imgUrl:any = environment.imgurl;

  constructor(){
    var rec = localStorage.getItem("recever");
    var nepay = localStorage.getItem("nepay");
    if(nepay !=null){
      this.newpay = JSON.parse(nepay);
    }
    if(rec!=null){
      this.recever = JSON.parse(rec);
      this.inrAmnt = (this.newpay.amount * this.recever.mak);
      this.recever.inrAmnt = this.inrAmnt;
      this.recever.usdAmnt = this.newpay.amount;
    }
  }


  conformPayment(){
    localStorage.setItem("recever",JSON.stringify(this.recever));
  }
}
