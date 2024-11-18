import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-mak-wallet',
  templateUrl: './mak-wallet.component.html',
  styleUrls: ['./mak-wallet.component.css']
})
export class MakWalletComponent {
  user:any;transaction:any=[];loging:any="";nodata:any="";curency:any;openWallet:any=0;
  constructor(private orgnigation:OrgnigationService,private router: Router) { 
    var use = localStorage.getItem("user");
    if(use !=null){
      this.user = JSON.parse(use);
    }
    var curnc = localStorage.getItem("maincurency");
    if(curnc!=null){this.curency = JSON.parse(curnc);}
    this.fetchListed();
    window.scrollTo(0, 0);
  }

  fetchListed(){
    this.transaction=[];this.loging=true;this.nodata="";
    let resp = this.orgnigation.walletCurencyPayment(this.user.id,"MAK");
    resp.subscribe(
      (Response:any)=>{
        this.transaction=Response;this.nodata="";this.loging=false;
        this.updateCurencyValue(this.transaction);
      },
      error=>{this.loging=false;this.nodata="No data";});
  }

  updateCurencyValue(curencyList:any){
      const index = this.curency.findIndex((x:any) => x.symbol.toLowerCase() === curencyList.curency.toLowerCase());
      curencyList.value = (curencyList.wallet * this.curency[index].current_price);
      curencyList.price = this.curency[index].current_price;
      this.openWallet = curencyList.value;
  }
  
  ptptrad(){
    localStorage.setItem("curency",JSON.stringify(this.curency[0]));
  }

  invest(){
    localStorage.setItem("loanCurency",JSON.stringify(this.transaction));
    this.router.navigate(['/investment/home']);
  }
}
