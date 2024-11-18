import { Component } from '@angular/core';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blog:any;loading:any=true;
  constructor(public orgnigation:OrgnigationService) { 
    var blgList = localStorage.getItem("bloglist");
    if(blgList!=null){this.blog = JSON.parse(blgList);}
    this.loadBlog();
  }

  loadBlog(){
    this.orgnigation.getBlog().subscribe(
      (Response:any)=>{
        this.loading = false;
        this.blog = Response;
        localStorage.setItem("bloglist",JSON.stringify(Response));
      }
    );
  }

  loadblog(pos:any){
    localStorage.setItem("blog",JSON.stringify(this.blog[pos]));
  }
}
