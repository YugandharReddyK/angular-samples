import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Interface to define the structure of a product
interface Product {
  id: number;
  name: string;
  price: number;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class ProductsComponent {
  // Sample product data with IDs
  products: Product[] = [
    { id: 1, name: 'Laptop', price: 999, icon: '💻', description: 'Powerful laptop for work and gaming' },
    { id: 2, name: 'Smartphone', price: 699, icon: '📱', description: 'Latest smartphone with great camera' },
    { id: 3, name: 'Smartwatch', price: 299, icon: '⌚', description: 'Track your fitness and stay connected' },
    { id: 4, name: 'Headphones', price: 199, icon: '🎧', description: 'Noise-canceling wireless headphones' },
    { id: 5, name: 'Tablet', price: 499, icon: '📲', description: 'Portable tablet for reading and browsing' },
    { id: 6, name: 'Camera', price: 799, icon: '📷', description: 'Professional digital camera' }
  ];
}
