import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [RouterLink,DividerModule],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent {

}
