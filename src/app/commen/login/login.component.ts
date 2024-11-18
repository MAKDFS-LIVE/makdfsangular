import { Component, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrgnigationService } from 'src/app/service/orgnigation.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  @ViewChild('recaptchacontainer') recaptchaContainer: ElementRef | any;
  siteKey: any = "6LdMSgkoAAAAACXVRHiC5QQ2OFumlnOgKf646zdX";
  referCode:any="";
  loader:any=false;loader2:any=false;
  constructor(private activatedroute: ActivatedRoute,public orgnigation:OrgnigationService,private router: Router,private authService: SocialAuthService) {
    /* this.activatedroute.params.subscribe((data:any) => {
      if(data.refure!=null){
        this.referCode = data.refure;
      }
    }); */




  }

  ngOnInit() {
    this.authService.authState.subscribe((user: any) => {
      this.orgnigation.getUserByEmail(user.email,user.id,user.name,user.id).subscribe(
        (Response: any) => {
          localStorage.setItem("user",JSON.stringify(Response));
          this.router.navigate(['/']);
        },
        error => {
          alert("Technical Error, Please try again.");
        }
      );
    });
  }



  loginUser(){
    this.loader=true;
    //this.authService.GoogleAuth(this.referCode);
  }


  updateUser:any=new FormGroup({
    username: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required])
  });

  login(){
    if (this.updateUser.invalid) {
      this.updateUser.get('username').markAsTouched();
      this.updateUser.get('password').markAsTouched();
      var invalidFields:any = [].slice.call(document.getElementsByClassName('ng-invalid'));
      invalidFields[1].focus();
    }
    else{
      if(!this.loader2){
        this.loader2 = true;
        this.orgnigation.GetLogin([this.updateUser.value.username,this.updateUser.value.password]).subscribe(
          Response=>{
            this.loader2 = false;
            localStorage.setItem("user",JSON.stringify(Response));
            this.router.navigate(['/']);
          },
          error=>{
            this.loader2 = false;
            alert("Invalid userid or Password!");
          });
      }
    }
  }
  signup(){
    if(this.referCode.length>0){
      localStorage.setItem("referal",this.referCode);
    }
  }

  /* public key: any;
  getOtp(){
    //this.key = new RecaptchaVerifier(this.recaptchaContainer,{size:'invisible',sitekey:this.siteKey,badge: "inline"},getAuth());
    //new RecaptchaVerifier("+919889121213", this.recaptchaContainer,auth);
    var applicationVerifier = new RecaptchaVerifier(this.recaptchaContainer,{size:'invisible',sitekey:this.siteKey},getAuth());
    this.afAuth
      .signInWithPhoneNumber("+919889121213",applicationVerifier)
      .then((result) => {
        alert('You have been successfully logged in!');
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
    
        alert(JSON.parse(error));
      });
  } */
}
