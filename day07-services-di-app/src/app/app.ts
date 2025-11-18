import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Logger } from './services/logger';
import { Data } from './services/data';
import { Cart } from './services/cart';
import { ComponentAComponent } from './component-a/component-a';
import { ComponentBComponent } from './component-b/component-b';

@Component({
  selector: 'app-root',
  imports: [NgFor, NgIf, ComponentAComponent, ComponentBComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // INJECT SERVICES via constructor - This is Dependency Injection!
  constructor(
    private logger: Logger,
    private dataService: Data,
    public cartService: Cart
  ) {
    // Log when app starts
    this.logger.log('App Component Initialized');
  }
  
  products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 },
    { id: 3, name: 'Tablet', price: 499 }
  ];
  
  // Use logger service
  logMessage(message: string): void {
    this.logger.log(message);
  }
  
  // Use cart service
  addToCart(product: any): void {
    this.cartService.addItem(product);
    this.logger.log(`Added ${product.name} to cart`);
  }
  
  // Get logs from logger service
  getLogs(): string[] {
    return this.logger.getLogs();
  }
}
