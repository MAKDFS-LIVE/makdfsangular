import { Component } from '@angular/core';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent {
  item:any;
  constructor(public orgnigation:OrgnigationService) { 
    var blg = localStorage.getItem("blog");
    if(blg!=null){
      this.item = JSON.parse(blg);
    }
    window.scroll(0,0);
  }

  
}
