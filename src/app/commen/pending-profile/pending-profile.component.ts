import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-pending-profile',
  templateUrl: './pending-profile.component.html',
  styleUrls: ['./pending-profile.component.css']
})
export class PendingProfileComponent {

  constructor(private router: Router,private orgnigation:OrgnigationService) {    
    var use:any = localStorage.getItem("user");
    if(use!=null){
      use = JSON.parse(use);
      this.loadUser([use.contact,use.password]);
    }
  }
  
  loadUser(userdata:any){
    this.orgnigation.GetLogin(userdata).subscribe(
      (Response:any)=>{
        localStorage.setItem("user",JSON.stringify(Response));
        if(Response.status=="Approved"){
          this.router.navigate(['/']);
        }
      });
  }
  
  
}
