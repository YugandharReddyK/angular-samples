import { Injectable } from '@angular/core';

// SERVICE: Shopping cart shared between components
@Injectable({
  providedIn: 'root',
})
export class Cart {
  private items: any[] = [];
  
  // Add item to cart
  addItem(product: any): void {
    this.items.push(product);
  }
  
  // Get all items
  getItems(): any[] {
    return this.items;
  }
  
  // Get total count
  getCount(): number {
    return this.items.length;
  }
  
  // Get total price
  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
  
  // Clear cart
  clearCart(): void {
    this.items = [];
  }
}
