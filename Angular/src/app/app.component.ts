import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from'@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { CommonService } from './common.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
            RouterLinkActive,
            RouterModule, 
            RouterLink,
            MatButtonModule, 
            MatIconModule,
            MatToolbarModule,
            MatSidenavModule,
            MatListModule,
            MatBadgeModule
          
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Angular';
  badge:number=0;
  v:number = 0;
  constructor(private commonservice:CommonService){}


  ngOnInit():void{
    
    this.commonservice.commonMessage.subscribe(m=>{this.badge+=Number(m);});
    const data =  JSON.parse(localStorage.getItem('cart') as string);
    if (data !==null){
      this.v=data.length;
    }
    else{
      this.v = 0;
    } 
    if(this.v !== this.badge){
      this.badge = this.v;
    }
    
  }
}
