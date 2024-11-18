import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-locked',
  templateUrl: './locked.component.html',
  styleUrls: ['./locked.component.css']
})
export class LockedComponent {
  user:any;transaction:any=[];loging=false;nodata:any="d";
  loanAmount:any=0;totalCoin:any=0;allCurency:any;makVaue:any=0.01;
  constructor(public orgnigation:OrgnigationService,private router: Router) { 
    var use = localStorage.getItem("user");
    if(use !=null){
      this.user = JSON.parse(use);
      this.fetchListed();
    }
    
    var curnc = localStorage.getItem("allcurency");
    if(curnc!=null){
      this.allCurency = JSON.parse(curnc);
      const index = this.allCurency.findIndex((x:any) => x.symbol === "MAK");
      this.makVaue = this.allCurency[index].price;
    }

  }

  fetchListed(){
    this.transaction=[];this.loging=true;this.nodata="";
    let resp = this.orgnigation.investmentPayment(this.user.id);
    resp.subscribe(
      (Response:any)=>{
        this.transaction=Response;this.nodata="";this.loging=false;
        this.updateWallet( this.transaction);
      },
      error=>{this.transaction =[];this.nodata="No transaction";this.loging=false;});
  }

  updateWallet(curencyList:any){
    for(var i=0;i<curencyList.length;i++){
      if(curencyList[i].status=="Active"){
        this.loanAmount += (curencyList[i].usdtAmnt*1);
        this.totalCoin +=  Number(curencyList[i].makAmnt);
      }
    }
  }
  
  details(pos:any){
    if(this.transaction[pos].status!="Pending" && this.transaction[pos].status!="Redeem Early"){
      localStorage.setItem("indeatails",JSON.stringify(this.transaction[pos]));
      this.router.navigate(['/investment/details']);
    }
  }

  getLoan(){
    var data = '{"userid": "'+this.user.id+'", "wallet": "'+this.totalCoin+'", "curency": "MAK", "name": "MAK", "icon": "https://m.makdfs.com/assets/images/99999.png", "usdamnt": "'+this.loanAmount+'", "value": 12, "price": '+this.makVaue+' }';
    localStorage.setItem("loanCurency",data);
  }


  api:any = {
    "env": {
      "terminalType": "APP"
    },
    "orderTags": {
      "ifProfitSharing": true
    },
    "merchantTradeNo": "9825382937292",
    "orderAmount": 25.17,
    "currency": "BUSD",
    "goods": {
      "goodsType": "01",
      "goodsCategory": "D000",
      "referenceGoodsId": "7876763A3B",
      "goodsName": "Ice Cream",
      "goodsDetail": "Greentea ice cream cone"
    }
  }


  

}
