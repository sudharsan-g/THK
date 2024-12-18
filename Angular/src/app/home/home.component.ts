import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { CollectionsComponent } from '../collections/collections.component';
import { LandingProductlstComponent } from '../landing-productlst/landing-productlst.component';
import { QualityassuranceComponent } from '../qualityassurance/qualityassurance.component';
import { LandingFooterComponent } from '../landing-footer/landing-footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
imports: [CarouselComponent,CollectionsComponent,LandingProductlstComponent,QualityassuranceComponent,LandingProductlstComponent,LandingFooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
