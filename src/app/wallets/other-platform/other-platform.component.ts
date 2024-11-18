import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-other-platform',
  templateUrl: './other-platform.component.html',
  styleUrls: ['./other-platform.component.css']
})
export class OtherPlatformComponent {
  user:any;showrecpt:any=false;
  recipt:any="";fieName:any="";file:any="";
  loading:any = false;
  constructor(private orgnigation:OrgnigationService,private router: Router) { 
    var use = localStorage.getItem("user");
    if(use !=null){this.user = JSON.parse(use);}
  }


  onselectfile(event:any){
    if(event.target.files){
      this.fieName = event.target.files[0].name;
      this.file = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        this.recipt = event.target.result;
      }
    }
  }
  conformPayment(){
    if(!this.loading){
      if(this.fieName==""){
        alert("Please upload receipt");
      }
      else{
        this.loading = true;
        var filename = this.orgnigation.getRandNum(100000000000,999999999999)+".jpg";
        var transaction = {userid:this.user.id,paymentid:"",sellerid:"",usdamnt:"",transferant:"",curency:filename,recipt:this.fieName,status:"Unapproved",remark:"Payment done but waiting for approval.",datetime:formatDate(new Date(), 'yyyy-MM-dd h:mm a', 'en'),icon: "", name:"",buyCurency:"",wallet:""}
        this.orgnigation.postFile("recept",this.file,filename).subscribe();        
        this.orgnigation.saveTransaction(transaction).subscribe(
          Response=>{
            alert("Thank you for uploading your receipt. If our automated system successfully verifies your payment it will be updated in the next 5 minutes. Otherwise, you can contact our support team.");
            this.router.navigate(['/']);
          }
        );
      }
    }
  }

}
