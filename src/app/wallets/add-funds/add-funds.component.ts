import { Component } from '@angular/core';
import { OrgnigationService } from 'src/app/service/orgnigation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-funds',
  templateUrl: './add-funds.component.html',
  styleUrls: ['./add-funds.component.css']
})
export class AddFundsComponent {
  mak:any=83.27;
  upivd:any=[];ifscvd:any=[];patmvd:any=[];
  loging:any=false;nodata:String="";
  icon:any = environment.icon;
  user:any;newpay:any;
  constructor(private orgnigation:OrgnigationService) { 
    var use = localStorage.getItem("user");
    var nepay = localStorage.getItem("nepay");
    if(use !=null){this.user = JSON.parse(use);}
    if(nepay !=null){this.newpay = JSON.parse(nepay);}
    else{
      
    }
    this.fetchListed();
    this.mak = Number(localStorage.getItem("inr"))+0.40;
    
    //this.fetchINR();
  }



  public ngOnInit(): void {
    //this.updatevd();
  }
  
  /* fetchINR(){
    let resp = this.orgnigation.getCurrencyValue(3,'INR');
    resp.subscribe(
      (Response:any)=>{
        this.mak = Number(Response) + 0.40;
      });
  } */

  fetchListed(){
    this.sellar=[];this.loging=true;this.nodata="";
    let resp = this.orgnigation.getAllPayment(this.user.id,this.newpay.amount);
    resp.subscribe(
      (Response:any)=>{
        this.sellar=Response;this.nodata="";this.loging=false;
        this.updatevd();
      },
      error=>{this.nodata="No any account present at this time.";this.sellar=[];this.loging=false;})
  }


  updatevd(){
    this.upivd=[];this.ifscvd=[];this.patmvd=[];
    for(var i=0;i<this.sellar.length;i++){
      if(this.sellar[i].paymentType.includes("UPI")){
        this.upivd.push(this.sellar[i]);
      }
      if(this.sellar[i].paymentType.includes("IMPS")){
        this.ifscvd.push(this.sellar[i]);
      }
      if(this.sellar[i].paymentType.includes("Paytm")){
        this.patmvd.push(this.sellar[i]);
      }
    }
  }
  sellar:any=[
    {name:"Vijay Kumar",	paymentType:"UPI,IMPS",quantity:"4000",acno:"1001011500010767",ifsc:"PUNB0100100",upiid:"oreationtechnology@paytm",qrcode:"",completation:100},
    {name:"Suneel Pandy",paymentMode:"UPI,IMPS",quantity:"243546",acno:"1001011500010767",ifsc:"PUNB0100100",upiid:"oreationtechnology@paytm",qrcode:"",completation:96.58},
    {name:"Vaibhav Verma",paymentMode:"UPI,IMPS",quantity:"54267",acno:"1001011500010767",ifsc:"PUNB0100100",upiid:"oreationtechnology@paytm",qrcode:"",completation:98.79},
    {name:"Akhil Singh",paymentMode:"UPI",quantity:"2435",acno:"",ifsc:"",upiid:"9935299542@paytm",qrcode:"",completation:99.45}
  ]
  recever(type:any,item:any){
    item.type = type;
    item.mak = this.mak;

    //console.log(item);
    localStorage.setItem("recever",JSON.stringify(item));
  }
}
