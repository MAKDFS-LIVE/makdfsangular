import { Component } from '@angular/core';
import { OrgnigationService } from 'src/app/service/orgnigation.service';
declare function showAndroidToast(tyepe:any,data:any,msg:any):any;

@Component({
  selector: 'app-investreffer',
  templateUrl: './investreffer.component.html',
  styleUrls: ['./investreffer.component.css']
})
export class InvestrefferComponent {
  user:any;
  constructor(private orgnigation:OrgnigationService) {
    this.user = localStorage.getItem("user"); 

    if(this.user !=null){this.user = JSON.parse(this.user);}
  }

  referNow(){
    if(showAndroidToast("createLink",this.user.id,this.user.referralAmount)){
      var link = "https://makdfs.page.link/?link=https://m.makdfs.com/refure/"+this.user.id+"&apn=makdfs.com";
      window.location.href="whatsapp://send?text=join now and generate extra income. "+link;
      //window.location.href="https://wa.me/?text=join now and generate extra income. "+link;
    }
  }
}
