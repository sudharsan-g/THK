import { Component, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { InputNumberModule } from 'primeng/inputnumber';
import { HostListener } from "@angular/core";
import { Carousel } from 'primeng/carousel';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-landing-productlst',
  standalone: true,
  imports: [MatTabsModule,CardModule,ButtonModule,InputNumberModule,CarouselModule],
  templateUrl: './landing-productlst.component.html',
  styleUrl: './landing-productlst.component.css'
})



export class LandingProductlstComponent  implements OnInit {
  
  showindicators:boolean = false;
  visible:number = 3;
  constructor(){
    Carousel.prototype.onTouchMove = (): void => undefined;
    if (typeof window !== "undefined") {
      if( ( window.innerWidth <= 800 )){
        this.visible = 1;
      }
      else{
        this.visible = 3;
      }
   }
    
  }

  @HostListener('window:resize', ['$event'])
    getScreenSize() {
      if (typeof window !== "undefined") {
        if( ( window.innerWidth <= 800 )){
          this.visible = 1;
        }
        else{
          this.visible = 3;
        }
     }
    }
  
  

  http = inject(HttpClient);
  bestsellers:any;
  newlaunches:any;
  ngOnInit(){
      this.getBs();
      this.getNL();
  }
  formatToIndianCurrency(num: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',maximumFractionDigits: 0
    }).format(num);}
  getBs(){
    this.http.get('http://localhost:3000/api/bestseller').subscribe((data)=>{
      this.bestsellers = data;
      console.log(this.bestsellers);
    })
  }
  getNL(){
    this.http.get('http://localhost:3000/api/newlaunches').subscribe((data)=>{
      this.newlaunches = data;
      console.log(this.newlaunches);
    })
  }

}
