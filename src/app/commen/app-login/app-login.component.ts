import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent {
  constructor(private activatedroute: ActivatedRoute,private router: Router,private orgnigation:OrgnigationService) {
    this.activatedroute.params.subscribe((data:any) => {
      if(data.user!=null){
        var usr:any = data.user.split(",");
        this.orgnigation.GetLogin([usr[0],usr[1]]).subscribe(
          (Response:any)=>{
            localStorage.setItem("user",JSON.stringify(Response));
            if(Response.status=="Approved"){
              this.router.navigate(['/']);
            }
            else{
              this.router.navigate(['/pending']);
            }
          });



        /* var usr:any = data.user.split(",");
        var cont="no";var emai = "no";
        if(usr[1].length>0){cont = usr[1];}
        if(usr[2].length>0){emai = usr[2];}
        var user={name:usr[0],contact:cont,email:emai,userid:usr[3],sponsor:usr[4],loanWallet:0,lockedWallet:0,openWallet:0,status:"Active",usertype:"User",datetime:formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en')}
        this.loadFirstTimeUser(user); */
      }
    });
  }

  loadFirstTimeUser(userdata:any){
    this.orgnigation.saveUser(userdata).subscribe(
      Response=>{
        localStorage.setItem("user",JSON.stringify(Response));
        this.router.navigate(['/']);
      });
  }
}
