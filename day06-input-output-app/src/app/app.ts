import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ChildComponent } from './child/child';
import { ProductCardComponent } from './product-card/product-card';
import { RatingComponent } from './rating/rating';

@Component({
  selector: 'app-root',
  imports: [NgFor, NgIf, ChildComponent, ProductCardComponent, RatingComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // PARENT DATA
  parentMessage = 'Hello from Parent!';
  parentName = 'John Doe';
  parentAge = 25;
  
  // Products array
  products = [
    { id: 1, name: 'Laptop', price: 999, image: '💻' },
    { id: 2, name: 'Phone', price: 699, image: '📱' },
    { id: 3, name: 'Tablet', price: 499, image: '📱' }
  ];
  
  // Rating data
  productRating = 0;
  
  // RECEIVE DATA FROM CHILD (@Output)
  receivedMessage = '';
  cartItems: any[] = [];
  
  // Handle message from child
  handleChildMessage(message: string): void {
    this.receivedMessage = message;
  }
  
  // Handle add to cart from child
  addToCart(product: any): void {
    this.cartItems.push(product);
    alert(`Added ${product.name} to cart!`);
  }
  
  // Handle rating change
  onRatingChange(rating: number): void {
    this.productRating = rating;
  }
}
