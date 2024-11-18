import { Component } from '@angular/core';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css']
})
export class ConvertComponent {
  curency:any=[];display:any=[];inr:any=0;cnrType:any="USDT";
  constructor() {
    window.scrollTo(0, 0);
    this.inr = localStorage.getItem("inr");
    var curnc = localStorage.getItem("maincurency");
    if(curnc!=null){
      this.curency = this.display = JSON.parse(curnc);
    }
  }
  crypto(pos:any){
    localStorage.setItem("curency",JSON.stringify(this.display[pos]));
  }

  onKeyUp(x:any) {
    var text = (x.target.value).trim();
    if(text.length>0){
      this.display = [];
      for(var i=0;i<this.curency.length;i++){
        if(this.curency[i].symbol.toLowerCase().includes(text.toLowerCase())){
          this.display.push(this.curency[i]);
        }
      }
    }
    else{this.display = this.curency;}
  }
  ex1:any=true;ex2:any=false;ex3:any=false;
  allMarket(){
    this.ex1=true;this.ex2=false;this.ex3=false;
    this.display = this.curency;
  }
  marketUp(){
    this.display = [];
    this.ex1=false;this.ex2=true;this.ex3=false;
    for(var i=0;i<this.curency.length;i++){
      if(this.curency[i].price_change_percentage_24h>=0){
        this.display.push(this.curency[i]);
      }
    }
  }
  marketDown(){
    this.display = [];
    this.ex1=false;this.ex2=false;this.ex3=true;
    for(var i=0;i<this.curency.length;i++){
      if(this.curency[i].price_change_percentage_24h<0){
        this.display.push(this.curency[i]);
      }
    }
  }
  price(usd:any){
    if(this.cnrType=="USDT"){return "$"+ usd.toFixed(3);}
    else{return "₹"+ (usd*this.inr).toFixed(3);;}
  }
}
