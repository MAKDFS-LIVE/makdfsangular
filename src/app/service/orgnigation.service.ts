import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
function _window():any {
  return window;
}
@Injectable({
  providedIn: 'root'
})
export class OrgnigationService {
  constructor(private http:HttpClient) { }
  private baseUrl:string = environment.baseUrl;
  private imgurl:string = environment.imgurl;
  private api:string = environment.api;

  get nativeWindow():any{
    return _window();
  }

  
  GetLogin(data:any){
    return this.http.post(`${this.baseUrl}/login`,data);
  }
  getCurrencyExchange(id:any,key:any){
    //return this.http.get(`${this.api}id=`+id+`&key=`+key);
    var url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page="+key+"&page=1&sparkline=false&locale=en";
    return this.http.get(`${url}`);
  }
  getCurrencyValue(id:any,key:any){
    return this.http.get(`${this.api}id=`+id+`&key=`+key);
  }
  savCoins(data:any){
    return this.http.post(`${this.baseUrl}/coins`,data);
  }  
  getCoins(){
    return this.http.get(`${this.baseUrl}/coins`);
  }
  getUserByEmail(email:any,contact:any,name:any,userid:any){
    return this.http.get(`${this.baseUrl}/useremail/`+email+`/`+contact+`/`+name+`/`+userid);
  }

  saveTredHistry(data:any){
    return this.http.post(`${this.baseUrl}/treadehistry`,data);
  }
  tredHistry(id:any,curency:any){
    return this.http.get(`${this.baseUrl}/treadehistry/`+id+`/`+curency);
  }
  tredHistryAll(id:any){
    return this.http.get(`${this.baseUrl}/treadehistry/`+id);
  }
  tredAllHistry(id:any){
    return this.http.get(`${this.baseUrl}/treadeallhistry/`+id);
  }
  pendingHistry(){
    return this.http.get(`${this.baseUrl}/treadependinghistry`);
  }

  getBlog(){
    return this.http.get(`${this.baseUrl}/blog`);
  }

  cuntryCurency(usd:any){
    var curency = localStorage.getItem("countrycurency");
    if(curency=="USD"){
      return "$"+ Number(usd).toFixed(4);
    }
    if(curency=="INR"){
      var inr:any = localStorage.getItem("inr");
      return "₹"+ (usd * inr).toFixed(3);
    }
    return "";
  }

  
  
  saveHistry(data:any){
    return this.http.post(`${this.baseUrl}/histry`,data);
  }
  sureUpdateUser(data:any){
    return this.http.post(`${this.baseUrl}/user`,data);
  }
  saveUser(data:any){
    return this.http.post(`${this.baseUrl}/saveuser`,data);
  }
  updateUser(num:any){
    return this.http.post(`${this.baseUrl}/updateprofile`,num);
  }
  saveAccount(data:any){
    return this.http.post(`${this.baseUrl}/account`,data);
  }
  getAccountById(id:any){
    return this.http.get(`${this.baseUrl}/account/`+id);
  }
  deleteAccount(uid:any){
    return this.http.delete(`${this.baseUrl}/account/`+uid);
  }
  getWalletByExchange(id:any,exchange:any){
    return this.http.get(`${this.baseUrl}/other/`+id+`/`+exchange);
  }
  saveOtherWallet(data:any){
    return this.http.post(`${this.baseUrl}/other`,data);
  }
  savePayment(data:any){
    return this.http.post(`${this.baseUrl}/payment`,data);
  }
  getSelfPayment(id:any){
    return this.http.get(`${this.baseUrl}/payment/`+id);
  }
  getAllPayment(id:any,amount:any){
    return this.http.get(`${this.baseUrl}/allpayment/`+id+`/`+amount);
  }
  saveTransaction(data:any){
    return this.http.post(`${this.baseUrl}/transaction`,data);
  }
  selfPayment(id:any){
    return this.http.get(`${this.baseUrl}/transaction/`+id);
  }
  sellerPayment(id:any,status:any){
    return this.http.get(`${this.baseUrl}/sellertransaction/`+id+`/`+status);
  }
  updateWallet(id:any,amnt:any){
    return this.http.get(`${this.baseUrl}/updatewallet/`+id+`/`+amnt);
  }

  walletCurencyPayment(id:any,curency:any){
    return this.http.get(`${this.baseUrl}/wallet/`+id+`/`+curency);
  }
  walletPayment(id:any){
    return this.http.get(`${this.baseUrl}/wallet/`+id);
  }
  saveWallet(data:any){
    return this.http.post(`${this.baseUrl}/wallet`,data);
  }
  saveOpenWallet(data:any){
    return this.http.post(`${this.baseUrl}/savewallet`,data);
  }
  
  saveReferal(data:any){
    return this.http.post(`${this.baseUrl}/savereferal`,data);
  }


  saveHelp(data:any){
    return this.http.post(`${this.baseUrl}/help`,data);
  }

  
  
  saveLoan(data:any){
    return this.http.post(`${this.baseUrl}/loan`,data);
  }
  loanPayment(id:any){
    return this.http.get(`${this.baseUrl}/loan/`+id);
  }

  saveInvestment(data:any){
    return this.http.post(`${this.baseUrl}/investment`,data);
  }
  investmentPayment(id:any){
    return this.http.get(`${this.baseUrl}/investment/`+id);
  }
  
  histrybytype(userid:any,type:any){
    return this.http.get(`${this.baseUrl}/histrybytype/`+userid+`/`+type);
  }
  
 /*  getWalletAmount(id:any,curency:any){
    return this.http.get(`${this.baseUrl}/investment/`+id+`/`+curency);
  } */

  sendMale(data:any){
    const params = new HttpParams().set('from', "makdfs0@gmail.com").set('password', "jshwxzlootijimwv").set('name',"MAKDFS").set('to', data.to).set('subject', data.subject).set('message', data.message);
    return this.http.post(`https://v-carepharmacy.com/sendallmail`,params);
  }  

  postFile(api:any,fileToUpload:File,imgname:any){
    const endpoint = `${this.imgurl}api.ashx`;
    const formData:FormData = new FormData();
    formData.append('Image',fileToUpload,fileToUpload.name);
    formData.append('apiid',api);
    formData.append('name',imgname);
    return this.http.post(endpoint,formData);
  }
  
  sendNotification(userType:any,heading:any,message:any,imgeurl:any,topic:any,weburl:any){
    const endpoint = `${this.imgurl}notification.aspx?usertype=`+userType+`&heading=`+heading+`&message=`+message+`&imgeurl=`+imgeurl+`&topic=`+topic+`&weburl=`+weburl;
    const formData:FormData = new FormData();
    formData.append('usertype',userType);
    formData.append('heading',heading);
    formData.append('message',message);
    formData.append('imgeurl',imgeurl);
    formData.append('topic',topic);
    formData.append('weburl',weburl);
    return this.http.post(endpoint,formData);
  }








  saveProject(data:any){
    return this.http.post(`${this.baseUrl}/project`,data);
  }
  getProject(){
    return this.http.get(`${this.baseUrl}/project`);
  }
  getProjects(type:any,sid:any){
    return this.http.get(`${this.baseUrl}/project/`+type+`/`+sid);
  }
  saveIntern(data:any){
    return this.http.post(`${this.baseUrl}/intern`,data);
  }



  aeromusDashboard(){
    return this.http.get(`${this.baseUrl}/admindashboard`);
  }
  internDashboard(id:any){
    return this.http.get(`${this.baseUrl}/interndashboard/`+id);
  }
  saveCoupan(data:any){
    return this.http.post(`${this.baseUrl}/coupansall`,data);
  }
  saveProduct(data:any){
    return this.http.post(`${this.baseUrl}/products`,data);
  }
  getVehicals(type:any){
    return this.http.get(`${this.baseUrl}/products/`+type);
  }
  getVehicalsbyid(id:any){
    return this.http.get(`${this.baseUrl}/productbyid/`+id);
  }
  getAllVehicals(user:any,type:any){
    return this.http.get(`${this.baseUrl}/vehicals/`+user+`/`+type);
  }
  getAllVehicalsByProduct(prodId:any){
    return this.http.get(`${this.baseUrl}/vehicals/`+prodId);
  }
  getAllpvehicalsByProduct(prodId:any){
    return this.http.get(`${this.baseUrl}/pvehicals/`+prodId);
  }
  deleteVehicals(uid:any){
    return this.http.delete(`${this.baseUrl}/vehicals/`+uid);
  }
  getAllBuySell(){
    return this.http.get(`${this.baseUrl}/buy-sell`);
  }
  saveVehicals(data:any){
    return this.http.post(`${this.baseUrl}/vehicals`,data);
  }
  deleteProduct(uid:any){
    return this.http.delete(`${this.baseUrl}/products/`+uid);
  }
  getProduct(uid:any){
    return this.http.get(`${this.baseUrl}/productbyid/`+uid);
  }
  getBookingByStatus(status:any){
    return this.http.get(`${this.baseUrl}/bookingstatus/`+status);
  }
  saveBooking(data:any){
    return this.http.post(`${this.baseUrl}/booking`,data);
  }
  getAllUser(id:any){
    return this.http.get(`${this.baseUrl}/userstatus/`+id);
  }
  deleteUser(uid:any){
    return this.http.delete(`${this.baseUrl}/users/`+uid);
  }
  getUser(id:any){
    return this.http.get(`${this.baseUrl}/users/`+id);
  }
  getUserType(type:any){
    return this.http.get(`${this.baseUrl}/user/`+type);
  }
  getAllLocation(){
    return this.http.get(`${this.baseUrl}/alllocations`);
  }
  saveLocation(data:any){
    return this.http.post(`${this.baseUrl}/locations`,data);
  }
  doLogin(user:any){
    return this.http.post(`${this.baseUrl}/login`,[user.username,user.password]);
  }
  saveBuySell(num:any){
    return this.http.post(`${this.baseUrl}/buy-sell`,num);
  }
  deleteBuySell(uid:any){
    return this.http.delete(`${this.baseUrl}/buy-sell/`+uid);
  }
  fetchRout(prid:any){
    return this.http.get(`${this.baseUrl}/location/`+prid);
  }
  getRandNum(min:any, max:any){
    return Math.floor(Math.random() * (max - min) + min);
  }
  transform(input: any, args?: any): any {
    let exp;
    const suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];
    const isNagtiveValues = input < 0;
    if (Number.isNaN(input) || (input < 1000 && input >= 0) || !this.isNumeric(input) || (input < 0 && input > -1000)) {
      if (!!args && this.isNumeric(input) && !(input < 0) && input != 0) {
        return input.toFixed(args);
      } else {
        return input;
      }
    }

    if (!isNagtiveValues) {
      exp = Math.floor(Math.log(input) / Math.log(1000));

      return (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
    } else {
      input = input * -1;

      exp = Math.floor(Math.log(input) / Math.log(1000));

      return (input * -1 / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
    }
  }
  isNumeric(value:any): boolean {
    if (value < 0) value = value * -1;
    if (/^-{0,1}\d+$/.test(value)) {
      return true;
    } else if (/^\d+\.\d+$/.test(value)) {
      return true;
    } else {
      return false;
    }
  }

  sendSmss(number:any,message:any){
    var str=encodeURIComponent(message);
    var api ="https://api.textlocal.in/send/?apikey=bB37aAd9s5Y-JLBTJC3aebapbnXZ7R4fPnCA5eILgh&message="+str+"&sender=JMBIKE&numbers=91"+number;
    console.log(api);
    return this.http.get(api).subscribe();
  } 


  sendSms(templateid:any,number:any,message:any){
    var api ="https://www.hellotext.live/vb/apikey.php?apikey=7HX5Q0XRKrBjY6E2&senderid=JMBIKE&templateid="+templateid+"&number="+number+"&message="+ encodeURIComponent(message);
    return this.http.get(api).subscribe();
  } 

  disableDate(){return false;}
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  splited(data:any,pos:any){
    return data.split(",")[pos]
  }
  getTime(){
    var date=["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","01:00 PM","01:30 PM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM","05:00 PM","05:30 PM","06:00 PM","06:30 PM","07:00 PM","07:30 PM"]
    return date;
  }

  
  trimLenthDot(tital:String,lth:any){
    if(tital!=null){if(tital.length>lth){tital=tital.substr(0,lth)+"...";}}
    return tital;
  }
}