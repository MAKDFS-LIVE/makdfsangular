import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-pay-conform',
  templateUrl: './pay-conform.component.html',
  styleUrls: ['./pay-conform.component.css']
})

export class PayConformComponent {
  recever:any;
  recipt:any="";fieName:any="";file:any="";
  user:any;newpay:any;
  constructor(private orgnigation:OrgnigationService,private router: Router) { 
    var rec = localStorage.getItem("recever");
    var use = localStorage.getItem("user");
    var nepay = localStorage.getItem("nepay");
    if(nepay !=null){this.newpay = JSON.parse(nepay);}
    if(use !=null){this.user = JSON.parse(use);}

    if(rec!=null){
      this.recever = JSON.parse(rec);
    }
    else{
      this.router.navigate(['/wallet/open']);
    }
  }

  public ngOnInit(): void {

  }
  
  onselectfile(event:any){
    if(event.target.files){
      this.fieName = event.target.files[0].name;
      this.file = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        this.recipt = event.target.result;
      }
    }
  }

  loading:any = false;
  conformPayment(){
    if(!this.loading){
      if(this.fieName==""){
        alert("Please upload receipt");
      }
      else{
        this.loading = true;
        this.recever.accountid = this.recever.accountid.split(",")[0];
        var recpName = this.orgnigation.getRandNum(100000000000,999999999999)+"."+(this.file.name.split('.').pop()).toLowerCase();


        var transaction = {userid:this.user.id,paymentid:this.recever.id,sellerid:this.recever.userid,usdamnt:this.recever.usdAmnt,transferant:this.recever.inrAmnt,curency:"INR",recipt:recpName,status:"Pending",remark:"Payment done but waiting for approval.",datetime:formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en'),icon: this.newpay.image, name:this.newpay.name,buyCurency:this.newpay.symbol,wallet:this.newpay.wallet}
        
        this.orgnigation.postFile("recept",this.file,recpName).subscribe();
        this.orgnigation.saveTransaction(transaction).subscribe();
        this.orgnigation.savePayment(this.recever).subscribe(
          Response=>{
            localStorage.removeItem("recever");
            this.router.navigate(['/wallet/final-conformation']);
          }
        );
      }
    }
  }


}
