import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OrgnigationService } from '../service/orgnigation.service';
import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';
declare function showAndroidToast(tyepe:any,data:any,msg:any):any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user:any;openWallet:any=0;
  myCurency:any=[];
  notific:any=[];
  icon:any = environment.icon;
  waletLoading:any=true;
  inr:any=82.86;
  
  constructor(private router: Router,public orgnigation:OrgnigationService) {     
    this.user = localStorage.getItem("user");
    localStorage.setItem("inr",this.inr);
    if(this.user !=null){
      this.user = JSON.parse(this.user);
      if(this.user.status!="Approved"){
        this.router.navigate(['/pending']);
      }
      this.loadSellPayment();
      this.loadUser([this.user.contact,this.user.password]);
      this.fetchINR();
      
      var loadedCurency = localStorage.getItem("maincurency");
      if(loadedCurency!=null){
        this.loadedCurency(JSON.parse(loadedCurency));
      }
    }
    else{this.router.navigate(['/refure']);}
    window.scrollTo(0, 0);
  }
  fetchINR(){
    let resp = this.orgnigation.getCurrencyValue(3,'INR');
    resp.subscribe(
      (Response:any)=>{
        this.inr = Number(Response);
        localStorage.setItem("inr",this.inr);
      });
  }

  loadUser(userdata:any){
    this.orgnigation.GetLogin(userdata).subscribe(
      Response=>{
        localStorage.setItem("user",JSON.stringify(Response));
        this.user = Response;
        this.loadCurency();
      },
      error=>{
        this.logout();
      });
  }
  logout(){
    localStorage.clear();
    showAndroidToast("logout","","");
    window.location.href="/";
  }
  
  loadedCurency(Response:any){
    this.curency = this.display  = Response;
        this.fetchOpenWallet();
        this.myCurency = [];
        for(var i=0;i<Response.length;i++){
          if(this.user.resume == null || this.user.resume == ""){
            /* if(Response[i].status=="Active"){
              this.myCurency.push(Response[i]);
            }*/
          }
          else{
            if(this.user.resume.includes(Response[i].symbol)){
              this.myCurency.push(Response[i]);
            }
          }
        }
        this.updateMak();
  }

  loadCurency(){
    this.orgnigation.getCoins().subscribe(
      (Response:any)=>{
        this.curency = this.display = Response;
        this.fetchOpenWallet();
        this.myCurency = [];
        for(var i=0;i<Response.length;i++){
          if(this.user.resume == null || this.user.resume == ""){
            /* if(Response[i].status=="Active"){
              this.myCurency.push(Response[i]);
            } */
          }
          else{
            if((","+this.user.resume).includes(","+Response[i].symbol+",")){
              this.myCurency.push(Response[i]);
            }
          }
        }
        this.updateMak();
      }
    );
  }

  curency:any=[];
  fetchOpenWallet(){
    var walletPay = localStorage.getItem("openwallet");
    if(walletPay!=null){
      var Response = JSON.parse(walletPay);
      this.updateCurencyValue(Response);
      if(Response.length==1){localStorage.setItem("referal","Active");}
      else{localStorage.setItem("referal","Inactive");}
    }

    let resp = this.orgnigation.walletPayment(this.user.id);
    resp.subscribe(
      (Response:any)=>{
        this.waletLoading = false;
        localStorage.setItem("openwallet",JSON.stringify(Response));
        this.updateCurencyValue(Response);
        if(Response.length==1){localStorage.setItem("referal","Active");}
        else{localStorage.setItem("referal","Inactive");}
    },
    error=>{
      this.waletLoading = false;
      this.updateCurencyValue([]);
    });
  }
  updateCurencyValue(curencyList:any){
    this.openWallet = 0;
    for(var i=0;i<curencyList.length;i++){
      const index = this.curency.findIndex((x:any) => x.symbol.toLowerCase() === curencyList[i].curency.toLowerCase());
      curencyList[i].value = (curencyList[i].wallet * this.curency[index].current_price);
      curencyList[i].price = this.curency[index].current_price;
      this.openWallet+= curencyList[i].value;
    }
    this.user.openWallet = this.openWallet;
    this.updateWallet();
  }

  updateWallet(){
    var refw = (Number(this.user.refferWallet));
    /* if(refw<200){refw = 200;}
    refw = (refw/this.inr) */
    for(var i=0;i<5;i++){
      if(i==0){this.slidesStore[i].wallet = (Number(this.user.loanWallet) + Number(this.user.openWallet) + Number(this.user.lockedWallet) + refw + Number(this.user.pendingWallet)).toFixed(2) }
      if(i==1){this.slidesStore[i].wallet = Number(this.user.openWallet).toFixed(3)}
      if(i==2){this.slidesStore[i].wallet = Number(this.user.lockedWallet).toFixed(3)}
      if(i==3){this.slidesStore[i].wallet = Number(this.user.loanWallet).toFixed(3)}
      if(i==4){this.slidesStore[i].wallet = refw.toFixed(3)}
    }
  }
  
  slidesStore:any=[
    {img:"bg-9",link:"cancer-medicine",name:"My",name2:"Funds",wallet:"0.00",url:"/wallet/my-funds",discount:"27"},
    {img:"bg-7",link:"cancer-medicine",name:"Open",name2:"Wallet",wallet:"0.00",url:"/wallet/open",discount:"27"},
    {img:"bg-5",link:"cancer-medicine",name:"Investment",name2:"Wallet",wallet:"0.00",url:"/wallet/locked",discount:"27"},
    {img:"bg-5",link:"cancer-medicine",name:"Loan",name2:"Wallet",wallet:"0.00",url:"/wallet/loan",discount:"27"},
    {img:"bg-4",link:"cancer-medicine",name:"Referral",name2:"Wallet",wallet:"0.00",url:"/wallet/referral",discount:"27"}
  ];
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    margin: 10,
    dots: false,
    autoWidth: true,
    autoHeight: true,
    navSpeed: 400,
    navText: ['', ''],
    nav: false,
    items: 3,
    autoplay: false,
    autoplayHoverPause: true,
    autoplayTimeout: 6000,
    autoplaySpeed: 3000,
    responsive: {
      0: {
        items: 1.3
      },
      400: {
        items: 1.3
      },
      740: {
        items: 1.3
      },
      940: {
        items: 1.3
      },
      1440: {
        items: 1.3
      },
      2640: {
        items: 1.3
      }
    }
  }
  


  /* curency:any=[
    {icon:"mak.png", name:"MAKDFS",	symbol:"MAK", price:"0.001",hours:"9",status:"Active"},
    {icon:"1.png", name:"Bitcoin",	symbol:"BTC", price:"28855.26",hours:"13",status:"Active"},
    {icon:"2.png", name:"Ethereum",	symbol:"ETH", price:"1898.44",hours:"17",status:"Active"},
    {icon:"3.png", name:"Tether",	symbol:"USDT", price:"1.00",hours:"-5",status:"Active"},
    {icon:"4.png", name:"BNB",	symbol:"BNB", price:"323.61",hours:"0",status:"Active"},
    {icon:"5.png", name:"USD Coin",	symbol:"USDC", price:"1.00",hours:"-50",status:"Active"},
    {icon:"6.png", name:"XRP",	symbol:"XRP", price:"0.4585",hours:"50",status:"Active"},
    {icon:"7.png", name:"Cardano",	symbol:"ADA", price:"0.3809",hours:"50",status:"Active"},
    {icon:"8.png", name:"Dogecoin",	symbol:"DOGE", price:"0.07715",hours:"50",status:"Inactive"},
    {icon:"9.png", name:"Polygon",	symbol:"MATIC", price:"0.9808",hours:"0",status:"Active"},
    {icon:"10.png", name:"Solana",	symbol:"SOL", price:"22.00",hours:"50",status:"Inactive"},
    {icon:"11.png", name:"Polkadot",	symbol:"DOT", price:"5.67",hours:"50",status:"Inactive"},
    {icon:"12.png", name:"TRON",	symbol:"TRX", price:"0.0701",hours:"50",status:"Inactive"},
    {icon:"13.png", name:"Litecoin",	symbol:"LTC", price:"84.03",hours:"50",status:"Inactive"},
    {icon:"14.png", name:"Binance USD",	symbol:"BUSD", price:"1.00",hours:"50",status:"Inactive"},
    {icon:"15.png", name:"Shiba Inu",	symbol:"SHIB", price:"0.000009505",hours:"50",status:"Inactive"},
    {icon:"16.png", name:"Avalanche",	symbol:"AVAX", price:"16.69",hours:"50",status:"Inactive"},
    {icon:"17.png", name:"Dai",	symbol:"DAI", price:"1.00",hours:"50",status:"Inactive"},
    {icon:"18.png", name:"Wrapped Bitcoin",	symbol:"WBTC", price:"28912.67",hours:"50",status:"Inactive"},
    {icon:"19.png", name:"Chainlink",	symbol:"LINK", price:"6.98",hours:"50",status:"Inactive"},
    {icon:"20.png", name:"UNUS SED LEO",	symbol:"LEO", price:"3.60",hours:"50",status:"Inactive"},
    {icon:"21.png", name:"Cosmos",	symbol:"ATOM", price:"10.92",hours:"50",status:"Inactive"},
    {icon:"22.png", name:"Uniswap",	symbol:"UNI", price:"5.32",hours:"50",status:"Inactive"},
    {icon:"23.png", name:"Monero",	symbol:"XMR", price:"156.17",hours:"50",status:"Inactive"},
    {icon:"24.png", name:"OKB",	symbol:"OKB", price:"45.53",hours:"50",status:"Inactive"},
    {icon:"25.png", name:"Ethereum Classic",	symbol:"ETC", price:"19.07",hours:"50",status:"Inactive"},
    {icon:"26.png", name:"Toncoin",	symbol:"TON", price:"2.07",hours:"50",status:"Inactive"},
    {icon:"27.png", name:"Stellar",	symbol:"XLM", price:"0.09233",hours:"50",status:"Inactive"},
    {icon:"28.png", name:"Internet Computer",	symbol:"ICP", price:"5.58",hours:"50",status:"Inactive"},
    {icon:"29.png", name:"Bitcoin Cash",	symbol:"BCH", price:"117.33",hours:"50",status:"Inactive"},
    {icon:"30.png", name:"TrueUSD",	symbol:"TUSD", price:"1.00",hours:"50",status:"Inactive"},
    {icon:"31.png", name:"Filecoin",	symbol:"FIL", price:"5.10",hours:"50",status:"Inactive"},
    {icon:"32.png", name:"Hedera",	symbol:"HBAR", price:"0.05718",hours:"50",status:"Inactive"},
    {icon:"33.png", name:"Aptos",	symbol:"APT", price:"9.28",hours:"50",status:"Inactive"},
    {icon:"34.png", name:"Cronos",	symbol:"CRO", price:"0.06818",hours:"50",status:"Inactive"},
    {icon:"35.png", name:"Lido DAO",	symbol:"LDO", price:"1.83",hours:"50",status:"Inactive"},
    {icon:"36.png", name:"Arbitrum",	symbol:"ARB", price:"1.25",hours:"50",status:"Inactive"},
    {icon:"37.png", name:"NEAR Protocol",	symbol:"NEAR", price:"1.77",hours:"50",status:"Inactive"},
    {icon:"38.png", name:"VeChain",	symbol:"VET", price:"0.02035",hours:"50",status:"Inactive"},
    {icon:"39.png", name:"Quant",	symbol:"QNT", price:"111.74",hours:"50",status:"Inactive"},
    {icon:"40.png", name:"ApeCoin",	symbol:"APE", price:"3.61",hours:"50",status:"Inactive"}
  ] */

  sellRequest:any=[];
  loadSellPayment(){
    this.orgnigation.sellerPayment(this.user.id,"Pending").subscribe(
      Response=>{this.sellRequest=Response;});
  }
  conformation(pos:any){
    localStorage.setItem("conform",JSON.stringify(this.sellRequest[pos]));
  }

  cryptos(pos:any){
    localStorage.setItem("curency",JSON.stringify(this.myCurency[pos]));
  }

  crypto(pos:any){
    localStorage.setItem("curency",JSON.stringify(this.curency[pos]));
  }

  ptptrad(){
    localStorage.setItem("curency",JSON.stringify(this.curency[3]));
  }

  updateMak(){
    var cudate = formatDate(new Date(), 'H', 'en')
    var maks:any = localStorage.getItem("maks");
    if(localStorage.getItem("hour")!=cudate){
      localStorage.setItem("hour",cudate);
      maks = this.orgnigation.getRandNum(-4,4);
      localStorage.setItem("maks",maks);
      this.curency[0].price_change_percentage_24h = Number(maks);
    }
    else{
      if(maks==null){
        maks = this.orgnigation.getRandNum(-4,4);
        localStorage.setItem("maks",maks);
      }
      this.curency[0].price_change_percentage_24h = Number(maks);
    }
    localStorage.setItem("maincurency",JSON.stringify(this.curency));
  }

  ex1:any=true;ex2:any=false;ex3:any=false;display:any=[];
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
}
