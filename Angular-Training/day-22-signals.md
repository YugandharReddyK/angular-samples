# Day 22: Signals - Modern Reactivity (Angular 16+)

## 📚 Key Concepts

### 1. What are Signals?
**Signals** are a new reactive primitive introduced in Angular 16 that provide a more efficient and simpler way to handle reactive state.

**Key Features:**
- 🔄 Fine-grained reactivity
- ⚡ Better performance (no Zone.js dependency)
- 📝 Simpler syntax than Observables for many use cases
- 🎯 Automatic dependency tracking
- 🔍 Better debugging

### 2. Signals vs Observables vs Regular Variables

| Feature | Regular Variable | Observable | Signal |
|---------|-----------------|------------|--------|
| Reactivity | ❌ No | ✅ Yes | ✅ Yes |
| Synchronous | ✅ Yes | ❌ No | ✅ Yes |
| Complexity | Low | High | Medium |
| Performance | Good | Good | Excellent |
| Change Detection | Zone.js | Zone.js | Built-in |

---

## 🚀 Basic Signal Usage

### Creating and Reading Signals

```typescript
// counter.component.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <div class="counter">
      <h2>Counter: {{ count() }}</h2>
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>
      <button (click)="reset()">Reset</button>
    </div>
  `,
  styles: [`
    .counter {
      text-align: center;
      padding: 2rem;
    }
    button {
      margin: 0 0.5rem;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
    }
  `]
})
export class CounterComponent {
  // Create a signal with initial value
  count = signal(0);

  increment(): void {
    // Update signal value using set()
    this.count.set(this.count() + 1);
    
    // Or use update() to modify based on current value
    // this.count.update(value => value + 1);
  }

  decrement(): void {
    this.count.update(value => value - 1);
  }

  reset(): void {
    this.count.set(0);
  }
}
```

### Signal API Methods

```typescript
import { signal } from '@angular/core';

// 1. Create signal
const count = signal(0);

// 2. Read signal value (must call as function)
console.log(count()); // 0

// 3. Set new value
count.set(5);

// 4. Update based on current value
count.update(value => value + 1);

// 5. Mutate for objects/arrays (advanced)
const todos = signal([{ id: 1, text: 'Learn Signals' }]);
todos.mutate(list => list.push({ id: 2, text: 'Build App' }));
```

---

## 🧮 Computed Signals

Computed signals derive their value from other signals and automatically update when dependencies change.

```typescript
// shopping-cart.component.ts
import { Component, signal, computed } from '@angular/core';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  template: `
    <div class="cart">
      <h2>Shopping Cart</h2>
      
      <div *ngFor="let item of items()" class="cart-item">
        <span>{{ item.name }}</span>
        <span>\${{ item.price }} x {{ item.quantity }}</span>
        <button (click)="removeItem(item.id)">Remove</button>
      </div>
      
      <div class="summary">
        <p>Total Items: {{ totalItems() }}</p>
        <p>Subtotal: \${{ subtotal() }}</p>
        <p>Tax (10%): \${{ tax() }}</p>
        <p><strong>Total: \${{ total() }}</strong></p>
      </div>
      
      <button (click)="addSampleItem()">Add Sample Item</button>
      <button (click)="clearCart()">Clear Cart</button>
    </div>
  `,
  styles: [`
    .cart { padding: 2rem; }
    .cart-item {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      border-bottom: 1px solid #ddd;
    }
    .summary {
      margin-top: 1rem;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 8px;
    }
  `]
})
export class ShoppingCartComponent {
  // Base signal
  items = signal<CartItem[]>([
    { id: 1, name: 'Laptop', price: 999, quantity: 1 },
    { id: 2, name: 'Mouse', price: 25, quantity: 2 }
  ]);

  // Computed signals - automatically recalculate when items change
  totalItems = computed(() => {
    return this.items().reduce((sum, item) => sum + item.quantity, 0);
  });

  subtotal = computed(() => {
    return this.items().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  });

  tax = computed(() => {
    return this.subtotal() * 0.1;
  });

  total = computed(() => {
    return this.subtotal() + this.tax();
  });

  removeItem(id: number): void {
    this.items.update(items => items.filter(item => item.id !== id));
  }

  addSampleItem(): void {
    const newId = Math.max(...this.items().map(i => i.id), 0) + 1;
    this.items.update(items => [
      ...items,
      { id: newId, name: 'New Item', price: 50, quantity: 1 }
    ]);
  }

  clearCart(): void {
    this.items.set([]);
  }
}
```

---

## ⚡ Effects

Effects run side effects when signal values change.

```typescript
// logger.component.ts
import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-logger',
  standalone: true,
  template: `
    <div>
      <h2>Search Logger</h2>
      <input 
        type="text" 
        [value]="searchTerm()" 
        (input)="onSearch($event)"
        placeholder="Search...">
      <p>Search term: {{ searchTerm() }}</p>
      <p>Check console for logs</p>
    </div>
  `
})
export class LoggerComponent {
  searchTerm = signal('');

  constructor() {
    // Effect automatically runs when searchTerm changes
    effect(() => {
      console.log('Search term changed to:', this.searchTerm());
      
      // Example: Call analytics service
      if (this.searchTerm()) {
        console.log('Tracking search:', this.searchTerm());
      }
    });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }
}
```

### Effect with Cleanup

```typescript
import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-auto-save',
  standalone: true,
  template: `
    <textarea 
      [value]="content()" 
      (input)="updateContent($event)"
      rows="10"
      cols="50">
    </textarea>
    <p>{{ saveStatus() }}</p>
  `
})
export class AutoSaveComponent {
  content = signal('');
  saveStatus = signal('All changes saved');

  constructor() {
    effect((onCleanup) => {
      const currentContent = this.content();
      
      if (!currentContent) return;

      this.saveStatus.set('Saving...');
      
      // Set timeout for auto-save
      const timeoutId = setTimeout(() => {
        console.log('Auto-saving:', currentContent);
        this.saveStatus.set('Saved at ' + new Date().toLocaleTimeString());
      }, 1000);

      // Cleanup function - runs before next effect execution
      onCleanup(() => {
        clearTimeout(timeoutId);
      });
    });
  }

  updateContent(event: Event): void {
    const value = (event.target as HTMLTextAreaElement).value;
    this.content.set(value);
  }
}
```

---

## 🔄 Signals with Services (State Management)

```typescript
// cart.service.ts
import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Private signal - only service can modify
  private cartItems = signal<CartItem[]>([]);

  // Public readonly computed signals
  items = this.cartItems.asReadonly();
  
  itemCount = computed(() => 
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  total = computed(() => 
    this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );

  addToCart(product: Product): void {
    const existingItem = this.cartItems().find(item => item.id === product.id);
    
    if (existingItem) {
      // Update quantity
      this.cartItems.update(items =>
        items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new item
      this.cartItems.update(items => [...items, { ...product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number): void {
    this.cartItems.update(items => items.filter(item => item.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItems.update(items =>
      items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}
```

```typescript
// product-list.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, Product } from './cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-list">
      <h2>Products</h2>
      
      <div class="cart-badge">
        Cart: {{ cartService.itemCount() }} items 
        (\${{ cartService.total() }})
      </div>
      
      <div class="products">
        <div *ngFor="let product of products()" class="product">
          <h3>{{ product.name }}</h3>
          <p class="price">\${{ product.price }}</p>
          <button (click)="addToCart(product)">Add to Cart</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-list { padding: 2rem; }
    .cart-badge {
      background: #007bff;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      display: inline-block;
      margin-bottom: 1rem;
    }
    .products {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    .product {
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 8px;
    }
  `]
})
export class ProductListComponent {
  products = signal<Product[]>([
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 },
    { id: 4, name: 'Monitor', price: 300 }
  ]);

  constructor(public cartService: CartService) {}

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
```

---

## 🔀 Signals vs Observables

### When to Use Signals
✅ Synchronous state management  
✅ Component local state  
✅ Derived/computed values  
✅ Simple reactive data  

### When to Use Observables
✅ Async operations (HTTP, timers)  
✅ Event streams  
✅ Complex data transformations  
✅ Multiple async operations  

### Using Both Together

```typescript
// user.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  // Convert Observable to Signal using toSignal()
  users = toSignal(this.http.get<User[]>(this.apiUrl), {
    initialValue: [] as User[]
  });
}
```

```typescript
// user-display.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Users</h2>
    <div *ngFor="let user of userService.users()">
      {{ user.name }} - {{ user.email }}
    </div>
  `
})
export class UserDisplayComponent {
  constructor(public userService: UserService) {}
}
```

---

## 🎯 Practice Ideas

### Practice 1: Todo App with Signals
Build a todo application using Signals:
- Add/remove todos
- Mark as complete
- Filter (all, active, completed)
- Computed: total count, completed count

### Practice 2: Form with Live Validation
Create a signup form:
- Username, email, password signals
- Computed: form validity, error messages
- Effect: Real-time validation feedback

### Practice 3: Real-time Search
Build a search interface:
- Search term signal
- Filter results using computed
- Effect: Log searches, analytics

### Practice 4: Theme Switcher
Implement theme switching:
- Theme signal (light/dark)
- Effect: Apply theme to document
- Persist to localStorage

### Practice 5: Multi-Step Form
Create wizard-style form:
- Current step signal
- Form data signals for each step
- Computed: overall progress, can proceed

---

## 💡 Best Practices

1. **Use signals for synchronous reactive state**
   ```typescript
   // Good
   count = signal(0);
   
   // Not for async
   // Use Observable/toSignal instead
   ```

2. **Make signals readonly when exposing from services**
   ```typescript
   private _items = signal<Item[]>([]);
   items = this._items.asReadonly();
   ```

3. **Use computed for derived values**
   ```typescript
   // Good
   total = computed(() => this.items().reduce(...));
   
   // Avoid
   getTotal() { return this.items().reduce(...); }
   ```

4. **Use effects for side effects, not computations**
   ```typescript
   // Good - side effect
   effect(() => {
     console.log('Value changed:', this.value());
   });
   
   // Bad - use computed instead
   effect(() => {
     this.derivedValue = this.value() * 2;
   });
   ```

---

## 🐛 Common Mistakes

❌ **Forgetting to call signal as function**
```typescript
// Wrong
<p>{{ count }}</p>

// Correct
<p>{{ count() }}</p>
```

❌ **Mutating signal directly**
```typescript
// Wrong
count = signal(0);
count = 5; // Error!

// Correct
count.set(5);
```

❌ **Using effect for derived values**
```typescript
// Wrong
effect(() => {
  this.doubled = this.count() * 2;
});

// Correct
doubled = computed(() => this.count() * 2);
```

---

## 📚 Additional Resources

- [Angular Signals Guide](https://angular.dev/guide/signals)
- [Signals Deep Dive](https://blog.angular.dev/angular-signals-a-deep-dive)
- [RxJS Interop](https://angular.dev/guide/signals/rxjs-interop)

---

## ✅ Checklist

- [ ] Understand what Signals are and why they exist
- [ ] Create and read signals with signal()
- [ ] Update signals with set(), update(), mutate()
- [ ] Create computed signals
- [ ] Use effects for side effects
- [ ] Implement signal-based state management service
- [ ] Convert Observable to Signal with toSignal()
- [ ] Know when to use Signals vs Observables
- [ ] Build complete app using Signals
