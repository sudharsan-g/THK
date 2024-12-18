import { TemplateRef,Component ,ViewChild, OnInit, inject} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { document } from 'ngx-bootstrap/utils';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import {MatIconModule} from '@angular/material/icon';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productpg',
  standalone: true,
  imports: [CarouselModule,DialogModule,ButtonModule,MatIconModule],
  templateUrl: './productpg.component.html',
  styleUrl: './productpg.component.css',
  host: {ngSkipHydration: 'true'},
})
export class ProductpgComponent implements OnInit {
     
  isProductInCart(cart: any[], productName: string,color:string,size:string): boolean {
    if(cart == null){
      return false
    }
    
    const pro = cart.find(item=>(item["product"] == productName) && (item.color == color) &&(item.size==size));
    
    return pro !== undefined;
  }
  
  http = inject(HttpClient);
  @ViewChild('successModal', { static: true }) successModal!: TemplateRef<any>;
  @ViewChild('failModal',{static:true}) failModal!:TemplateRef<any>;
  
  check:boolean = false;
  entiredata:any ;
  gotocart:boolean= false;
  product:string ="";
  category:string="";
  selectedsize:any;
  desc:string = "";
  colors:any;
  displaysize:string="";
  activeButtonIndex: number =0;
  selectedcolor:string='';
  pin:string = '';
  types:any ;
  price:number = 0;

  cnfpins:number[] = [
    682020,
    682030,
    682017,
    682001,
    682016,
    682004,
    682022,
    682002,
    682009,
    682025,
    682036,
    682015,
    682031,
    682013,
    682021,
    682019,
    682003,
    686101,
    686106,
    686104,
    686102,
    686103,
    686567,
    685508,
    682555,
    690101,
    685584,
    685584,
    685605,
    685585,
    685584,
    691002,
    691017,
    691008,
    691003,
    691004,
    691001,
    691013,
    691015,
    691006,
    691021,
    691007,
    691016,
    691009,
    691012,
    691005,
    691019,
    691010,
    686038,
    686008,
    686001,
    686002,
    686039,
    686003,
    686016,
    686004,
    686006,
    686005,
    686010,
    673018,
    673032,
    673008,
    673002,
    673017,
    673006,
    673014,
    673003,
    673010,
    673001,
    673016,
    673009,
    673007,
    673012,
    673011,
    673021,
    673004,
    673029,
    673005,
    673123,
    673122,
    673121,
    673122,
    673121,
    673121,
    673305,
    673020,
    673106,
    673102,
    673104,
    673105,
    673101,
    676505,
    676102,
    676107,
    676105,
    676101,
    676104,
    676121,
    679577,
    678011,
    678007,
    678005,
    678003,
    678013,
    678004,
    678002,
    678001,
    678014,
    678006,
    678010,
    678012,
    678541,
    678002,
    679104,
    679301,
    679521,
    679101,
    679103,
    679302,
    679102,
    679522,
    689645,
    691523,
    691305,
    689102,
    689103,
    689105,
    689107,
    689115,
    689101,
    689111,
    689121,
    680618,
    680003,
    680008,
    680026,
    680027,
    680011,
    680006,
    680007,
    680306,
    680018,
    680004,
    680012,
    680002,
    680631,
    680022,
    680001,
    680020,
    680005,
    680009,
    680021,
    680010,
    680307,
    680121,
    680503,
    680582,
    695030,
    695011,
    695025,
    695004,
    695005,
    695012,
    695038,
    695006,
    695039,
    695001,
    695008,
    695101,
    688001,
    688012,
    688011,
    688007,
    688006,
    688009,
    688003,
    688013,
    688002,
    688008,
    683101,
    683106,
    683108,
    683105,
    683102,
    686661,
    683542,
    670001,
    670101,
    670141,
    671121,
    671315,
    682033,
    682037,
    682024,
    682026,
    682035,
    682011,
    682018];
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.http.get(`http://localhost:3000/api/product/${params['product_id']}`).subscribe((data:any)=>{
        this.entiredata = data[0];
        this.product = this.entiredata["name "];
        
        this.desc   = this.entiredata["desc"];
        this.category = this.entiredata["Category"];
        this.colors = this.entiredata["colors"]; 
        this.selectedcolor = this.colors[0]["name"];
        this.selectedsize = Object.keys(this.entiredata["types"][this.colors[0]['name']]);
        this.displaysize = this.selectedsize[0];
        this.types = this.entiredata["types"][this.selectedcolor.toString()][this.selectedsize[0].toString()];
        this.price = this.entiredata["oprice "];
        
        
        this.gotocart = this.isProductInCart(JSON.parse(localStorage.getItem('cart') as string),this.product,this.selectedcolor,this.selectedsize);
        
        console.log(`ONINIT HAS gotocart = ${this.gotocart} query = ${document.querySelector(".clicked")}`);
        // if (this.gotocart){
        //   this.check = true;
        //   document.querySelector('.cart').style.opacity = 0;
        //   document.querySelector('.success').style.display = 'block';
        //   document.querySelector('.success').style.opacity = 1;
        // }
        // else if(document.querySelector(".clicked")){
        //     document.querySelector(".clicked").classList.remove("clicked");
        //   }
        // else if ( !document.querySelector(".clicked")){
    
        //   document.querySelector('.success').style.opacity = 0; 
        //   // document.querySelector('.cart').style.display = 'inline';
        //   // document.querySelector(".cart").style.opacity = 1;
        // }
        if (this.gotocart){
          this.check = true;
          document.querySelector('.cart').style.opacity = 0;
          document.querySelector('.success').style.display = 'block';
          document.querySelector('.success').style.opacity = 1;
        }
        
        else if(!this.gotocart && !document.querySelector(".clicked")){
          document.querySelector('.cart').style.opacity = 1;
          document.querySelector('.success').style.opacity = 0;
        }
        else if( !this.gotocart && document.querySelector(".clicked") ){
          document.querySelector(".clicked").classList.remove("clicked");
          document.querySelector('.cart').style.opacity = 1;
          document.querySelector('.success').style.opacity = 0;
        }
         

      });
    
      
    });
  }
  
  constructor(private activatedRoute: ActivatedRoute,private modal:NgbModal,private commonservice:CommonService,private router:Router ) {
    
  }

  formatToIndianCurrency(num: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',maximumFractionDigits: 0
    }).format(num);
  }

  onClick(i:number,name:string){
    
    document.querySelector(".active")?.classList.remove("active");
    this.activeButtonIndex = 0;
    this.selectedsize = Object.keys(this.entiredata['types'][name.toString()]);
    this.displaysize = this.selectedsize[0];
    this.selectedcolor = name;
    this.types = this.entiredata["types"][this.selectedcolor.toString()][this.selectedsize[0].toString()];
    document.querySelector(`.${name.toString()}`)?.classList.add("active");
    this.gotocart = this.isProductInCart(JSON.parse(localStorage.getItem('cart') as string),this.product,this.selectedcolor,this.displaysize);
    
    if (this.gotocart){
      this.check = true;
      document.querySelector('.cart').style.opacity = 0;
      document.querySelector('.success').style.display = 'block';
      document.querySelector('.success').style.opacity = 1;
    }
    
    else if(!this.gotocart && !document.querySelector(".clicked")){
      document.querySelector('.cart').style.opacity = 1;
      document.querySelector('.success').style.opacity = 0;
    }
    else if( !this.gotocart && document.querySelector(".clicked") ){
      document.querySelector(".clicked").classList.remove("clicked");
      document.querySelector('.cart').style.opacity = 1;
      document.querySelector('.success').style.opacity = 0;
    }
      
  }

  onButtonClick(i:number,size:string){
    // document.querySelector(".success")?.classList.remove("success");
    this.activeButtonIndex = i;
    this.displaysize = size;
    this.gotocart = this.isProductInCart(JSON.parse(localStorage.getItem('cart') as string),this.product,this.selectedcolor,this.displaysize);
  
    
    if (this.gotocart){
      this.check = true;
      document.querySelector('.cart').style.opacity = 0;
      document.querySelector('.success').style.display = 'block';
      document.querySelector('.success').style.opacity = 1;
    }
    
    else if(!this.gotocart && !document.querySelector(".clicked")){
      document.querySelector('.cart').style.opacity = 1;
      document.querySelector('.success').style.opacity = 0;
    }
    else if( !this.gotocart && document.querySelector(".clicked") ){
      document.querySelector(".clicked").classList.remove("clicked");
      document.querySelector('.cart').style.opacity = 1;
      document.querySelector('.success').style.opacity = 0;
    }
  }

  checkpinclick(){
    this.pin = document.querySelector(".checkpin").value;
    if(this.pin.length == 6 ){
      if (this.cnfpins.includes(Number(this.pin))){
        this.check = true;
        const modalRef = this.modal.open(this.successModal);
        setTimeout(function(){
          modalRef.close();
        },1000);
        return true;  
      }
      else{
        this.check = false;
        const modalRef = this.modal.open(this.failModal);
        setTimeout(function(){
          modalRef.close();
        },1600);
        return false;
      }
    }
    else{
      this.check = false;
      document.querySelector(".checkpin").value="";
      document.querySelector(".checkpin")?.classList.add("bounce");
      setTimeout(function() {
        document.querySelector(".checkpin")?.classList.remove("bounce");
      }, 1000); 
      return false;
    }
    
  }
  

  add_tolocalstorage() {
    let carts: any[] = JSON.parse(localStorage.getItem('cart') as string);
    const data = {
        product: this.product,
        category: this.category,
        desc: this.desc,
        color: this.selectedcolor,
        size: this.displaysize,
        qty: 1,
        price: this.price * 1,
    };

    if (carts == null) {
        carts = [];
    }
    carts.push(data);
    localStorage.setItem('cart', JSON.stringify(carts));
  }

  addtocart(){
    this.pin = document.querySelector(".checkpin").value;
    
    if(this.gotocart && this.check ){
      this.router.navigate(['/cart']);
    }
    else if(this.check ){
      document.querySelector(".cart").style.opacity =0;
      document.querySelector(".cartbtn").classList.add("clicked");   
      this.commonservice.sendData(1);
      this.add_tolocalstorage();
      this.gotocart = true;
    }
    else{ 
      document.querySelector(".checkpin")?.classList.add("bounce");
      setTimeout(function() {
        document.querySelector(".checkpin")?.classList.remove("bounce");
      }, 1000); 
    
      
    };
  }

  products:any = [
    {

      image: '../../assets/images/th1.png',
      
    },
    {

      image: '../../assets/images/th2.png',
      
    },
    {
  
      image: '../../assets/images/th3.png',
      
    }
    ]
 
    
  



}
