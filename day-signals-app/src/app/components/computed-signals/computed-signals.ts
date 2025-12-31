import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-computed-signals',
  imports: [CommonModule],
  templateUrl: './computed-signals.html',
  styleUrl: './computed-signals.scss'
})
export class ComputedSignals {
  // Base signals
  firstName = signal('John');
  lastName = signal('Doe');
  quantity = signal(5);
  price = signal(29.99);

  // Cart items
  cartItems = signal<CartItem[]>([
    { id: 1, name: 'Laptop', price: 999.99, quantity: 1 },
    { id: 2, name: 'Mouse', price: 29.99, quantity: 2 },
    { id: 3, name: 'Keyboard', price: 79.99, quantity: 1 }
  ]);

  // Computed signals - automatically update when dependencies change
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
  
  total = computed(() => this.quantity() * this.price());
  
  formattedTotal = computed(() => `$${this.total().toFixed(2)}`);

  // Cart computations
  cartTotal = computed(() => 
    this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  cartItemCount = computed(() => 
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  cartSummary = computed(() => {
    const total = this.cartTotal();
    const count = this.cartItemCount();
    const tax = total * 0.1;
    const grandTotal = total + tax;
    return {
      subtotal: total,
      tax,
      total: grandTotal,
      itemCount: count
    };
  });

  // Methods
  updateFirstName(name: string) {
    this.firstName.set(name);
  }

  updateLastName(name: string) {
    this.lastName.set(name);
  }

  incrementQuantity() {
    this.quantity.update(q => q + 1);
  }

  decrementQuantity() {
    if (this.quantity() > 0) {
      this.quantity.update(q => q - 1);
    }
  }

  updatePrice(price: number) {
    this.price.set(price);
  }

  updateItemQuantity(itemId: number, newQuantity: number) {
    this.cartItems.update(items => 
      items.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  removeCartItem(itemId: number) {
    this.cartItems.update(items => items.filter(item => item.id !== itemId));
  }
}
