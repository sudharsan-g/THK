import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductpgComponent } from './productpg/productpg.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    {path:"" ,redirectTo:"home",pathMatch:"full"},
    {path:"home",component:HomeComponent},
    {path:"product-listing",component:ProductListingComponent}, 
    {path:"productpg",component:ProductpgComponent},
    {path:"cart",component:CartComponent}
];
