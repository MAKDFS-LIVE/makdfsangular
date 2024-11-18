import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user:any;
  constructor(private orgnigation:OrgnigationService) {
    this.imageSrc = localStorage.getItem("pic");
    var us = localStorage.getItem("user");
    if(us!=null){
      this.user = JSON.parse(us);
    }
    
  }

  imageusrl:any="";imageSrc:any="";
  handleFileInput(Image:any){
    this.imageusrl = Image.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(Image.target.files[0]);
    reader.onload=(fevent:any)=>{
      this.imageSrc = reader.result;
      this.user.profilePic = this.imageSrc; //change
      localStorage.setItem("pic",this.imageSrc);
      if(this.imageusrl!=null){
        var name = formatDate(new Date(), 'yyyy-MM-dd-HH-mm', 'en')+"-"+this.orgnigation.getRandNum(1000000000,9999999999)+".png";
        this.user.profilePic = name;
        //this.orgnigation.updateUser(this.user).subscribe();
        //this.orgnigation.postFile("thumbnail",this.imageusrl,name).subscribe();
      }
    }
  }

  loadImg(){
    if(this.imageSrc == null || this.imageSrc == ""){
      return "/assets/images/profile/profile.png";
    }
    else{
      return this.imageSrc;
    }
  }
}
