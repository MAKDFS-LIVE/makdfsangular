import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent {
  loading:any=false;user:any;reg:any=false;
  constructor(public orgnigation:OrgnigationService) {
    var us = localStorage.getItem("user");
    if(us!=null){
      this.user = JSON.parse(us);
      if(this.user.education==null){this.user.education="";this.reg=true;}
    }

    this.fetchCurency();
    /* setTimeout(() => {
      this.fetchCurency();
    }, 360000); */
  }
  
  updateUser:any=new FormGroup({
    email: new FormControl("",[Validators.required]),
    contact: new FormControl("",[Validators.required]),
    name: new FormControl("",[Validators.required]),
    datetime: new FormControl(formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en')),
    address: new FormControl("",[Validators.required]),
    city: new FormControl("",[Validators.required]),
    pin: new FormControl("",[Validators.required]),
    state: new FormControl("",[Validators.required]),
    education: new FormControl("",[Validators.required]),
    resume: new FormControl("",[Validators.required]),
  });

  file:any;
  onselectfile(event:any){
    if(event.target.files){
      this.file = event.target.files[0];
    }
  }

  submit(){
    if (this.updateUser.invalid) {
      this.updateUser.get('email').markAsTouched();
      this.updateUser.get('contact').markAsTouched();
      this.updateUser.get('name').markAsTouched();
      this.updateUser.get('address').markAsTouched();
      this.updateUser.get('city').markAsTouched();
      this.updateUser.get('pin').markAsTouched();
      this.updateUser.get('state').markAsTouched();
      this.updateUser.get('education').markAsTouched();
      this.updateUser.get('resume').markAsTouched();
      var invalidFields:any = [].slice.call(document.getElementsByClassName('ng-invalid'));
      invalidFields[1].focus();
    }
    else{
      if(!this.loading){
        this.loading = true;

        var recpName = this.orgnigation.getRandNum(100000000000,999999999999)+"."+(this.file.name.split('.').pop()).toLowerCase();
        this.orgnigation.postFile("registration",this.file,recpName).subscribe();

        this.user.resume = recpName;
        this.user.memStatus = "Pending";
        this.orgnigation.sureUpdateUser(this.user).subscribe(
        Response=>{
          this.loading = false;
          this.user = Response;
          localStorage.setItem("user",JSON.stringify(Response));
        });
      }
    }
  }

  
mncur:any=[];updatedCoin:any=[];
fetchCurency(){
  this.updatedCoin = [];this.mncur=[];
  this.orgnigation.getCoins().subscribe(
    (Response:any)=>{
      this.mncur = Response;
      this.orgnigation.getCurrencyExchange(1,200).subscribe(
        (Response:any)=>{
          for(var i=0;i<Response.length;i++){
            var curency = Response[i];
            const index = this.mncur.findIndex((x:any) => x.symbol.toLowerCase() === curency.symbol.toLowerCase());
            if(index>=0){
              curency.id= this.mncur[index].id;
              curency.roi= null;
              curency.status= this.mncur[index].status;
              curency.image= this.mncur[index].image;
              this.updatedCoin.push(curency);

              this.orgnigation.savCoins(curency).subscribe();
            }
            else{
              console.log(curency);
            }
          }

          this.updatePendingCoin();
        }
      );
    });
}

updatePendingCoin(){
  //alert(JSON.stringify(this.updatedCoin))
  this.orgnigation.pendingHistry().subscribe(
    Response=>{
      var pendingCoin:any = Response;
    }
  )
}


}
