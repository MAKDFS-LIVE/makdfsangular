import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent {
  user:any;transaction:any=[];loging=false;nodata:any="d";
  loanAmount:any=0;
  constructor(public orgnigation:OrgnigationService,private router: Router) { 
    var use = localStorage.getItem("user");
    if(use !=null){
      this.user = JSON.parse(use);
      this.fetchListed();
    }
  }

  fetchListed(){
    this.transaction=[];this.loging=true;this.nodata="";
    let resp = this.orgnigation.loanPayment(this.user.id);
    resp.subscribe(
      (Response:any)=>{
        this.transaction=Response;this.nodata="";this.loging=false;
        this.updateWallet( this.transaction);
      },
      error=>{this.transaction =[];this.nodata="No transaction";this.loging=false;});
  }
  
  updateWallet(curencyList:any){
    for(var i=0;i<curencyList.length;i++){
      if(curencyList[i].status=="Approved"){
        this.loanAmount += (curencyList[i].usdtAmnt*1);
      }
    }
  }

  details(pos:any){
    if(this.transaction[pos].status!="Pending"){
      localStorage.setItem("loaddeatails",JSON.stringify(this.transaction[pos]));
      this.router.navigate(['/loan/details']);
    }
  }
}
