import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {
  loading:any=false;user:any;
  constructor(public orgnigation:OrgnigationService,private router: Router) {
    var us = localStorage.getItem("user");
    if(us!=null){this.user = JSON.parse(us);}
  }

  updateUser:any=new FormGroup({
    userid: new FormControl(""),
    contact: new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.required]),
    name: new FormControl("",[Validators.required]),
    query: new FormControl("",[Validators.required]),
    image: new FormControl(""),
    status: new FormControl("Pending")
  });

  submit(){
    if (this.updateUser.invalid) {
      this.updateUser.get('contact').markAsTouched();
      this.updateUser.get('email').markAsTouched();
      this.updateUser.get('name').markAsTouched();
      this.updateUser.get('query').markAsTouched();
      var invalidFields:any = [].slice.call(document.getElementsByClassName('ng-invalid'));
      invalidFields[1].focus();
    }
    else{
      if(!this.loading){
        this.loading = true;
        this.orgnigation.saveHelp(this.updateUser.value).subscribe(
          Response=>{
            alert("We have successfully received your inquiry! Your issue will be resolved within 12 hours, and we will provide updates to your email.");
            this.loading = false;
            this.router.navigate(['/']);
          },
          error=>{
            alert("We have successfully received your inquiry! Your issue will be resolved within 12 hours, and we will provide updates to your email.");
            this.loading = false;
            this.router.navigate(['/']);

          }
        );
      }
    }
  }
  
}
