import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';
import { Web3ServiceService } from 'src/app/service/web3-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent {
  bysell:any="";
  curency:any;user:any;load:any=false;load2:any=false;
  usdtAmnt:any="";wallet:any;
  curencyWallet:any=0;usdtWallet:any=0;
  curencyData:any;usdtData:any;
  icon:any = environment.icon;
  tab:any='info';treds:any=[];loadtred:any=false;notred:String = "";
  pendingTred:any=[];allcurency:any=[];
  sponser:any;chartUrl:any;
  accounts:any;
  constructor(private router: Router,public orgnigation:OrgnigationService,private sanitizer: DomSanitizer,private web3Service: Web3ServiceService) { 
    var use = localStorage.getItem("user");
    var cur = localStorage.getItem("curency");
    var curnc = localStorage.getItem("maincurency");
    if(curnc!=null){this.allcurency = JSON.parse(curnc);}
    if(use !=null){this.user = JSON.parse(use);}
    if(cur!=null){
      this.curency = JSON.parse(cur);
      this.atPrice = this.curency.current_price;
      this.chartUrl = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.makdfs.com/chart?s="+this.curency.symbol);
      if(this.user.resume==null){this.user.resume="";}
      if(this.user.resume.includes(this.curency.symbol)){
        this.truEye = true;
      }
      this.stocksData = [this.getData()];
    }

    this.fetchListed();
    this.fetchUsdt();
    this.tredHistry();
    window.scrollTo(0, 0);

    var refs = localStorage.getItem("referal");
    if(refs=="Active"){
      if(this.user.sponsor!="" && this.user.sponsor!=null){
        var userid = this.user.sponsor.split(",")[0];
        this.orgnigation.getUser(userid).subscribe(
          (Response:any)=>{
            this.sponser = Response;
            this.sponser.refferWallet = (Number(this.sponser.refferWallet) + 1);
            this.sponser.sponsor = userid+","+this.user.id+","+this.user.name;
          }
        );
      }
    }
  }

  async ngOnInit() {
    try {
      this.accounts = await this.web3Service.getAccounts();
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  }

  chart: any;
	generateRandomData = () => {
		var y  = 1000, dps = [];
		for(var i = 0; i < 50; i++) {
			y += Math.ceil(Math.random() * 10 - 5);
			dps.push({ y: y});
		}
		return dps;
	}

	chartOptions = {
		theme: "light2",
		animationEnabled: true,
		zoomEnabled: true,
		title: {
			text: ""
		},
		axisY: {
			labelFormatter: (e: any) => {
				var suffixes = ["", "", "", "", ""];
				var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
				if(order > suffixes.length - 1)
					order = suffixes.length - 1;
 
				var suffix = suffixes[order];
				return "$" + (e.value / Math.pow(1000, order)) + suffix;
			}
		},
		data: [{
      color:'green',
			type: "line",
			xValueFormatString: "MM",
			yValueFormatString: "$#,###.##",
			dataPoints: this.generateRandomData()
		}]
	}	

  tredHistry(){
    this.treds = [];this.loadtred=true;this.notred="";
    let resp = this.orgnigation.tredHistry(this.user.id,this.curency.symbol);
    resp.subscribe(
      (Response:any)=>{
        this.loadtred=false;
        this.treds = Response;
        for(var i=0;i<this.treds.length;i++){
          if(this.treds[i].status=="Pending"){
            this.pendingTred.push(this.treds[i]);
          }
        }
      },
      error=>{
        this.loadtred=false;
        this.notred="No data"
      });
  }

  fetchListed(){
    let resp = this.orgnigation.walletCurencyPayment(this.user.id,this.curency.symbol);
    resp.subscribe(
      (Response:any)=>{
        this.curencyData = JSON.stringify(Response);
        this.curencyWallet = Number(Response.wallet);

        localStorage.setItem("loanCurency",JSON.stringify(Response));
      });
  }
  fetchUsdt(){
    let resp = this.orgnigation.walletCurencyPayment(this.user.id,"USDT");
    resp.subscribe(
      (Response:any)=>{
        this.usdtData = JSON.stringify(Response);
        this.usdtWallet = Number(Response.wallet);
        console.log(Response);
      },
      error=>{
        var usd ={"userid": this.user.id,"wallet": "","curency": "usdt","name": "Tether","icon": "https://m.makdfs.com/coins/tether.webp","usdamnt": "0"};
        this.usdtData = JSON.stringify(usd);
      }
      );
  }

  buycrypto(){
    this.usdtAmnt = this.totalAmount;
    if(this.usdtAmnt>=5){
      if(this.usdtWallet < Number(this.usdtAmnt) || this.curency.symbol=="usdt" || this.curency.symbol=="MAK"){
        if(this.curency.symbol=="usdt" || this.curency.symbol=="MAK"){
          this.curency.amount = this.usdtAmnt;
          this.curency.wallet = (this.amount).toFixed(8);
          localStorage.setItem("nepay",JSON.stringify(this.curency));
        }
        else{
          const index = this.allcurency.findIndex((x:any) => x.symbol.toLowerCase() === "usdt");
          this.curency = this.allcurency[index];

          this.curency.amount = this.usdtAmnt;
          this.curency.wallet = (this.amount).toFixed(8);
          localStorage.setItem("nepay",JSON.stringify(this.curency));
        }
        //this.router.navigate(['wallet/add-funds']);

        //when payment transfer directaly from company
        var makv = Number(localStorage.getItem("inr"))+0.40;
        var recever = {
          id: 1,
          userid: "2103",
          name:"AMKMAK GLOBAL BUSINESS SOLUTIONS PRIVATE LIMITED",
          upiid:"",
          qrcode:"",
          accountid: "1,AMKMAK GLOBAL BUSINESS SOLUTIONS PRIVATE LIMITED,,,,,,mab0450018a0189026@yesbank,",
          paymentType: "UPI",
          quantity: this.curency.amount,
          selled: "115",
          completation: "0",
          status: "Active",
          type: "UPI",
          mak: makv
        }
        localStorage.setItem("recever",JSON.stringify(recever));
        //when payment transfer directaly from company
        this.router.navigate(['payment-details']);
      }
      else{
        if(this.atPrice == this.curency.current_price){
          this.convertCorency();
        }
        else{
          this.load = true;
          var updatedUsdt = JSON.parse(this.usdtData);
          updatedUsdt.wallet = Number(updatedUsdt.wallet) - Number(this.usdtAmnt);
          this.orgnigation.saveOpenWallet(updatedUsdt).subscribe();

          var tredhistry = {userid:this.user.id,curency:this.curency.name,symble:this.curency.symbol,amount:this.amount.toFixed(8),usdt:this.usdtAmnt,price:this.atPrice,type:"Buy",status:"Pending",datetime:formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en')}
          this.orgnigation.saveTredHistry(tredhistry).subscribe(
            responce=>{
              this.load = false;
              this.tab = "history";
              window.scrollTo(0, 0);
              this.tredHistry();
            }
          );
        }
      }
    }
    else{
      alert("Minimum investment is $5");
    }
  }

  sellcrypto(){
    this.usdtAmnt = this.totalAmount;
    if(this.usdtAmnt>0){
      var newAmount:any = Number(this.amount).toFixed(8);
      if(newAmount <= this.curencyWallet){
        if(this.atPrice == this.curency.current_price){
          this.load2 = true;
          var updatedUsdt = JSON.parse(this.usdtData);
          updatedUsdt.wallet = Number(updatedUsdt.wallet) + Number(this.usdtAmnt);
          this.orgnigation.saveOpenWallet(updatedUsdt).subscribe();
          
          var tredhistry = {userid:this.user.id,curency:this.curency.name,symble:this.curency.symbol,amount:(this.amount*1).toFixed(8),usdt:(this.usdtAmnt* 1),price:this.atPrice,type:"Sell",status:"Active",datetime:formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en')}
          this.orgnigation.saveTredHistry(tredhistry).subscribe();
      
          var updatedCurency = JSON.parse(this.curencyData);
          updatedCurency.wallet = Number(updatedCurency.wallet) - newAmount;
          updatedCurency.usdamnt = Number(updatedCurency.usdamnt) - Number(this.usdtAmnt);
          this.orgnigation.saveOpenWallet(updatedCurency).subscribe(
            responce=>{
              this.load2 = false;
              this.router.navigate(['/wallet/open']);
            },
            error=>{
              this.load2 = false;
            }
          );
        }
        else{
          this.load2 = true;

          var updatedCurency = JSON.parse(this.curencyData);
          updatedCurency.wallet = Number(updatedCurency.wallet) - newAmount;
          this.orgnigation.saveOpenWallet(updatedCurency).subscribe();
          
          var tredhistry = {userid:this.user.id,curency:this.curency.name,symble:this.curency.symbol,amount:(this.amount*1).toFixed(8),usdt:(this.usdtAmnt*1),price:this.atPrice,type:"Sell",status:"Pending",datetime:formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en')}
          this.orgnigation.saveTredHistry(tredhistry).subscribe(
            responce=>{
              this.load2 = false;
              this.tab = "history";
              window.scrollTo(0, 0);
              this.tredHistry();
              this.fetchListed();
            }
          );
        }
      }
      else{
        alert("Required amount is not available in your wallet.");
      }
    }
    else{
      alert("Please enter amount.");
    }
  }

  convertCorency(){
    this.load = true;
    var newAmount = (this.amount).toFixed(8);
    var updatedUsdt = JSON.parse(this.usdtData);
    updatedUsdt.wallet = Number(updatedUsdt.wallet) - Number(this.usdtAmnt);
    updatedUsdt.usdamnt = Number(updatedUsdt.usdamnt) - Number(this.usdtAmnt);
    this.orgnigation.saveOpenWallet(updatedUsdt).subscribe();
    
    var tredhistry = {userid:this.user.id,curency:this.curency.name,symble:this.curency.symbol,amount:this.amount.toFixed(8),usdt:this.usdtAmnt,price:this.atPrice,type:"Buy",status:"Active",datetime:formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en')}
    this.orgnigation.saveTredHistry(tredhistry).subscribe();

    if(this.sponser!=null){
      localStorage.setItem("referal","Inactive");
      this.orgnigation.saveReferal(this.sponser).subscribe();
    }

    var walettran = {userid:this.user.id,icon:this.curency.image, name:this.curency.name,curency:this.curency.symbol, wallet:newAmount,usdamnt:this.usdtAmnt};
    this.orgnigation.saveWallet(walettran).subscribe(
      responce=>{
        this.load = false;
        this.router.navigate(['/wallet/open']);
      },
      error=>{
        this.load = false;
      }
    );

  }



  atPrice:any=0;amount:any="";totalAmount:any="";
  priceChange(num:any){
    this.atPrice = Number(this.atPrice) + num;
    this.totalAmount = this.amount * this.atPrice;
  }
  priceUp(ev:any){
    this.atPrice = ev.target.value;
    if(this.atPrice==""){this.amount="";this.totalAmount="";}
    else{
      this.totalAmount = this.amount * this.atPrice;
    }
  }
  amountChange(num:any){
    if(this.amount==""){this.amount=0;}
    if(num<0){
      if(Number(this.amount)>1){
        this.amount = Number(this.amount) + num;
      }
    }
    else{
      this.amount = Number(this.amount) + num;
    }

    this.totalAmount = this.amount * this.atPrice;
  }

  amountUp(ev:any){
    this.amount = ev.target.value;
    if(this.amount==""){this.totalAmount="";}
    else{
      this.totalAmount = this.amount * this.atPrice;
    }
  }

  maxAmount(){
    this.amount = this.curencyWallet.toFixed(8);
    if(this.amount==""){this.totalAmount="";}
    else{
      this.totalAmount = this.amount * this.atPrice;
    }
  }

  totalAmountChange(num:any){
    if(this.totalAmount==""){this.totalAmount=0;}
    if(num<0){
      if(Number(this.totalAmount)>1){
        this.totalAmount = Number(this.totalAmount) + num;
      }
    }
    else{
      this.totalAmount = Number(this.totalAmount) + num;
    }

    this.amount = this.totalAmount / this.atPrice;
  }
  totalAmountUp(ev:any){
    this.totalAmount = ev.target.value;
    if(this.totalAmount==""){this.amount="";}
    else{
      this.amount = this.totalAmount / this.atPrice;
    }
  }
  
  maxUsdtAmount(){
    this.totalAmount = this.usdtWallet;
    if(this.totalAmount==""){this.amount="";}
    else{
      this.amount = this.totalAmount / this.atPrice;
    }
  }

  truEye:any=false;
  saveFaveret(){
    if(this.truEye){
      this.truEye = false;
      this.user.resume = this.user.resume.replace(this.curency.symbol+",", '');
    }
    else{
      this.truEye = true;
      this.user.resume+=this.curency.symbol+",";
    }
    localStorage.setItem("user",JSON.stringify(this.user));
    this.orgnigation.saveUser(this.user).subscribe();
  }

  cancelOrder(pos:any){
    if(confirm("Are you sure you want to cancel this order?")){
      
      var pendTrad = this.treds[pos];
      if(pendTrad.type == "Buy"){
        var updatedUsdt = JSON.parse(this.usdtData);
        updatedUsdt.wallet = Number(updatedUsdt.wallet) + Number(pendTrad.usdt);
        this.orgnigation.saveOpenWallet(updatedUsdt).subscribe();
      }
      else{
        var updatedCurency = JSON.parse(this.curencyData);
        updatedCurency.wallet = Number(updatedCurency.wallet) + (pendTrad.amount*1);
        this.orgnigation.saveOpenWallet(updatedCurency).subscribe();
      }

      var order = this.treds[pos];
      order.status = "Canceled";
      this.treds = [];this.loadtred=true;this.notred="";
      this.orgnigation.saveTredHistry(order).subscribe(
        responce=>{
          this.tredHistry();
        }
      );
    }
  }

  priceSet(per:any){
    this.totalAmount = this.usdtWallet * (per/100);
    if(this.totalAmount==""){this.amount="";}
    else{this.amount = this.totalAmount / this.atPrice;}
  }

  public stocksData: any = [];

  getData(){
    var d;var m;var y=2024;
    d = Number(formatDate(new Date(), 'dd', 'en')) + 1;
    m = Number(formatDate(new Date(), 'MM', 'en')) - 1;
    
    var dps = [];
    var open = Number(this.atPrice);
    for(var i = 0; i < 40; i++) {
      open = open + this.orgnigation.getRandNum(-5,5);
      var high = this.orgnigation.getRandNum(-5,5);
      var low = this.orgnigation.getRandNum(-5,5);
      var close = this.orgnigation.getRandNum(-5,5);
      var data = { "Date": new Date(y, m, d),"Open": open,"High": (open+high),"Low": (open-low),"Close":(open+close),"Adj Close": (open+30),"Volume": 3757910000.00}

			dps.push(data);

      d = d-1;
      if(d==0){d = 30;m=m-1;}
      if(m==0){m=12,y=2023}
		}
    return dps.slice().reverse();


    return [
      { "Date": new Date(2020, 2, 3),"Open": 3235.66,"High": 3268.44,"Low": 3235.66,"Close": 3248.92,"Adj Close": 3248.92,"Volume": 3757910000.00},
      { "Date": new Date(2020, 2, 4),"Open": 3280.61,"High": 3306.92,"Low": 3280.61,"Close": 3297.59,"Adj Close": 3297.59,"Volume": 3995320000.00},
      { "Date": new Date(2020, 2, 5),"Open": 3324.91,"High": 3337.58,"Low": 3313.75,"Close": 3334.69,"Adj Close": 3334.69,"Volume": 4117730000.00},
      { "Date": new Date(2020, 2, 6),"Open": 3344.92,"High": 3347.96,"Low": 3334.39,"Close": 3345.78,"Adj Close": 3345.78,"Volume": 3868370000.00},
      { "Date": new Date(2020, 2, 7),"Open": 3335.54,"High": 3341.42,"Low": 3322.12,"Close": 3327.71,"Adj Close": 3327.71,"Volume": 3730650000.00},
      { "Date": new Date(2020, 2, 10),"Open": 3318.28,"High": 3352.26,"Low": 3317.77,"Close": 3352.09,"Adj Close": 3352.09,"Volume": 3450350000.00},
      { "Date": new Date(2020, 2, 11),"Open": 3365.87,"High": 3375.63,"Low": 3352.72,"Close": 3357.75,"Adj Close": 3357.75,"Volume": 3760550000.00},
      { "Date": new Date(2020, 2, 12),"Open": 3370.50,"High": 3381.47,"Low": 3369.72,"Close": 3379.45,"Adj Close": 3379.45,"Volume": 3926380000.00},
      { "Date": new Date(2020, 2, 13),"Open": 3365.90,"High": 3385.09,"Low": 3360.52,"Close": 3373.94,"Adj Close": 3373.94,"Volume": 3498240000.00},
      { "Date": new Date(2020, 2, 14),"Open": 3378.08,"High": 3380.69,"Low": 3366.15,"Close": 3380.16,"Adj Close": 3380.16,"Volume": 3398040000.00},
      { "Date": new Date(2020, 2, 18),"Open": 3369.04,"High": 3375.01,"Low": 3355.61,"Close": 3370.29,"Adj Close": 3370.29,"Volume": 3746720000.00},
      { "Date": new Date(2020, 2, 19),"Open": 3380.39,"High": 3393.52,"Low": 3378.83,"Close": 3386.15,"Adj Close": 3386.15,"Volume": 3600150000.00},
      { "Date": new Date(2020, 2, 20),"Open": 3380.45,"High": 3389.15,"Low": 3341.02,"Close": 3373.23,"Adj Close": 3373.23,"Volume": 4007320000.00},
      { "Date": new Date(2020, 2, 21),"Open": 3360.50,"High": 3360.76,"Low": 3328.45,"Close": 3337.75,"Adj Close": 3337.75,"Volume": 3899270000.00},
      { "Date": new Date(2020, 2, 24),"Open": 3257.61,"High": 3259.81,"Low": 3214.65,"Close": 3225.89,"Adj Close": 3225.89,"Volume": 4842960000.00},
      { "Date": new Date(2020, 2, 25),"Open": 3238.94,"High": 3246.99,"Low": 3118.77,"Close": 3128.21,"Adj Close": 3128.21,"Volume": 5591510000.00},
      { "Date": new Date(2020, 2, 26),"Open": 3139.90,"High": 3182.51,"Low": 3108.99,"Close": 3116.39,"Adj Close": 3116.39,"Volume": 5478110000.00},
      { "Date": new Date(2020, 2, 27),"Open": 3062.54,"High": 3097.07,"Low": 2977.39,"Close": 2978.76,"Adj Close": 2978.76,"Volume": 7058840000.00},
      { "Date": new Date(2020, 2, 28),"Open": 2916.90,"High": 2959.72,"Low": 2855.84,"Close": 2954.22,"Adj Close": 2954.22,"Volume": 8563850000.00},
      { "Date": new Date(2020, 3, 2),"Open": 2974.28,"High": 3090.96,"Low": 2945.19,"Close": 3090.23,"Adj Close": 3090.23,"Volume": 6376400000.00},
      { "Date": new Date(2020, 3, 3),"Open": 3096.46,"High": 3136.72,"Low": 2976.63,"Close": 3003.37,"Adj Close": 3003.37,"Volume": 6355940000.00},
      { "Date": new Date(2020, 3, 4),"Open": 3045.75,"High": 3130.97,"Low": 3034.38,"Close": 3130.12,"Adj Close": 3130.12,"Volume": 5035480000.00},
      { "Date": new Date(2020, 3, 5),"Open": 3075.70,"High": 3083.04,"Low": 2999.83,"Close": 3023.94,"Adj Close": 3023.94,"Volume": 5575550000.00},
      { "Date": new Date(2020, 3, 6),"Open": 2954.20,"High": 2985.93,"Low": 2901.54,"Close": 2972.37,"Adj Close": 2972.37,"Volume": 6552140000.00},
      { "Date": new Date(2020, 3, 9),"Open": 2863.89,"High": 2863.89,"Low": 2734.43,"Close": 2746.56,"Adj Close": 2746.56,"Volume": 8423050000.00},
      { "Date": new Date(2020, 3, 10),"Open": 2813.48,"High": 2882.59,"Low": 2734.00,"Close": 2882.23,"Adj Close": 2882.23,"Volume": 7635960000.00},
      { "Date": new Date(2020, 3, 11),"Open": 2825.60,"High": 2825.60,"Low": 2707.22,"Close": 2741.38,"Adj Close": 2741.38,"Volume": 7374110000.00},
      { "Date": new Date(2020, 3, 12),"Open": 2630.86,"High": 2660.95,"Low": 2478.86,"Close": 2480.64,"Adj Close": 2480.64,"Volume": 8829380000.00},
      { "Date": new Date(2020, 3, 13),"Open": 2569.99,"High": 2711.33,"Low": 2492.37,"Close": 2711.02,"Adj Close": 2711.02,"Volume": 8258670000.00},
      { "Date": new Date(2020, 3, 16),"Open": 2508.59,"High": 2562.98,"Low": 2380.94,"Close": 2386.13,"Adj Close": 2386.13,"Volume": 7781540000.00},
      { "Date": new Date(2020, 3, 17),"Open": 2425.66,"High": 2553.93,"Low": 2367.04,"Close": 2529.19,"Adj Close": 2529.19,"Volume": 8358500000.00},
      { "Date": new Date(2020, 3, 18),"Open": 2436.50,"High": 2453.57,"Low": 2280.52,"Close": 2398.10,"Adj Close": 2398.10,"Volume": 8755780000.00},
      { "Date": new Date(2020, 3, 19),"Open": 2393.48,"High": 2466.97,"Low": 2319.78,"Close": 2409.39,"Adj Close": 2409.39,"Volume": 7946710000.00},
      { "Date": new Date(2020, 3, 20),"Open": 2431.94,"High": 2453.01,"Low": 2295.56,"Close": 2304.92,"Adj Close": 2304.92,"Volume": 9044690000.00},
      { "Date": new Date(2020, 3, 23),"Open": 2290.71,"High": 2300.73,"Low": 2191.86,"Close": 2237.40,"Adj Close": 2237.40,"Volume": 7402180000.00},
      { "Date": new Date(2020, 3, 24),"Open": 2344.44,"High": 2449.71,"Low": 2344.44,"Close": 2447.33,"Adj Close": 2447.33,"Volume": 7547350000.00},
      { "Date": new Date(2020, 3, 25),"Open": 2457.77,"High": 2571.42,"Low": 2407.53,"Close": 2475.56,"Adj Close": 2475.56,"Volume": 8285670000.00},
      { "Date": new Date(2020, 3, 26),"Open": 2501.29,"High": 2637.01,"Low": 2500.72,"Close": 2630.07,"Adj Close": 2630.07,"Volume": 7753160000.00},
      { "Date": new Date(2020, 3, 27),"Open": 2555.87,"High": 2615.91,"Low": 2520.02,"Close": 2541.47,"Adj Close": 2541.47,"Volume": 6194330000.00},
      { "Date": new Date(2020, 3, 30),"Open": 2558.98,"High": 2631.80,"Low": 2545.28,"Close": 2626.65,"Adj Close": 2626.65,"Volume": 5746220000.00},
      { "Date": new Date(2020, 3, 31),"Open": 2614.69,"High": 2641.39,"Low": 2571.15,"Close": 2584.59,"Adj Close": 2584.59,"Volume": 6568290000.00},
      { "Date": new Date(2020, 4, 1),"Open": 2498.08,"High": 2522.75,"Low": 2447.49,"Close": 2470.50,"Adj Close": 2470.50,"Volume": 5947900000.00},
      { "Date": new Date(2020, 4, 2),"Open": 2458.54,"High": 2533.22,"Low": 2455.79,"Close": 2526.90,"Adj Close": 2526.90,"Volume": 6454990000.00},
      { "Date": new Date(2020, 4, 3),"Open": 2514.92,"High": 2538.18,"Low": 2459.96,"Close": 2488.65,"Adj Close": 2488.65,"Volume": 6087190000.00},
      { "Date": new Date(2020, 4, 6),"Open": 2578.28,"High": 2676.85,"Low": 2574.57,"Close": 2663.68,"Adj Close": 2663.68,"Volume": 6391860000.00},
      { "Date": new Date(2020, 4, 7),"Open": 2738.65,"High": 2756.89,"Low": 2657.67,"Close": 2659.41,"Adj Close": 2659.41,"Volume": 7040720000.00},
      { "Date": new Date(2020, 4, 8),"Open": 2685.00,"High": 2760.75,"Low": 2663.30,"Close": 2749.98,"Adj Close": 2749.98,"Volume": 5856370000.00},
      { "Date": new Date(2020, 4, 9),"Open": 2776.99,"High": 2818.57,"Low": 2762.36,"Close": 2789.82,"Adj Close": 2789.82,"Volume": 7880140000.00},
      { "Date": new Date(2020, 4, 13),"Open": 2782.46,"High": 2782.46,"Low": 2721.17,"Close": 2761.63,"Adj Close": 2761.63,"Volume": 5274310000.00},
      { "Date": new Date(2020, 4, 14),"Open": 2805.10,"High": 2851.85,"Low": 2805.10,"Close": 2846.06,"Adj Close": 2846.06,"Volume": 5567400000.00},
      { "Date": new Date(2020, 4, 15),"Open": 2795.64,"High": 2801.88,"Low": 2761.54,"Close": 2783.36,"Adj Close": 2783.36,"Volume": 5203390000.00},
      { "Date": new Date(2020, 4, 16),"Open": 2799.34,"High": 2806.51,"Low": 2764.32,"Close": 2799.55,"Adj Close": 2799.55,"Volume": 5179990000.00},
      { "Date": new Date(2020, 4, 17),"Open": 2842.43,"High": 2879.22,"Low": 2830.88,"Close": 2874.56,"Adj Close": 2874.56,"Volume": 5792140000.00},
      { "Date": new Date(2020, 4, 20),"Open": 2845.62,"High": 2868.98,"Low": 2820.43,"Close": 2823.16,"Adj Close": 2823.16,"Volume": 5220160000.00},
      { "Date": new Date(2020, 4, 21),"Open": 2784.81,"High": 2785.54,"Low": 2727.10,"Close": 2736.56,"Adj Close": 2736.56,"Volume": 5075830000.00},
      { "Date": new Date(2020, 4, 22),"Open": 2787.89,"High": 2815.10,"Low": 2775.95,"Close": 2799.31,"Adj Close": 2799.31,"Volume": 5049660000.00},
      { "Date": new Date(2020, 4, 23),"Open": 2810.42,"High": 2844.90,"Low": 2794.26,"Close": 2797.80,"Adj Close": 2797.80,"Volume": 5756520000.00},
      { "Date": new Date(2020, 4, 24),"Open": 2812.64,"High": 2842.71,"Low": 2791.76,"Close": 2836.74,"Adj Close": 2836.74,"Volume": 5374480000.00},
      { "Date": new Date(2020, 4, 27),"Open": 2854.65,"High": 2887.72,"Low": 2852.89,"Close": 2878.48,"Adj Close": 2878.48,"Volume": 5194260000.00},
      { "Date": new Date(2020, 4, 28),"Open": 2909.96,"High": 2921.15,"Low": 2860.71,"Close": 2863.39,"Adj Close": 2863.39,"Volume": 5672880000.00},
      { "Date": new Date(2020, 4, 29),"Open": 2918.46,"High": 2954.86,"Low": 2912.16,"Close": 2939.51,"Adj Close": 2939.51,"Volume": 6620140000.00},
      { "Date": new Date(2020, 4, 30),"Open": 2930.91,"High": 2930.91,"Low": 2892.47,"Close": 2912.43,"Adj Close": 2912.43,"Volume": 6523120000.00},
      { "Date": new Date(2020, 5, 1),"Open": 2869.09,"High": 2869.09,"Low": 2821.61,"Close": 2830.71,"Adj Close": 2830.71,"Volume": 4753160000.00},
      { "Date": new Date(2020, 5, 4),"Open": 2815.01,"High": 2844.24,"Low": 2797.85,"Close": 2842.74,"Adj Close": 2842.74,"Volume": 4723140000.00},
      { "Date": new Date(2020, 5, 5),"Open": 2868.88,"High": 2898.23,"Low": 2863.55,"Close": 2868.44,"Adj Close": 2868.44,"Volume": 5129590000.00},
      { "Date": new Date(2020, 5, 6),"Open": 2883.14,"High": 2891.11,"Low": 2847.65,"Close": 2848.42,"Adj Close": 2848.42,"Volume": 4861920000.00},
      { "Date": new Date(2020, 5, 7),"Open": 2878.26,"High": 2901.92,"Low": 2876.48,"Close": 2881.19,"Adj Close": 2881.19,"Volume": 5164640000.00},
      { "Date": new Date(2020, 5, 8),"Open": 2908.83,"High": 2932.16,"Low": 2902.88,"Close": 2929.80,"Adj Close": 2929.80,"Volume": 4857160000.00},
      { "Date": new Date(2020, 5, 11),"Open": 2915.46,"High": 2944.25,"Low": 2903.44,"Close": 2930.19,"Adj Close": 2930.19,"Volume": 4807320000.00},
      { "Date": new Date(2020, 5, 12),"Open": 2939.50,"High": 2945.82,"Low": 2869.59,"Close": 2870.12,"Adj Close": 2870.12,"Volume": 5107710000.00},
      { "Date": new Date(2020, 5, 13),"Open": 2865.86,"High": 2874.14,"Low": 2793.15,"Close": 2820.00,"Adj Close": 2820.00,"Volume": 6143130000.00},
      { "Date": new Date(2020, 5, 14),"Open": 2794.54,"High": 2852.80,"Low": 2766.64,"Close": 2852.50,"Adj Close": 2852.50,"Volume": 5641920000.00},
      { "Date": new Date(2020, 5, 15),"Open": 2829.95,"High": 2865.01,"Low": 2816.78,"Close": 2863.70,"Adj Close": 2863.70,"Volume": 5477040000.00},
      { "Date": new Date(2020, 5, 18),"Open": 2913.86,"High": 2968.09,"Low": 2913.86,"Close": 2953.91,"Adj Close": 2953.91,"Volume": 6364290000.00},
      { "Date": new Date(2020, 5, 19),"Open": 2948.59,"High": 2964.21,"Low": 2922.35,"Close": 2922.94,"Adj Close": 2922.94,"Volume": 4969330000.00},
      { "Date": new Date(2020, 5, 20),"Open": 2953.63,"High": 2980.29,"Low": 2953.63,"Close": 2971.61,"Adj Close": 2971.61,"Volume": 4992970000.00},
      { "Date": new Date(2020, 5, 21),"Open": 2969.95,"High": 2978.50,"Low": 2938.57,"Close": 2948.51,"Adj Close": 2948.51,"Volume": 4966940000.00},
      { "Date": new Date(2020, 5, 22),"Open": 2948.05,"High": 2956.76,"Low": 2933.59,"Close": 2955.45,"Adj Close": 2955.45,"Volume": 3952800000.00},
      { "Date": new Date(2020, 5, 26),"Open": 3004.08,"High": 3021.72,"Low": 2988.17,"Close": 2991.77,"Adj Close": 2991.77,"Volume": 5837060000.00},
      { "Date": new Date(2020, 5, 27),"Open": 3015.65,"High": 3036.25,"Low": 2969.75,"Close": 3036.13,"Adj Close": 3036.13,"Volume": 6371230000.00},
      { "Date": new Date(2020, 5, 28),"Open": 3046.61,"High": 3068.67,"Low": 3023.40,"Close": 3029.73,"Adj Close": 3029.73,"Volume": 5402670000.00},
      { "Date": new Date(2020, 5, 29),"Open": 3025.17,"High": 3049.17,"Low": 2998.61,"Close": 3044.31,"Adj Close": 3044.31,"Volume": 7275080000.00},
      { "Date": new Date(2020, 6, 1),"Open": 3038.78,"High": 3062.18,"Low": 3031.54,"Close": 3055.73,"Adj Close": 3055.73,"Volume": 4673410000.00},
      { "Date": new Date(2020, 6, 2),"Open": 3064.78,"High": 3081.07,"Low": 3051.64,"Close": 3080.82,"Adj Close": 3080.82,"Volume": 5187230000.00},
      { "Date": new Date(2020, 6, 3),"Open": 3098.90,"High": 3130.94,"Low": 3098.90,"Close": 3122.87,"Adj Close": 3122.87,"Volume": 5989560000.00},
      { "Date": new Date(2020, 6, 4),"Open": 3111.56,"High": 3128.91,"Low": 3090.41,"Close": 3112.35,"Adj Close": 3112.35,"Volume": 6428130000.00},
      { "Date": new Date(2020, 6, 5),"Open": 3163.84,"High": 3211.72,"Low": 3163.84,"Close": 3193.93,"Adj Close": 3193.93,"Volume": 8617590000.00},
      { "Date": new Date(2020, 6, 8),"Open": 3199.92,"High": 3233.13,"Low": 3196.00,"Close": 3232.39,"Adj Close": 3232.39,"Volume": 8437380000.00},
      { "Date": new Date(2020, 6, 9),"Open": 3213.32,"High": 3222.71,"Low": 3193.11,"Close": 3207.18,"Adj Close": 3207.18,"Volume": 6382620000.00},
      { "Date": new Date(2020, 6, 10),"Open": 3213.42,"High": 3223.27,"Low": 3181.49,"Close": 3190.14,"Adj Close": 3190.14,"Volume": 6570840000.00},
      { "Date": new Date(2020, 6, 11),"Open": 3123.53,"High": 3123.53,"Low": 2999.49,"Close": 3002.10,"Adj Close": 3002.10,"Volume": 7018890000.00},
      { "Date": new Date(2020, 6, 12),"Open": 3071.04,"High": 3088.42,"Low": 2984.47,"Close": 3041.31,"Adj Close": 3041.31,"Volume": 5832250000.00},
      { "Date": new Date(2020, 6, 15),"Open": 2993.76,"High": 3079.76,"Low": 2965.66,"Close": 3066.59,"Adj Close": 3066.59,"Volume": 5740660000.00},
      { "Date": new Date(2020, 6, 16),"Open": 3131.00,"High": 3153.45,"Low": 3076.06,"Close": 3124.74,"Adj Close": 3124.74,"Volume": 5829240000.00},
      { "Date": new Date(2020, 6, 17),"Open": 3136.13,"High": 3141.16,"Low": 3108.03,"Close": 3113.49,"Adj Close": 3113.49,"Volume": 4549390000.00},
      { "Date": new Date(2020, 6, 18),"Open": 3101.64,"High": 3120.00,"Low": 3093.51,"Close": 3115.34,"Adj Close": 3115.34,"Volume": 4429030000.00},
      { "Date": new Date(2020, 6, 19),"Open": 3140.29,"High": 3155.53,"Low": 3083.11,"Close": 3097.74,"Adj Close": 3097.74,"Volume": 8327780000.00},
      { "Date": new Date(2020, 6, 22),"Open": 3094.42,"High": 3120.92,"Low": 3079.39,"Close": 3117.86,"Adj Close": 3117.86,"Volume": 4665380000.00},
      { "Date": new Date(2020, 6, 23),"Open": 3138.70,"High": 3154.90,"Low": 3127.12,"Close": 3131.29,"Adj Close": 3131.29,"Volume": 4704830000.00},
      { "Date": new Date(2020, 6, 24),"Open": 3114.40,"High": 3115.01,"Low": 3032.13,"Close": 3050.33,"Adj Close": 3050.33,"Volume": 5587200000.00},
      { "Date": new Date(2020, 6, 25),"Open": 3046.60,"High": 3086.25,"Low": 3024.01,"Close": 3083.76,"Adj Close": 3083.76,"Volume": 4815420000.00},
      { "Date": new Date(2020, 6, 26),"Open": 3073.20,"High": 3073.73,"Low": 3004.63,"Close": 3009.05,"Adj Close": 3009.05,"Volume": 8098120000.00},
      { "Date": new Date(2020, 6, 29),"Open": 3018.59,"High": 3053.89,"Low": 2999.74,"Close": 3053.24,"Adj Close": 3053.24,"Volume": 4462770000.00},
      { "Date": new Date(2020, 6, 30),"Open": 3050.20,"High": 3111.51,"Low": 3047.83,"Close": 3100.29,"Adj Close": 3100.29,"Volume": 4696280000.00},
      { "Date": new Date(2020, 7, 1),"Open": 3105.92,"High": 3128.44,"Low": 3101.17,"Close": 3115.86,"Adj Close": 3115.86,"Volume": 4443130000.00},
      { "Date": new Date(2020, 7, 2),"Open": 3143.64,"High": 3165.81,"Low": 3124.52,"Close": 3130.01,"Adj Close": 3130.01,"Volume": 4190830000.00},
      { "Date": new Date(2020, 7, 6),"Open": 3155.29,"High": 3182.59,"Low": 3155.29,"Close": 3179.72,"Adj Close": 3179.72,"Volume": 4736450000.00},
      { "Date": new Date(2020, 7, 7),"Open": 3166.44,"High": 3184.15,"Low": 3142.93,"Close": 3145.32,"Adj Close": 3145.32,"Volume": 4563700000.00},
      { "Date": new Date(2020, 7, 8),"Open": 3153.07,"High": 3171.80,"Low": 3136.53,"Close": 3169.94,"Adj Close": 3169.94,"Volume": 4927700000.00},
      { "Date": new Date(2020, 7, 9),"Open": 3176.17,"High": 3179.78,"Low": 3115.70,"Close": 3152.05,"Adj Close": 3152.05,"Volume": 4829020000.00},
      { "Date": new Date(2020, 7, 10),"Open": 3152.47,"High": 3186.82,"Low": 3136.22,"Close": 3185.04,"Adj Close": 3185.04,"Volume": 4515340000.00},
      { "Date": new Date(2020, 7, 13),"Open": 3205.08,"High": 3235.32,"Low": 3149.43,"Close": 3155.22,"Adj Close": 3155.22,"Volume": 4890780000.00},
      { "Date": new Date(2020, 7, 14),"Open": 3141.11,"High": 3200.95,"Low": 3127.66,"Close": 3197.52,"Adj Close": 3197.52,"Volume": 4476170000.00},
      { "Date": new Date(2020, 7, 15),"Open": 3225.98,"High": 3238.28,"Low": 3200.76,"Close": 3226.56,"Adj Close": 3226.56,"Volume": 4669760000.00},
      { "Date": new Date(2020, 7, 16),"Open": 3208.36,"High": 3220.39,"Low": 3198.59,"Close": 3215.57,"Adj Close": 3215.57,"Volume": 3961230000.00},
      { "Date": new Date(2020, 7, 17),"Open": 3224.21,"High": 3233.52,"Low": 3205.65,"Close": 3224.73,"Adj Close": 3224.73,"Volume": 3993830000.00},
      { "Date": new Date(2020, 7, 20),"Open": 3224.29,"High": 3258.61,"Low": 3215.16,"Close": 3251.84,"Adj Close": 3251.84,"Volume": 3971200000.00},
      { "Date": new Date(2020, 7, 21),"Open": 3268.52,"High": 3277.29,"Low": 3247.77,"Close": 3257.30,"Adj Close": 3257.30,"Volume": 4547960000.00},
      { "Date": new Date(2020, 7, 22),"Open": 3254.86,"High": 3279.32,"Low": 3253.10,"Close": 3276.02,"Adj Close": 3276.02,"Volume": 4255190000.00},
      { "Date": new Date(2020, 7, 23),"Open": 3271.64,"High": 3279.99,"Low": 3222.66,"Close": 3235.66,"Adj Close": 3235.66,"Volume": 4290460000.00},
      { "Date": new Date(2020, 7, 24),"Open": 3218.58,"High": 3227.26,"Low": 3200.05,"Close": 3215.63,"Adj Close": 3215.63,"Volume": 3894900000.00},
      { "Date": new Date(2020, 7, 27),"Open": 3219.84,"High": 3241.43,"Low": 3214.25,"Close": 3239.41,"Adj Close": 3239.41,"Volume": 3963910000.00},
      { "Date": new Date(2020, 7, 28),"Open": 3234.27,"High": 3243.72,"Low": 3216.17,"Close": 3218.44,"Adj Close": 3218.44,"Volume": 4027890000.00},
      { "Date": new Date(2020, 7, 29),"Open": 3227.22,"High": 3264.74,"Low": 3227.22,"Close": 3258.44,"Adj Close": 3258.44,"Volume": 4676300000.00},
      { "Date": new Date(2020, 7, 30),"Open": 3231.76,"High": 3250.92,"Low": 3204.13,"Close": 3246.22,"Adj Close": 3246.22,"Volume": 4254010000.00},
      { "Date": new Date(2020, 7, 31),"Open": 3270.45,"High": 3272.17,"Low": 3220.26,"Close": 3271.12,"Adj Close": 3271.12,"Volume": 5117260000.00},
      { "Date": new Date(2020, 8, 3),"Open": 3288.26,"High": 3302.73,"Low": 3284.53,"Close": 3294.61,"Adj Close": 3294.61,"Volume": 4643640000.00},
      { "Date": new Date(2020, 8, 4),"Open": 3289.92,"High": 3306.84,"Low": 3286.37,"Close": 3306.51,"Adj Close": 3306.51,"Volume": 4621670000.00},
      { "Date": new Date(2020, 8, 5),"Open": 3317.37,"High": 3330.77,"Low": 3317.37,"Close": 3327.77,"Adj Close": 3327.77,"Volume": 4732220000.00},
      { "Date": new Date(2020, 8, 6),"Open": 3323.17,"High": 3351.03,"Low": 3318.14,"Close": 3349.16,"Adj Close": 3349.16,"Volume": 4267490000.00},
      { "Date": new Date(2020, 8, 7),"Open": 3340.05,"High": 3352.54,"Low": 3328.72,"Close": 3351.28,"Adj Close": 3351.28,"Volume": 4104860000.00},
      { "Date": new Date(2020, 8, 10),"Open": 3356.04,"High": 3363.29,"Low": 3335.44,"Close": 3360.47,"Adj Close": 3360.47,"Volume": 4318570000.00},
      { "Date": new Date(2020, 8, 11),"Open": 3370.34,"High": 3381.01,"Low": 3326.44,"Close": 3333.69,"Adj Close": 3333.69,"Volume": 5087650000.00},
      { "Date": new Date(2020, 8, 12),"Open": 3355.46,"High": 3387.89,"Low": 3355.46,"Close": 3380.35,"Adj Close": 3380.35,"Volume": 3768560000.00},
      { "Date": new Date(2020, 8, 13),"Open": 3372.95,"High": 3387.24,"Low": 3363.35,"Close": 3373.43,"Adj Close": 3373.43,"Volume": 3648810000.00},
      { "Date": new Date(2020, 8, 14),"Open": 3368.66,"High": 3378.51,"Low": 3361.64,"Close": 3372.85,"Adj Close": 3372.85,"Volume": 3193400000.00},
      { "Date": new Date(2020, 8, 17),"Open": 3380.86,"High": 3387.59,"Low": 3379.22,"Close": 3381.99,"Adj Close": 3381.99,"Volume": 3671290000.00},
      { "Date": new Date(2020, 8, 18),"Open": 3387.04,"High": 3395.06,"Low": 3370.15,"Close": 3389.78,"Adj Close": 3389.78,"Volume": 3881310000.00},
      { "Date": new Date(2020, 8, 19),"Open": 3392.51,"High": 3399.54,"Low": 3369.66,"Close": 3374.85,"Adj Close": 3374.85,"Volume": 3884480000.00},
      { "Date": new Date(2020, 8, 20),"Open": 3360.48,"High": 3390.80,"Low": 3354.69,"Close": 3385.51,"Adj Close": 3385.51,"Volume": 3642850000.00},
      { "Date": new Date(2020, 8, 21),"Open": 3386.01,"High": 3399.96,"Low": 3379.31,"Close": 3397.16,"Adj Close": 3397.16,"Volume": 3705420000.00},
      { "Date": new Date(2020, 8, 24),"Open": 3418.09,"High": 3432.09,"Low": 3413.13,"Close": 3431.28,"Adj Close": 3431.28,"Volume": 3728690000.00},
      { "Date": new Date(2020, 8, 25),"Open": 3435.95,"High": 3444.21,"Low": 3425.84,"Close": 3443.62,"Adj Close": 3443.62,"Volume": 3619300000.00},
      { "Date": new Date(2020, 8, 26),"Open": 3449.97,"High": 3481.07,"Low": 3444.15,"Close": 3478.73,"Adj Close": 3478.73,"Volume": 3754360000.00},
      { "Date": new Date(2020, 8, 27),"Open": 3485.14,"High": 3501.38,"Low": 3468.35,"Close": 3484.55,"Adj Close": 3484.55,"Volume": 3929560000.00},
      { "Date": new Date(2020, 8, 28),"Open": 3494.69,"High": 3509.23,"Low": 3484.32,"Close": 3508.01,"Adj Close": 3508.01,"Volume": 3855880000.00},
      { "Date": new Date(2020, 8, 31),"Open": 3509.73,"High": 3514.77,"Low": 3493.25,"Close": 3500.31,"Adj Close": 3500.31,"Volume": 4342290000.00},
      { "Date": new Date(2020, 9, 1),"Open": 3507.44,"High": 3528.03,"Low": 3494.60,"Close": 3526.65,"Adj Close": 3526.65,"Volume": 4083110000.00},
      { "Date": new Date(2020, 9, 2),"Open": 3543.76,"High": 3588.11,"Low": 3535.23,"Close": 3580.84,"Adj Close": 3580.84,"Volume": 4285190000.00},
      { "Date": new Date(2020, 9, 3),"Open": 3564.74,"High": 3564.85,"Low": 3427.41,"Close": 3455.06,"Adj Close": 3455.06,"Volume": 4898680000.00},
      { "Date": new Date(2020, 9, 4),"Open": 3453.60,"High": 3479.15,"Low": 3349.63,"Close": 3426.96,"Adj Close": 3426.96,"Volume": 4431440000.00},
      { "Date": new Date(2020, 9, 8),"Open": 3371.88,"High": 3379.97,"Low": 3329.27,"Close": 3331.84,"Adj Close": 3331.84,"Volume": 4665600000.00},
      { "Date": new Date(2020, 9, 9),"Open": 3369.82,"High": 3424.77,"Low": 3366.84,"Close": 3398.96,"Adj Close": 3398.96,"Volume": 3920830000.00},
      { "Date": new Date(2020, 9, 10),"Open": 3412.56,"High": 3425.55,"Low": 3329.25,"Close": 3339.19,"Adj Close": 3339.19,"Volume": 4192250000.00},
      { "Date": new Date(2020, 9, 11),"Open": 3352.70,"High": 3368.95,"Low": 3310.47,"Close": 3340.97,"Adj Close": 3340.97,"Volume": 3704450000.00},
      { "Date": new Date(2020, 9, 14),"Open": 3363.56,"High": 3402.93,"Low": 3363.56,"Close": 3383.54,"Adj Close": 3383.54,"Volume": 3832130000.00},
      { "Date": new Date(2020, 9, 15),"Open": 3407.73,"High": 3419.48,"Low": 3389.25,"Close": 3401.20,"Adj Close": 3401.20,"Volume": 4051460000.00},
      { "Date": new Date(2020, 9, 16),"Open": 3411.23,"High": 3428.92,"Low": 3384.45,"Close": 3385.49,"Adj Close": 3385.49,"Volume": 4710030000.00},
      { "Date": new Date(2020, 9, 17),"Open": 3346.86,"High": 3375.17,"Low": 3328.82,"Close": 3357.01,"Adj Close": 3357.01,"Volume": 4371940000.00},
      { "Date": new Date(2020, 9, 18),"Open": 3357.38,"High": 3362.27,"Low": 3292.40,"Close": 3319.47,"Adj Close": 3319.47,"Volume": 7068700000.00},
      { "Date": new Date(2020, 9, 21),"Open": 3285.57,"High": 3285.57,"Low": 3229.10,"Close": 3281.06,"Adj Close": 3281.06,"Volume": 4828350000.00},
      { "Date": new Date(2020, 9, 22),"Open": 3295.75,"High": 3320.31,"Low": 3270.95,"Close": 3315.57,"Adj Close": 3315.57,"Volume": 3963300000.00},
      { "Date": new Date(2020, 9, 23),"Open": 3320.11,"High": 3323.35,"Low": 3232.57,"Close": 3236.92,"Adj Close": 3236.92,"Volume": 4364500000.00},
      { "Date": new Date(2020, 9, 24),"Open": 3226.14,"High": 3278.70,"Low": 3209.45,"Close": 3246.59,"Adj Close": 3246.59,"Volume": 4599470000.00},
      { "Date": new Date(2020, 9, 25),"Open": 3236.66,"High": 3306.88,"Low": 3228.44,"Close": 3298.46,"Adj Close": 3298.46,"Volume": 3792220000.00},
      { "Date": new Date(2020, 9, 28),"Open": 3333.90,"High": 3360.74,"Low": 3332.91,"Close": 3351.60,"Adj Close": 3351.60,"Volume": 3946060000.00},
      { "Date": new Date(2020, 9, 29),"Open": 3350.92,"High": 3357.92,"Low": 3327.54,"Close": 3335.47,"Adj Close": 3335.47,"Volume": 3651880000.00},
      { "Date": new Date(2020, 9, 30),"Open": 3341.21,"High": 3393.56,"Low": 3340.47,"Close": 3363.00,"Adj Close": 3363.00,"Volume": 4722530000.00},
      { "Date": new Date(2020, 10, 1),"Open": 3385.87,"High": 3397.18,"Low": 3361.39,"Close": 3380.80,"Adj Close": 3380.80,"Volume": 4070530000.00},
      { "Date": new Date(2020, 10, 2),"Open": 3338.94,"High": 3369.10,"Low": 3323.69,"Close": 3348.42,"Adj Close": 3348.42,"Volume": 3961550000.00},
      { "Date": new Date(2020, 10, 5),"Open": 3367.27,"High": 3409.57,"Low": 3367.27,"Close": 3408.60,"Adj Close": 3408.60,"Volume": 3686920000.00},
      { "Date": new Date(2020, 10, 6),"Open": 3408.74,"High": 3431.56,"Low": 3354.54,"Close": 3360.97,"Adj Close": 3360.97,"Volume": 4443380000.00},
      { "Date": new Date(2020, 10, 7),"Open": 3384.56,"High": 3426.26,"Low": 3384.56,"Close": 3419.44,"Adj Close": 3419.44,"Volume": 3807830000.00},
      { "Date": new Date(2020, 10, 8),"Open": 3434.28,"High": 3447.28,"Low": 3428.15,"Close": 3446.83,"Adj Close": 3446.83,"Volume": 3856190000.00},
      { "Date": new Date(2020, 10, 9),"Open": 3459.67,"High": 3482.34,"Low": 3458.07,"Close": 3477.14,"Adj Close": 3477.14,"Volume": 3939060000.00},
      { "Date": new Date(2020, 10, 12),"Open": 3500.02,"High": 3549.85,"Low": 3499.61,"Close": 3534.22,"Adj Close": 3534.22,"Volume": 3428970000.00},
      { "Date": new Date(2020, 10, 13),"Open": 3534.01,"High": 3534.01,"Low": 3500.86,"Close": 3511.93,"Adj Close": 3511.93,"Volume": 3605150000.00},
      { "Date": new Date(2020, 10, 14),"Open": 3515.47,"High": 3527.94,"Low": 3480.55,"Close": 3488.67,"Adj Close": 3488.67,"Volume": 3840630000.00},
      { "Date": new Date(2020, 10, 15),"Open": 3453.72,"High": 3489.08,"Low": 3440.89,"Close": 3483.34,"Adj Close": 3483.34,"Volume": 3717640000.00},
      { "Date": new Date(2020, 10, 16),"Open": 3493.50,"High": 3515.76,"Low": 3480.45,"Close": 3483.81,"Adj Close": 3483.81,"Volume": 4675890000.00},
      { "Date": new Date(2020, 10, 19),"Open": 3493.66,"High": 3502.42,"Low": 3419.93,"Close": 3426.92,"Adj Close": 3426.92,"Volume": 4086200000.00},
      { "Date": new Date(2020, 10, 20),"Open": 3439.38,"High": 3476.93,"Low": 3435.65,"Close": 3443.12,"Adj Close": 3443.12,"Volume": 3901260000.00},
      { "Date": new Date(2020, 10, 21),"Open": 3439.91,"High": 3464.86,"Low": 3433.06,"Close": 3435.56,"Adj Close": 3435.56,"Volume": 4097750000.00},
      { "Date": new Date(2020, 10, 22),"Open": 3438.50,"High": 3460.53,"Low": 3415.34,"Close": 3453.49,"Adj Close": 3453.49,"Volume": 4163630000.00},
      { "Date": new Date(2020, 10, 23),"Open": 3464.90,"High": 3466.46,"Low": 3440.45,"Close": 3465.39,"Adj Close": 3465.39,"Volume": 3646570000.00},
      { "Date": new Date(2020, 10, 26),"Open": 3441.42,"High": 3441.42,"Low": 3364.86,"Close": 3400.97,"Adj Close": 3400.97,"Volume": 3988080000.00},
      { "Date": new Date(2020, 10, 27),"Open": 3403.15,"High": 3409.51,"Low": 3388.71,"Close": 3390.68,"Adj Close": 3390.68,"Volume": 3946990000.00},
      { "Date": new Date(2020, 10, 28),"Open": 3342.48,"High": 3342.48,"Low": 3268.89,"Close": 3271.03,"Adj Close": 3271.03,"Volume": 5129860000.00},
      { "Date": new Date(2020, 10, 29),"Open": 3277.17,"High": 3341.05,"Low": 3259.82,"Close": 3310.11,"Adj Close": 3310.11,"Volume": 4903070000.00},
      { "Date": new Date(2020, 10, 30),"Open": 3293.59,"High": 3304.93,"Low": 3233.94,"Close": 3269.96,"Adj Close": 3269.96,"Volume": 4840450000.00},
      { "Date": new Date(2020, 11, 2),"Open": 3296.20,"High": 3330.14,"Low": 3279.74,"Close": 3310.24,"Adj Close": 3310.24,"Volume": 4310590000.00},
      { "Date": new Date(2020, 11, 3),"Open": 3336.25,"High": 3389.49,"Low": 3336.25,"Close": 3369.16,"Adj Close": 3369.16,"Volume": 4220070000.00},
      { "Date": new Date(2020, 11, 4),"Open": 3406.46,"High": 3486.25,"Low": 3405.17,"Close": 3443.44,"Adj Close": 3443.44,"Volume": 4783040000.00},
      { "Date": new Date(2020, 11, 5),"Open": 3485.74,"High": 3529.05,"Low": 3485.74,"Close": 3510.45,"Adj Close": 3510.45,"Volume": 4841190000.00},
      { "Date": new Date(2020, 11, 6),"Open": 3508.34,"High": 3521.58,"Low": 3484.34,"Close": 3509.44,"Adj Close": 3509.44,"Volume": 4833950000.00},
      { "Date": new Date(2020, 11, 9),"Open": 3583.04,"High": 3645.99,"Low": 3547.48,"Close": 3550.50,"Adj Close": 3550.50,"Volume": 8556610000.00},
      { "Date": new Date(2020, 11, 10),"Open": 3543.26,"High": 3557.22,"Low": 3511.91,"Close": 3545.53,"Adj Close": 3545.53,"Volume": 6024230000.00},
      { "Date": new Date(2020, 11, 11),"Open": 3563.22,"High": 3581.16,"Low": 3557.00,"Close": 3572.66,"Adj Close": 3572.66,"Volume": 4609970000.00},
      { "Date": new Date(2020, 11, 12),"Open": 3562.67,"High": 3569.02,"Low": 3518.58,"Close": 3537.01,"Adj Close": 3537.01,"Volume": 4890120000.00},
      { "Date": new Date(2020, 11, 13),"Open": 3552.57,"High": 3593.66,"Low": 3552.57,"Close": 3585.15,"Adj Close": 3585.15,"Volume": 4709670000.00},
      { "Date": new Date(2020, 11, 16),"Open": 3600.16,"High": 3628.51,"Low": 3600.16,"Close": 3626.91,"Adj Close": 3626.91,"Volume": 5281980000.00},
      { "Date": new Date(2020, 11, 17),"Open": 3610.31,"High": 3623.11,"Low": 3588.68,"Close": 3609.53,"Adj Close": 3609.53,"Volume": 4799570000.00},
      { "Date": new Date(2020, 11, 18),"Open": 3612.09,"High": 3619.09,"Low": 3567.33,"Close": 3567.79,"Adj Close": 3567.79,"Volume": 5274450000.00},
      { "Date": new Date(2020, 11, 19),"Open": 3559.41,"High": 3585.22,"Low": 3543.84,"Close": 3581.87,"Adj Close": 3581.87,"Volume": 4347200000.00},
      { "Date": new Date(2020, 11, 20),"Open": 3579.31,"High": 3581.23,"Low": 3556.85,"Close": 3557.54,"Adj Close": 3557.54,"Volume": 4218970000.00},
      { "Date": new Date(2020, 11, 23),"Open": 3566.82,"High": 3589.81,"Low": 3552.77,"Close": 3577.59,"Adj Close": 3577.59,"Volume": 5036290000.00},
      { "Date": new Date(2020, 11, 24),"Open": 3594.52,"High": 3642.31,"Low": 3594.52,"Close": 3635.41,"Adj Close": 3635.41,"Volume": 6267570000.00},
      { "Date": new Date(2020, 11, 25),"Open": 3635.50,"High": 3635.50,"Low": 3617.76,"Close": 3629.65,"Adj Close": 3629.65,"Volume": 4902560000.00},
      { "Date": new Date(2020, 11, 27),"Open": 3638.55,"High": 3644.31,"Low": 3629.33,"Close": 3638.35,"Adj Close": 3638.35,"Volume": 2778450000.00},
      { "Date": new Date(2020, 11, 30),"Open": 3634.18,"High": 3634.18,"Low": 3594.39,"Close": 3621.63,"Adj Close": 3621.63,"Volume": 6291400000.00},
      { "Date": new Date(2020, 12, 1),"Open": 3645.87,"High": 3678.45,"Low": 3645.87,"Close": 3662.45,"Adj Close": 3662.45,"Volume": 5403660000.00},
      { "Date": new Date(2020, 12, 2),"Open": 3653.78,"High": 3670.96,"Low": 3644.84,"Close": 3669.01,"Adj Close": 3669.01,"Volume": 5029620000.00},
      { "Date": new Date(2020, 12, 3),"Open": 3668.28,"High": 3682.73,"Low": 3657.17,"Close": 3666.72,"Adj Close": 3666.72,"Volume": 5091760000.00},
      { "Date": new Date(2020, 12, 4),"Open": 3670.94,"High": 3699.20,"Low": 3670.94,"Close": 3699.12,"Adj Close": 3699.12,"Volume": 5086370000.00},
      { "Date": new Date(2020, 12, 7),"Open": 3694.73,"High": 3697.41,"Low": 3678.88,"Close": 3691.96,"Adj Close": 3691.96,"Volume": 4788560000.00},
      { "Date": new Date(2020, 12, 8),"Open": 3683.05,"High": 3708.45,"Low": 3678.83,"Close": 3702.25,"Adj Close": 3702.25,"Volume": 4549670000.00},
      { "Date": new Date(2020, 12, 9),"Open": 3705.98,"High": 3712.39,"Low": 3660.54,"Close": 3672.82,"Adj Close": 3672.82,"Volume": 5209940000.00},
      { "Date": new Date(2020, 12, 10),"Open": 3659.13,"High": 3678.49,"Low": 3645.18,"Close": 3668.10,"Adj Close": 3668.10,"Volume": 4618240000.00},
      { "Date": new Date(2020, 12, 11),"Open": 3656.08,"High": 3665.91,"Low": 3633.40,"Close": 3663.46,"Adj Close": 3663.46,"Volume": 4367150000.00},
      { "Date": new Date(2020, 12, 14),"Open": 3675.27,"High": 3697.61,"Low": 3645.84,"Close": 3647.49,"Adj Close": 3647.49,"Volume": 4594920000.00},
      { "Date": new Date(2020, 12, 15),"Open": 3666.41,"High": 3695.29,"Low": 3659.62,"Close": 3694.62,"Adj Close": 3694.62,"Volume": 4360280000.00},
      { "Date": new Date(2020, 12, 16),"Open": 3696.25,"High": 3711.27,"Low": 3688.57,"Close": 3701.17,"Adj Close": 3701.17,"Volume": 4056950000.00},
      { "Date": new Date(2020, 12, 17),"Open": 3713.65,"High": 3725.12,"Low": 3710.87,"Close": 3722.48,"Adj Close": 3722.48,"Volume": 4184930000.00},
      { "Date": new Date(2020, 12, 18),"Open": 3722.39,"High": 3726.70,"Low": 3685.84,"Close": 3709.41,"Adj Close": 3709.41,"Volume": 7068340000.00},
      { "Date": new Date(2020, 12, 21),"Open": 3684.28,"High": 3702.90,"Low": 3636.48,"Close": 3694.92,"Adj Close": 3694.92,"Volume": 4732160000.00},
      { "Date": new Date(2020, 12, 22),"Open": 3698.08,"High": 3698.26,"Low": 3676.16,"Close": 3687.26,"Adj Close": 3687.26,"Volume": 4023940000.00},
      { "Date": new Date(2020, 12, 23),"Open": 3693.42,"High": 3711.24,"Low": 3689.28,"Close": 3690.01,"Adj Close": 3690.01,"Volume": 3772630000.00},
      { "Date": new Date(2020, 12, 24),"Open": 3694.03,"High": 3703.82,"Low": 3689.32,"Close": 3703.06,"Adj Close": 3703.06,"Volume": 1885090000.00},
      { "Date": new Date(2020, 12, 28),"Open": 3723.03,"High": 3740.51,"Low": 3723.03,"Close": 3735.36,"Adj Close": 3735.36,"Volume": 3527460000.00},
      { "Date": new Date(2020, 12, 29),"Open": 3750.01,"High": 3756.12,"Low": 3723.31,"Close": 3727.04,"Adj Close": 3727.04,"Volume": 3387030000.00},
      { "Date": new Date(2020, 12, 30),"Open": 3736.19,"High": 3744.63,"Low": 3730.21,"Close": 3732.04,"Adj Close": 3732.04,"Volume": 3145200000.00},
      { "Date": new Date(2020, 12, 31),"Open": 3733.27,"High": 3760.20,"Low": 3726.88,"Close": 3756.07,"Adj Close": 3756.07,"Volume": 3172510000.00},
      { "Date": new Date(2021, 1, 4),"Open": 3764.61,"High": 3769.99,"Low": 3662.71,"Close": 3700.65,"Adj Close": 3700.65,"Volume": 5006680000.00},
      { "Date": new Date(2021, 1, 5),"Open": 3698.02,"High": 3737.83,"Low": 3695.07,"Close": 3726.86,"Adj Close": 3726.86,"Volume": 4582620000.00},
      { "Date": new Date(2021, 1, 6),"Open": 3712.20,"High": 3783.04,"Low": 3705.34,"Close": 3748.14,"Adj Close": 3748.14,"Volume": 6049970000.00},
      { "Date": new Date(2021, 1, 7),"Open": 3764.71,"High": 3811.55,"Low": 3764.71,"Close": 3803.79,"Adj Close": 3803.79,"Volume": 5080870000.00},
      { "Date": new Date(2021, 1, 8),"Open": 3815.05,"High": 3826.69,"Low": 3783.60,"Close": 3824.68,"Adj Close": 3824.68,"Volume": 4764180000.00},
      { "Date": new Date(2021, 1, 11),"Open": 3803.14,"High": 3817.86,"Low": 3789.02,"Close": 3799.61,"Adj Close": 3799.61,"Volume": 4450500000.00},
      { "Date": new Date(2021, 1, 12),"Open": 3801.62,"High": 3810.78,"Low": 3776.51,"Close": 3801.19,"Adj Close": 3801.19,"Volume": 4977210000.00},
      { "Date": new Date(2021, 1, 13),"Open": 3802.23,"High": 3820.96,"Low": 3791.50,"Close": 3809.84,"Adj Close": 3809.84,"Volume": 4590420000.00},
      { "Date": new Date(2021, 1, 14),"Open": 3814.98,"High": 3823.60,"Low": 3792.86,"Close": 3795.54,"Adj Close": 3795.54,"Volume": 5180140000.00},
      { "Date": new Date(2021, 1, 15),"Open": 3788.73,"High": 3788.73,"Low": 3749.62,"Close": 3768.25,"Adj Close": 3768.25,"Volume": 5353060000.00},
      { "Date": new Date(2021, 1, 19),"Open": 3781.88,"High": 3804.53,"Low": 3780.37,"Close": 3798.91,"Adj Close": 3798.91,"Volume": 4982940000.00},
      { "Date": new Date(2021, 1, 20),"Open": 3816.22,"High": 3859.75,"Low": 3816.22,"Close": 3851.85,"Adj Close": 3851.85,"Volume": 4551790000.00},
      { "Date": new Date(2021, 1, 21),"Open": 3857.46,"High": 3861.45,"Low": 3845.05,"Close": 3853.07,"Adj Close": 3853.07,"Volume": 4484460000.00},
      { "Date": new Date(2021, 1, 22),"Open": 3844.24,"High": 3852.31,"Low": 3830.41,"Close": 3841.47,"Adj Close": 3841.47,"Volume": 5080430000.00},
      { "Date": new Date(2021, 1, 25),"Open": 3851.68,"High": 3859.23,"Low": 3797.16,"Close": 3855.36,"Adj Close": 3855.36,"Volume": 6955860000.00},
      { "Date": new Date(2021, 1, 26),"Open": 3862.96,"High": 3870.90,"Low": 3847.78,"Close": 3849.62,"Adj Close": 3849.62,"Volume": 6029090000.00},
      { "Date": new Date(2021, 1, 27),"Open": 3836.83,"High": 3836.83,"Low": 3732.48,"Close": 3750.77,"Adj Close": 3750.77,"Volume": 9878040000.00},
      { "Date": new Date(2021, 1, 28),"Open": 3755.75,"High": 3830.50,"Low": 3755.75,"Close": 3787.38,"Adj Close": 3787.38,"Volume": 6937960000.00},
      { "Date": new Date(2021, 1, 29),"Open": 3740.05,"High": 3750.05,"Low": 3630.12,"Close": 3741.24,"Adj Close": 3741.24,"Volume": 6612570000.00}
      ];
  }
  
}