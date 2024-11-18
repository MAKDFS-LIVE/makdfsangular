import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pay-details',
  templateUrl: './pay-details.component.html',
  styleUrls: ['./pay-details.component.css']
})
export class PayDetailsComponent {
  cnfpay:any=false;
  inrAmnt:any="";
  usdAmnt:any="";
  recever:any;newpay:any;
  imgUrl:any = environment.imgurl;
  public ngOnInit(): void {
    var rec = localStorage.getItem("recever");
    var nepay = localStorage.getItem("nepay");
    if(nepay !=null){
      this.newpay = JSON.parse(nepay);
    }
    if(rec!=null){
      this.recever = JSON.parse(rec);
      this.inrAmnt = (this.newpay.amount * this.recever.mak);
    }
  }

  sequrePayment(){
    if(this.inrAmnt!=""){
      this.usdAmnt = (this.inrAmnt / this.recever.mak).toFixed(2);
      if(this.usdAmnt<= Number(this.recever.quantity)){
        this.cnfpay = true;
        this.recever.inrAmnt = this.inrAmnt;
        this.recever.usdAmnt = this.usdAmnt;
        this.recever.selled =  Number(this.recever.selled) +  Number(this.usdAmnt);
      }
      else{
        this.inrAmnt="";
        alert("You can not buy USDT more than available balance.");
      }
    }
    else{
      alert("Please enter amount");
    }
  }

  conformPayment(){
    localStorage.setItem("recever",JSON.stringify(this.recever));
  }
}
