import { Component,inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {CarouselModule} from 'ngx-bootstrap/carousel'
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})

export class CarouselComponent implements OnInit {
    showIndicator:boolean = false;
    private subscriber:any; 
    
    http = inject(HttpClient);
    
    // image:any = [
    //                 {id:0,imageurl:"https://media.croma.com/image/upload/v1708678805/Croma%20Assets/Communication/Mobiles/Images/300700_0_hv1idk.png",
    //                   ModelName:"IPhone 13  ",Price:"1,50,000"},
    //                 {id:1,imageurl:"https://pngimg.com/d/iphone_14_PNG6.png",ModelName:"IPhone 15 Pro",Price:"80,000"},
    //                 {id:2,imageurl:'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111902_mbp14-silver2.png',
    //                   ModelName:"Macbook PRO",Price:"90,000"
    //                 }
    //               ];
    
    image:any = [];
    ngOnInit(){
      this.refreshNodes();
    }
    refreshNodes(){
      console.log("Call the api");
      this.subscriber = this.http.get("http://localhost:3000/api/Banner").subscribe((data:any)=>{
        this.image = data;
      });
    }
    formatToIndianCurrency(num: number): string {
      return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',maximumFractionDigits: 0
      }).format(num);}
    
    // ngOnDestroy(){
    //   this.subscriber.unsubscribe();
    // }

  
} 
