import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [NgFor, NgIf],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductListComponent {
  // Simple product array
  products = [
    { id: 1, name: 'Laptop', price: 999, inStock: true },
    { id: 2, name: 'Phone', price: 699, inStock: true },
    { id: 3, name: 'Tablet', price: 499, inStock: false },
    { id: 4, name: 'Headphones', price: 199, inStock: true }
  ];
}
