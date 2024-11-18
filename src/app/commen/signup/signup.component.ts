import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  loader2:any=false;referal:any="";refurl:any="";
  constructor(public orgnigation:OrgnigationService,private router: Router) {
    this.referal = localStorage.getItem("referal");
    if(this.referal!=null){this.refurl = "/"+this.referal;}
  }

  updateUser:any=new FormGroup({
    email: new FormControl("",[Validators.required]),
    contact: new FormControl("",[Validators.required]),
    name: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required]),
    conpass: new FormControl("",[Validators.required]),
    userid: new FormControl(this.orgnigation.getRandNum(100000000000,999999999999)),
    sponsor: new FormControl(""),
    loanWallet: new FormControl("0"),
    lockedWallet: new FormControl("0"),
    openWallet: new FormControl("0"),
    status: new FormControl("Active"),
    usertype: new FormControl("User"),
    datetime: new FormControl(formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en'))
  });

  signup(){
    if (this.updateUser.invalid) {
      this.updateUser.get('email').markAsTouched();
      this.updateUser.get('contact').markAsTouched();
      this.updateUser.get('name').markAsTouched();
      this.updateUser.get('password').markAsTouched();
      this.updateUser.get('conpass').markAsTouched();
      var invalidFields:any = [].slice.call(document.getElementsByClassName('ng-invalid'));
      invalidFields[1].focus();
    }
    else{
      if(!this.loader2){
        this.loader2 = true;
        var user = this.updateUser.value;
        user.sponsor = this.referal;
        if(user.password == user.conpass){
          this.orgnigation.saveUser(user).subscribe(
          Response=>{
            this.loader2 = false;
            localStorage.removeItem("referal");
            localStorage.setItem("user",JSON.stringify(Response));
            this.router.navigate(['/']);
          });
        }
        else{
          this.loader2 = false;
          alert("Password and confirm password does not match.");
        }
      }
    }
  }
}
