import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {
  payType:any="";details:any;user:any;
  loading:any=false;accountType:any=[];
  imgUrl:any = environment.imgurl;

  constructor(private orgnigation:OrgnigationService,private router: Router) { 
    var use = localStorage.getItem("user");
    var acc = localStorage.getItem("account");
    if(use!=null){this.user = JSON.parse(use);}
    if(acc!=null){this.details = JSON.parse(acc);this.payType = this.details.paymentType;}

    if (this.user.cuntry.includes('India')) {
      this.accountType = [{id:"1",paymentType:"Paytm"},{id:"2",paymentType:"IMPS"},{id:"3",paymentType:"UPI"}];
    }

  }


  loadMoad(type:any){
    this.payType = type;
    this.details = {paymentType:this.payType,name:this.user.name,userid:this.user.id,accountNo:"",ifsc:"",bankName:"",baranchName:"",paytmNo:"",upiid:"",qrcode:"",status:"Active"};
  }

  patym:any=new FormGroup({
    paytmNo: new FormControl("",[Validators.required]),
    qrcode: new FormControl("")
  });
  UPI:any=new FormGroup({
    upiid: new FormControl("",[Validators.required]),
    qrcode: new FormControl("")
  });
  IMPS:any=new FormGroup({
    accountNo: new FormControl("",[Validators.required]),
    ifsc: new FormControl("",[Validators.required]),
    bankName: new FormControl("",[Validators.required]),
    baranchName: new FormControl("",[Validators.required])
  });

  submit(){
    if(this.payType=="Paytm"){
      if (this.patym.invalid) {
        this.patym.get('paytmNo').markAsTouched();
        var invalidFields:any = [].slice.call(document.getElementsByClassName('ng-invalid'));
        invalidFields[1].focus();
      }
      else{
        this.details.paytmNo = this.patym.value.paytmNo;
        this.details.qrcode = "";
        if(this.file1 !=null){
          this.details.qrcode = this.orgnigation.getRandNum(100000000000,999999999999)+".jpg";
          this.orgnigation.postFile("qr",this.file1,this.details.qrcode).subscribe();
        }

        this.filanAdd();
      }
    }
    else if(this.payType=="UPI"){
      if (this.UPI.invalid) {
        this.UPI.get('upiid').markAsTouched();
        var invalidFields:any = [].slice.call(document.getElementsByClassName('ng-invalid'));
        invalidFields[1].focus();
      }
      else{
        this.details.upiid = this.UPI.value.upiid;
        this.details.qrcode = "";
        if(this.file2 !=null){
          this.details.qrcode = this.orgnigation.getRandNum(100000000000,999999999999)+".jpg";
          this.orgnigation.postFile("qr",this.file2,this.details.qrcode).subscribe();
        }
        this.filanAdd();
      }
    }
    else{
      if (this.IMPS.invalid) {
        this.IMPS.get('accountNo').markAsTouched();
        this.IMPS.get('ifsc').markAsTouched();
        this.IMPS.get('bankName').markAsTouched();
        this.IMPS.get('baranchName').markAsTouched();
        var invalidFields:any = [].slice.call(document.getElementsByClassName('ng-invalid'));
        invalidFields[1].focus();
      }
      else{
        this.details.accountNo = this.IMPS.value.accountNo;
        this.details.ifsc = this.IMPS.value.ifsc;
        this.details.bankName = this.IMPS.value.bankName;
        this.details.baranchName = this.IMPS.value.baranchName;
        this.filanAdd();
      }
    }
  }

  filanAdd(){
    this.loading = true;
    this.orgnigation.saveAccount(this.details).subscribe(
      Response=>{
        this.loading = false;
        this.router.navigate(['/p2p/account']);
      }
    );
  }

  file1:any;qr1:any="";
  onselectfile(event:any){
    if(event.target.files){
      this.file1 = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        this.qr1 = event.target.result;
      }
    }
  }

  file2:any;qr2:any="";
  onselectfile2(event:any){
    if(event.target.files){
      this.file2 = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        this.qr2 = event.target.result;
      }
    }
  }
}