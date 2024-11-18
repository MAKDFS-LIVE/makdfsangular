import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-investment-details',
  templateUrl: './investment-details.component.html',
  styleUrls: ['./investment-details.component.css']
})
export class InvestmentDetailsComponent {
  indeatails:any;user:any;mak:any;loading:any=false;
  constructor(private orgnigation:OrgnigationService,private router: Router) { 
    var use = localStorage.getItem("user");
    if(use!=null){this.user = JSON.parse(use);}
    var invs = localStorage.getItem("indeatails");
    if(invs !=null){
      this.indeatails = JSON.parse(invs);
    }
    var cur = localStorage.getItem("maincurency");
    if(cur!=null){
      this.mak = (JSON.parse(cur))[0];
      
    }
    window.scroll(0,0);
  }

  redeed(){
    if(this.user.sponsor.length>0){
      alert("Your first investment Redeem after 60 days");
    }
    else{
      if(!this.loading){
        if(confirm("Are you sure, Do you want to redeem early?")){
          this.loading =true;
          this.indeatails.status="Redeem Early";
          this.orgnigation.saveInvestment(this.indeatails).subscribe();
          var walettran = {userid:this.user.id,icon:this.indeatails.icon, name:"MAK",curency:"MAK", wallet:(this.indeatails.makAmnt*-1),usdamnt:this.indeatails.usdtAmnt};
          
          this.orgnigation.saveWallet(walettran).subscribe(
            Response=>{
              alert("Your amount is successfully redeemed and Its credited in your wallet.");
              this.router.navigate(['/wallet/open']);
            }
          );
        }
      }
    }
  }
}
