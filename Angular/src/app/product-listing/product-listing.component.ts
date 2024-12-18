import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { MatInputModule } from '@angular/material/input'
import { DropdownModule } from 'primeng/dropdown';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductpgComponent } from '../productpg/productpg.component';
import e from 'express';
import { HttpClient } from '@angular/common/http';

// interface City {
//   name: string;
//   code: string;
// }

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [TabViewModule, RouterLink, MatInputModule, DropdownModule, FormsModule, ReactiveFormsModule, MatIconModule, ProductpgComponent],
  templateUrl: './product-listing.component.html',
  styleUrl: './product-listing.component.css'
})
export class ProductListingComponent implements OnInit {
  value: string = "";
  dic: any = { "Apple": 1, "Accessories": 2, "Cases": 3, "Android": 4 }
  http = inject(HttpClient);
  filtr: string = "";
  productdatas: any = {
    "Apple": [{ name: "All Products" }, { name: "Mac" }, { name: "iPad" }, { name: "iPhone" }, { name: "Watch" }, { name: "Airpods" }, { name: "Accessories" }]
  }
  phndatas: any = [{ name: "All Phones" }, { name: "Brand New Phones" }, { name: "Pre-Owned Phones" }]
  issort: boolean = false;
  category: string = "";
  products: any;
  showproductlst: any;
  selectedProduct: any;
  selectedphncon: any;
  productslst: any;

  ngOnInit(): void {
    this.fetch_product();
  }

  fetch_product() {
    this.http.get(`http://localhost:3000/api/products/${this.dic[this.category]}`).subscribe((data: any) => {
      this.productslst = data;
      console.log(this.productslst);
      if (data && this.filtr && this.filtr != "Android") {
        this.value = this.filtr;
        this.showproductlst = this.productslst.filter((product: any) => product.SubCategory === this.filtr);

      }
      else if (this.filtr == "Android") {
        this.value = "Filter by Products";
        this.showproductlst = this.productslst.filter((product: any) => product.SubCategory === this.filtr);
      }
      else {
        this.value = "Filter by Products";
        this.showproductlst = this.productslst;
      }
    });



  }
  // productslst:any = [
  //   {
  //     id: 1,
  //     name: "Apple 15 Pro",
  //     category: "iPhone",
  //     description: "Description of product 1",
  //     price: 9.99,
  //     condition : "Brand New"
  //   },
  //   {
  //     id: 2,
  //     name: "MacBook Pro",
  //     category: "Mac",
  //     description: "Description of product 2",
  //     price: 19.99,
  //     condition : "Pre-Owned"
  //   },
  //   {
  //     id: 3,
  //     name: "Apple Watch Series 9",
  //     category: "Watch",
  //     description: "Description of product 3",
  //     price: 29.99,condition : "Brand New"
  //   },
  //   {
  //     id: 4,
  //     name: "Magic Keyboard for iPad Pro 13",
  //     category: "Accessories",
  //     description: "Description of product 4",
  //     price: 39.99,
  //     condition : "Pre-Owned"
  //   },
  //   {
  //     id: 5,
  //     name: "AirPods Pro",
  //     category: "Accessories",
  //     description: "Description of product 5",
  //     price: 49.99,
  //     condition : "Brand New"
  //   },
  //   {
  //     id: 6,
  //     name: "HomePod - Midnight",
  //     category: "Accessories",
  //     description: "Description of product 6",
  //     price: 59.99,
  //     condition : "Pre-Owned"
  //   },
  //   {
  //     id: 7,
  //     name: "Magic Mouse",
  //     category: "Accessories",
  //     description: "Description of product 7",
  //     price: 69.99,
  //     condition : "Pre-Owned"
  //   },
  //   {
  //     id: 8,
  //     name: "Studio Display",
  //     category: "Accessories",
  //     description: "Description of product 8",
  //     price: 159900,
  //     condition : "Brand New"
  //   },
  //   {
  //     id: 9,
  //     name: "iPhone 14",
  //     category: "iPhone",
  //     description: "Description of product 9",
  //     price: 89.99,
  //     condition : "Pre-Owned"
  //   },
  //   {
  //     id: 10,
  //     name: "iPhone 13",
  //     category: "iPhone",
  //     description: "Description of product 10",
  //     price: 99.99,
  //     condition : "Pre-Owned"
  //   }
  // ]  
  showwhat(what: string) {

    if (what == "sort") {
      (document.querySelector(".sortbysection") as HTMLElement).style.display = "block";

    }
    else {
      (document.querySelector(".filterbysection") as HTMLElement).style.display = "block";
    }
  }

  sortby(what: string) {
    if (what == "low" || what == "high") {

      if (what == "low") {

        (document.querySelector(".high") as HTMLElement).style.color = '#3e4152';
        (document.querySelector(".low") as HTMLElement).style.color = '#0088CE';

      }
      else {
        (document.querySelector(".low") as HTMLElement).style.color = '#3e4152';
        (document.querySelector(".high") as HTMLElement).style.color = '#0088CE';
      }
      setTimeout(() => {
        (document.querySelector(".sortbysection") as HTMLElement).style.display = "none";
      }, 100);
    }
    else {

      if (what == "brandnew" || what == "preown") {
        if (what == "brandnew") {
          const brandNewElement = document.querySelector(".brandnew") as HTMLElement;
          const preOwnedElement = document.querySelector(".preown") as HTMLElement;

          if (brandNewElement.style.color === 'rgb(0, 136, 206)') {
            brandNewElement.style.color = "#3e4152";
          } else {
            preOwnedElement.style.color = "#3e4152";
            brandNewElement.style.color = "#0088CE";
          }
        }
        else {
          const brandNewElement = document.querySelector(".brandnew") as HTMLElement;
          const preOwnedElement = document.querySelector(".preown") as HTMLElement;

          if (preOwnedElement.style.color === 'rgb(0, 136, 206)') {
            preOwnedElement.style.color = "#3e4152";
          } else {
            brandNewElement.style.color = "#3e4152";
            preOwnedElement.style.color = "#0088CE";
          }
        }
      }
      else {

        if ((document.querySelector(`.${what}`) as HTMLElement).style.color === 'rgb(0, 136, 206)') {
          (document.querySelector(`.${what}`) as HTMLElement).style.color = "#3e4152";
        }
        else {
          (document.querySelectorAll(`.filterproduct`)).forEach((ele) => {
            (ele as HTMLElement).style.color = "black";
          });
          (document.querySelector(`.${what}`) as HTMLElement).style.color = '#0088CE';
        }


      }
      setTimeout(() => {
        (document.querySelector(".filterbysection") as HTMLElement).style.display = "none";
      }, 100);
    }

  }

  formatToIndianCurrency(num: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR', maximumFractionDigits: 0
    }).format(num);
  }

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.category = params['product'];
      this.products = this.productdatas[this.category];
      this.filtr = params["filter"];




    });
  }

  public sortProductsDesc() {
    this.issort = false;
    this.selectedProduct = this.showproductlst.sort((a: any, b: any) => b.price - a.price);
    document.querySelector('.btn-sort')?.classList.remove("pi-sort-amount-up-alt");
    document.querySelector(".btn-sort")?.classList.add("pi-sort-amount-down-alt");
    console.log(document.querySelector('.btn-sort')?.classList);
    console.log(this.selectedProduct);

  }

  public sortProductsAsc() {
    this.selectedProduct = this.showproductlst.sort((a: any, b: any) => a.price - b.price);
    this.issort = true;
    document.querySelector('btn-sort')?.classList.remove("pi-sort-amount-down-alt");
    document.querySelector(".btn-sort")?.classList.add("pi-sort-amount-up-alt");

    console.log(this.selectedProduct);

  }

  public filterProducts() {

    if (this.selectedProduct && this.selectedphncon) {
      if (this.selectedProduct.name === "All Products" && this.selectedphncon.name === "All Phones") {
        this.showproductlst = this.productslst;
      }

      else if (this.selectedProduct.name === "All Products") {
        if (this.selectedphncon) {
          this.showproductlst = this.productslst.filter((product: any) => {

            if (this.selectedphncon.name == "Brand New Phones") {
              return product.PhoneCondition === "Brand New";
            }
            else {
              return product.PhoneCondition === "Pre-Owned";
            }
          });
        }
        else {
          this.showproductlst = this.productslst;
        }
      }
      else if (this.selectedphncon.name === "All Phones") {
        if (this.selectedProduct) {
          this.showproductlst = this.productslst.filter((product: any) => {
            return product.SubCategory === this.selectedProduct.name;
          })
        }
      }

      else {
        this.showproductlst = this.productslst.filter((product: any) => {

          if (product.SubCategory === this.selectedProduct.name && this.selectedphncon.name == "Brand New Phones") {
            return product.SubCategory === this.selectedProduct.name && product.PhoneCondition === "Brand New";
          }
          else {
            return product.SubCategory === this.selectedProduct.name && product.PhoneCondition === "Pre-Owned";
          }
        });
      }

    }

    else if (this.selectedProduct) {
      if (this.selectedProduct.name === "All Products") {
        this.showproductlst = this.productslst;
      }
      else {
        this.showproductlst = this.productslst.filter((product: any) => product.SubCategory === this.selectedProduct.name);
      }

    }

    else if (this.selectedphncon && this.selectedProduct === undefined) {
      console.log("Umbi");
      if (this.selectedphncon.name === "All Phones") {
        this.showproductlst = this.productslst;
      }
      else {
        this.showproductlst = this.productslst.filter((product: any) => {

          if (this.selectedphncon.name == "Brand New Phones") {
            return product.PhoneCondition === "Brand New";
          }
          else {
            return product.PhoneCondition === "Pre-Owned";
          }
        });
      }
    }



  }

}
