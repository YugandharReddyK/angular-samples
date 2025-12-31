import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss'
})
export class ShoppingCart {
  products = signal<Product[]>([
    { id: 1, name: 'Laptop', price: 999.99, image: '💻' },
    { id: 2, name: 'Mouse', price: 29.99, image: '🖱️' },
    { id: 3, name: 'Keyboard', price: 79.99, image: '⌨️' },
    { id: 4, name: 'Monitor', price: 299.99, image: '🖥️' },
    { id: 5, name: 'Headphones', price: 149.99, image: '🎧' },
    { id: 6, name: 'Webcam', price: 89.99, image: '📷' }
  ]);

  cart = signal<CartItem[]>([]);
  discountCode = signal('');

  // Computed values
  cartItems = computed(() => this.cart());
  
  subtotal = computed(() => 
    this.cart().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  itemCount = computed(() => 
    this.cart().reduce((sum, item) => sum + item.quantity, 0)
  );

  tax = computed(() => this.subtotal() * 0.1);

  discount = computed(() => {
    const code = this.discountCode().toUpperCase();
    if (code === 'SAVE10') return this.subtotal() * 0.1;
    if (code === 'SAVE20') return this.subtotal() * 0.2;
    return 0;
  });

  total = computed(() => 
    this.subtotal() + this.tax() - this.discount()
  );

  isEmpty = computed(() => this.cart().length === 0);

  // Methods
  addToCart(product: Product) {
    const existingItem = this.cart().find(item => item.id === product.id);
    
    if (existingItem) {
      this.updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      this.cart.update(items => [...items, { ...product, quantity: 1 }]);
    }
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.cart.update(items =>
        items.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }

  removeFromCart(productId: number) {
    this.cart.update(items => items.filter(item => item.id !== productId));
  }

  clearCart() {
    this.cart.set([]);
    this.discountCode.set('');
  }

  applyDiscount(code: string) {
    this.discountCode.set(code);
  }
}
