import { Component } from '@angular/core';
import { OrgnigationService } from 'src/app/service/orgnigation.service';
declare function showAndroidToast(tyepe:any,data:any,msg:any):any;

@Component({
  selector: 'app-refer',
  templateUrl: './refer.component.html',
  styleUrls: ['./refer.component.css']
})
export class ReferComponent {
  user:any;referCode:any="";loading:any=true;
  transaction:any=[];active:any=false;myCurency:any;
  constructor(private orgnigation:OrgnigationService) { 
    this.user = localStorage.getItem("user");
    var res = localStorage.getItem("maincurency");
    if(res!=null){this.myCurency = JSON.parse(res)}
    
    if(this.user !=null){
      this.user = JSON.parse(this.user);

    }

    this.active =true;this.loading=false;
    //this.fetchListed();
    window.scroll(0,0);
  }

  referNow(){
    if(showAndroidToast("createLink",this.user.id, 1)){
      var link = "https://makdfs.page.link/?link=https://m.makdfs.com/refure/"+this.user.id+"&apn=makdfs.com";
      window.location.href="whatsapp://send?text=join now and generate extra income. "+link;
      //window.location.href="https://wa.me/?text=join now and generate extra income. "+link;
    }
  }

  fetchListed(){
    let resp = this.orgnigation.walletPayment(this.user.id);
    resp.subscribe(
      (Response:any)=>{
        this.referCode =Response; this.active =true;this.loading=false;
      },
      error=>{this.active =false;this.loading=false;});
  }

  ptptrad(){
    localStorage.setItem("curency",JSON.stringify(this.myCurency[0]));
  }
}
