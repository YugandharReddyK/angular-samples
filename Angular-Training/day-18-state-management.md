# Day 18: Basic State Management Concepts

## Key Concepts

### 1. What is State?
- State is data that changes over time in your application.
- Examples: user info, shopping cart, form data, UI state (loading, errors).

### 2. Types of State
- **Local State**: Data within a single component.
- **Shared State**: Data shared across multiple components.
- **Global State**: Application-wide data (user session, theme, etc.).

### 3. Managing State with Services
- Services are singletons (one instance shared across the app).
- Perfect for sharing state between components.

---

## Sample Code

### Step 1: Local State (Component Level)

```typescript
// counter.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <h3>Counter: {{ count }}</h3>
    <button (click)="increment()">+</button>
    <button (click)="decrement()">-</button>
    <button (click)="reset()">Reset</button>
  `
})
export class CounterComponent {
  count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }
}
```

---

### Step 2: Shared State with Service

#### cart.service.ts
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  // Observable for components to subscribe to
  cart$: Observable<CartItem[]> = this.cartSubject.asObservable();

  addItem(item: CartItem) {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    
    this.cartSubject.next([...this.cartItems]);
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.cartSubject.next([...this.cartItems]);
  }

  updateQuantity(id: number, quantity: number) {
    const item = this.cartItems.find(i => i.id === id);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(id);
      } else {
        this.cartSubject.next([...this.cartItems]);
      }
    }
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next([]);
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getItemCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }
}
```

---

### Step 3: Using the Cart Service

#### product-list.component.ts
```typescript
import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-list',
  template: `
    <h3>Products</h3>
    <div *ngFor="let product of products">
      <p>{{ product.name }} - ${{ product.price }}</p>
      <button (click)="addToCart(product)">Add to Cart</button>
    </div>
  `
})
export class ProductListComponent {
  products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 29 },
    { id: 3, name: 'Keyboard', price: 79 }
  ];

  constructor(private cartService: CartService) {}

  addToCart(product: any) {
    this.cartService.addItem({ ...product, quantity: 1 });
  }
}
```

#### cart-display.component.ts
```typescript
import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-display',
  template: `
    <h3>Shopping Cart</h3>
    <div *ngIf="(cart$ | async)?.length === 0">
      <p>Your cart is empty</p>
    </div>
    <div *ngFor="let item of cart$ | async">
      <p>
        {{ item.name }} - ${{ item.price }} x {{ item.quantity }}
        <button (click)="increase(item.id)">+</button>
        <button (click)="decrease(item.id)">-</button>
        <button (click)="remove(item.id)">Remove</button>
      </p>
    </div>
    <hr>
    <p><strong>Total Items: {{ itemCount }}</strong></p>
    <p><strong>Total Price: ${{ totalPrice }}</strong></p>
    <button (click)="clearCart()" *ngIf="itemCount > 0">Clear Cart</button>
  `
})
export class CartDisplayComponent implements OnInit {
  cart$!: Observable<CartItem[]>;
  itemCount = 0;
  totalPrice = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart$ = this.cartService.cart$;
    
    this.cart$.subscribe(() => {
      this.itemCount = this.cartService.getItemCount();
      this.totalPrice = this.cartService.getTotal();
    });
  }

  increase(id: number) {
    const item = this.cartService['cartItems'].find((i: CartItem) => i.id === id);
    if (item) {
      this.cartService.updateQuantity(id, item.quantity + 1);
    }
  }

  decrease(id: number) {
    const item = this.cartService['cartItems'].find((i: CartItem) => i.id === id);
    if (item) {
      this.cartService.updateQuantity(id, item.quantity - 1);
    }
  }

  remove(id: number) {
    this.cartService.removeItem(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
```

---

### Step 4: Using Multiple Components Together

```html
<!-- app.component.html -->
<div class="container">
  <div class="products">
    <app-product-list></app-product-list>
  </div>
  <div class="cart">
    <app-cart-display></app-cart-display>
  </div>
</div>
```

---

## Practice Ideas

- Add a "favorites" feature using a similar service pattern.
- Create a user authentication state service (login/logout).
- Add persistence to the cart using `localStorage`.

---

## Challenge

- Build a **Task Management System** with shared state:
  - Create a `TaskService` to manage tasks.
  - Tasks should have: id, title, completed status, priority.
  - Create components:
    - `TaskListComponent`: Display all tasks
    - `AddTaskComponent`: Add new tasks
    - `TaskStatsComponent`: Show count of total/completed tasks
  - Use BehaviorSubject to keep all components in sync.
  - Add filter functionality (show all, active, completed).

---

## Bonus: State Management Best Practices

```typescript
// Example of immutable state updates
updateItem(id: number, updates: Partial<CartItem>) {
  this.cartItems = this.cartItems.map(item =>
    item.id === id ? { ...item, ...updates } : item
  );
  this.cartSubject.next([...this.cartItems]);
}
```

---

## Questions to Ask

- Why use BehaviorSubject instead of regular Subject?
- How does the service ensure all components stay synchronized?
- What happens if two components modify the state simultaneously?
- When would you need a more advanced state management library (NgRx, Akita)?

---