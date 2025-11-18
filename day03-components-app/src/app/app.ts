import { Component } from '@angular/core';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';
import { CardComponent } from './card/card';
import { ProductListComponent } from './product-list/product-list';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, CardComponent, ProductListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Day 3: Components Deep Dive';
}
