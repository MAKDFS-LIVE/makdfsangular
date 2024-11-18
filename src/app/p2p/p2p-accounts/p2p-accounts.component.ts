import { Component } from '@angular/core';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-p2p-accounts',
  templateUrl: './p2p-accounts.component.html',
  styleUrls: ['./p2p-accounts.component.css']
})
export class P2pAccountsComponent {
  user:any;loging:any=true;nodata:String="";
  account:any=[];
  constructor(private orgnigation:OrgnigationService) { 
    var use = localStorage.getItem("user");
    if(use!=null){
      this.user = JSON.parse(use);
      this.fetchData();
    }
  }


  fetchData(){
    this.account=[];this.loging=true;this.nodata="";
    let resp = this.orgnigation.getAccountById(this.user.id);
    resp.subscribe(
      Response=>{this.account=Response;this.nodata="";this.loging=false;},
      error=>{this.nodata="No any account present at this time.";this.account=[];this.loging=false;})
  }

  update(pos:any){
    localStorage.setItem("account",JSON.stringify(this.account[pos]));
  }
  removeAccount(){localStorage.removeItem("account");}

  delete(id:any){
    if (confirm('Are you sure you want to delete?')){
      this.account=[];this.loging=true;this.nodata="";
      this.orgnigation.deleteAccount(id).subscribe(
        Response=>{
          this.fetchData();
        }
      );
    }
  }
}
