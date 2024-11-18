import { Component } from '@angular/core';
import { OrgnigationService } from 'src/app/service/orgnigation.service';

@Component({
  selector: 'app-saveimage',
  templateUrl: './saveimage.component.html',
  styleUrls: ['./saveimage.component.css']
})
export class SaveimageComponent {
  
  constructor(public orgnigation:OrgnigationService) { 
    var store:any = localStorage.getItem("maincurency");
    if(store!=null){
      this.curency = JSON.parse(store);
      for(var i=0;i<this.curency.length;i++){
        var nData = this.curency[i];
        nData.image = nData.id+".webp";
        nData.id="";
        nData.roi=null;
        //this.orgnigation.savCoins(nData).subscribe();
        /* if(i>=10 && i<15){
          this.orgnigation.savCoins(nData).subscribe();
        } */
      }
    }
  }

  curency:any;
}
