import { Component, OnChanges, OnInit, inject } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import {MatIconModule} from '@angular/material/icon';
import { InputOtpModule } from 'primeng/inputotp';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../common.service';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { timeout } from 'rxjs';



@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DropdownModule,FormsModule,InputGroupAddonModule,InputNumberModule,InputGroupModule,MatIconModule,InputOtpModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  private isTimerRunning: boolean = false;
  showalert:boolean = false;
  tt:number = 0;
  value3:string |undefined;
  fname:string | undefined;
  faddress:string | undefined;
  fphone:string | undefined;
  products:any;
  fproducts:string = '' ;
  flandmark :string | undefined;
  fpincode : number | undefined;
  otp:string | undefined;
  datum:any;
  http = inject(HttpClient);
  crt_otp:string | undefined;
  pins:number[] = [
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

  constructor(private commonservice:CommonService){}
  
  formatToIndianCurrency(num: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',maximumFractionDigits: 0
    }).format(num);
  }
  

  ngOnInit(){
    const local = localStorage.getItem('cart') as String;
    const payload = {data:local};
   
    
    this.http.post(`http://localhost:3000/api/checkproductava`,payload).subscribe((response:any)=>{
      this.products = response.message;
    
      this.products.forEach((element:any) => {
        this.tt += element.price * element.qty
      });
    });
    
  }

  

  timer(val:number){
    
    const ele = (document.querySelector(".sec") as HTMLElement) ; 
    if(val < 10){
      ele.innerHTML = "0" + val.toString();
    }
    else{
      ele.innerHTML = String(val);
    }
    
    
    if(val > 0 && this.isTimerRunning){
      setTimeout(() =>{
        this.timer(val - 1);
      }, 1000);
    }
    else if(val == 0){
      (document.querySelector(".counter")as HTMLButtonElement).style.display = "none";
      (document.querySelector(".resend-btn")as HTMLButtonElement).style.display = "inline";
    }

  }
  verify_info(){
    (document.querySelector(".sec")as HTMLButtonElement).innerHTML = "00" ;
    (document.querySelector(".counter")as HTMLButtonElement).style.display = "inline";
    (document.querySelector(".resend-btn")as HTMLButtonElement).style.display = "none";
    this.fname = (document.querySelector(".form-name") as HTMLInputElement)?.value; 
    this.faddress = (document.querySelector(".form-address") as HTMLInputElement)?.value; 
    this.flandmark = (document.querySelector(".form-landmark") as HTMLInputElement)?.value; 
    this.fpincode = Number((document.querySelector(".form-pincode") as HTMLInputElement)?.value); 
    this.fphone = (document.querySelector(".form-number") as HTMLInputElement)?.value; 
    
    

    if(this.fname && this.faddress && this.flandmark && this.fphone.length == 10 && this.pins.includes(this.fpincode)){
      this.isTimerRunning =true;
      (document.querySelector(".sec") as HTMLButtonElement).innerHTML = "60" 
      const cartData = localStorage.getItem("cart") || "";
      const dc  = JSON.parse(cartData);
      
      dc.forEach((element:any) => {
          this.fproducts += "*"+element.product + "*" + "\n";
          this.fproducts += " - *Quantity* : " + element.qty +"\n";
          this.fproducts += " - *Price* : ₹ " + element.price +"\n";
          this.fproducts += " - *Size* : " + element.size +"\n";
          this.fproducts += " - *Colour* : " + element.color +"\n";
          this.fproducts += " - *Description* : " + element.desc +"\n\n";

      });
      this.crt_otp = String(Math.floor(Math.random() * 9000));
      
        const script = `*Welcome to Tech House Kochi!* 
We are excited to have you with us. Below are the products you have selected for checkout:
${this.fproducts}
Please take a moment to verify your phone number. This helps us confirm your identity and securely set up your new account.
Your One-Time Password (OTP) is: *${this.crt_otp}*
Thank you for shopping with us at Tech House Kochi!
`;
      const payload = {data:script};
      document.querySelector(".content-info")
      ?.classList.add("rotate");
      this.isTimerRunning =true;
      this.timer(60);
      this.http.post(`http://localhost:3000/api/sendotp/${this.fphone}`,payload).subscribe((response:any)=>{
        console.log("The data is " + response);
         
      });
     

    }
    else if(!this.fname || !this.faddress || !this.flandmark ){
      if(!this.fname){
        (document.querySelector(".form-name") as HTMLInputElement).classList.add("bounce");
      }
      if(!this.faddress){
        (document.querySelector(".form-address") as HTMLInputElement).classList.add("bounce");
      }
      if(!this.flandmark){
        (document.querySelector(".form-landmark") as HTMLInputElement).classList.add("bounce");
      }
      if(this.fphone.length < 10){document.querySelector(".form-number")?.classList.add("bounce");}
      if(!this.pins.includes(this.fpincode)){
        document.querySelector(".form-pincode")?.classList.add("bounce");
      }
    }
    else if(this.fphone.length < 10){
    
      document.querySelector(".form-number")?.classList.add("bounce");
      if(!this.pins.includes(this.fpincode)){
   
        document.querySelector(".form-pincode")?.classList.add("bounce");
      }
    }
    else if(!this.pins.includes(this.fpincode)){
    
      document.querySelector(".form-pincode")?.classList.add("bounce");
      if(this.fphone.length < 10){
   
        document.querySelector(".form-number")?.classList.add("bounce");
      }
    }
    
  }
  
  backbtn(){
    
    document.querySelector(".content")?.classList.remove("rotate");
    this.isTimerRunning = false;
  }

  verifydoc(){
    (document.querySelector(".content-info") as HTMLElement).style.display = "block";
  }
  
  otpverify(){
    
  
    if(this.crt_otp == this.otp){
      (document.querySelector(".back2")as HTMLElement).style.display ='block';
      if(window.innerHeight <= 655 && (window.innerWidth <= 430)){
        // console.log("True here");
        setTimeout(()=>{(document.querySelector(".content-info") as HTMLElement).style.display = 'none'},3000);
        (document.querySelector(".form-min") as HTMLElement).style.display ="none";
        (document.querySelector(".form-max") as HTMLElement).style.display ="block";
            }

    }
    else{
      this.otp = "";
      document.querySelector(".otp-box")?.classList.add("bounce");
      setTimeout(function(){
        document.querySelector(".otp-box")?.classList.remove("bounce");
      },1000);
    }
    
  }
  
  plus_qty(product:any,i:number){
  
    const payload = {data:product};
    this.http.post(`http://localhost:3000/api/increaseqty/${product.qty}`,payload).subscribe((response:any)=>{
       
       if(response.message>product.qty){
            this.products[i]["qty"] = response.message;
            this.tt += product.price;
            localStorage.clear();
            localStorage.setItem('cart', JSON.stringify(this.products));
       }
      else{
        this.showalert = true;
        setTimeout(() =>{
          this.showalert=false;
        }, 1500);
      }
    });
  }

  closeproduct(product:any,i:number){
    this.tt -= product.price * product.qty ;
    this.products[i]["qty"] = 0 ;
    
    this.products.splice(i,1);
    this.commonservice.sendData(-1);
    
    localStorage.clear();
    localStorage.setItem('cart', JSON.stringify(this.products));
  }

  minus_qty(product:any,i:number){
    this.products[i]["qty"] -= 1;
    if(this.products[i]["qty"]==0){
      this.products.splice(i,1);
      this.commonservice.sendData(-1);
    }
    this.tt -= product.price;
    localStorage.clear();
    localStorage.setItem('cart', JSON.stringify(this.products));
  }
}
