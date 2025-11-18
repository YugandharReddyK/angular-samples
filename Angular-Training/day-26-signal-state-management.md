# Day 26: Signal-Based State Management

## 📚 Key Concepts

### 1. What is State Management?
**State management** is the practice of managing application data (state) in a predictable, centralized way. It becomes crucial as apps grow in complexity.

### 2. State Management with Signals
Angular Signals provide a modern, built-in way to manage state without external libraries like NgRx (though NgRx is still valuable for complex scenarios).

### Benefits of Signal-Based State:
✅ **Simple** - No boilerplate, built into Angular  
✅ **Performant** - Fine-grained reactivity  
✅ **Type-safe** - Full TypeScript support  
✅ **Testable** - Easy to test services  
✅ **Composable** - Computed signals for derived state  

---

## 🏗️ State Management Patterns

### Pattern 1: Service with Signals (Recommended)

```typescript
// state/todo.service.ts
import { Injectable, signal, computed } from '@angular/core';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TodoStateService {
  // Private writable signal
  private todos = signal<Todo[]>([]);
  
  // Public readonly signal
  allTodos = this.todos.asReadonly();
  
  // Computed signals (derived state)
  activeTodos = computed(() => 
    this.todos().filter(todo => !todo.completed)
  );
  
  completedTodos = computed(() =>
    this.todos().filter(todo => todo.completed)
  );
  
  activeCount = computed(() => this.activeTodos().length);
  
  completedCount = computed(() => this.completedTodos().length);
  
  totalCount = computed(() => this.todos().length);
  
  // Actions (methods that modify state)
  addTodo(text: string): void {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    };
    
    this.todos.update(todos => [...todos, newTodo]);
  }
  
  toggleTodo(id: number): void {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }
  
  deleteTodo(id: number): void {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }
  
  updateTodo(id: number, text: string): void {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, text } : todo
      )
    );
  }
  
  clearCompleted(): void {
    this.todos.update(todos => todos.filter(todo => !todo.completed));
  }
  
  loadFromStorage(): void {
    const saved = localStorage.getItem('todos');
    if (saved) {
      const parsed = JSON.parse(saved);
      this.todos.set(parsed.map((t: any) => ({
        ...t,
        createdAt: new Date(t.createdAt)
      })));
    }
  }
  
  saveToStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos()));
  }
}
```

### Using the State Service in Components

```typescript
// components/todo-list.component.ts
import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoStateService } from '../state/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="todo-app">
      <h1>Todo App with Signals</h1>
      
      <!-- Add Todo Form -->
      <div class="add-todo">
        <input 
          type="text" 
          [(ngModel)]="newTodoText"
          (keyup.enter)="addTodo()"
          placeholder="What needs to be done?">
        <button (click)="addTodo()">Add</button>
      </div>
      
      <!-- Stats -->
      <div class="stats">
        <span>Total: {{ todoState.totalCount() }}</span>
        <span>Active: {{ todoState.activeCount() }}</span>
        <span>Completed: {{ todoState.completedCount() }}</span>
      </div>
      
      <!-- Filter Tabs -->
      <div class="filters">
        <button 
          [class.active]="filter === 'all'" 
          (click)="filter = 'all'">
          All
        </button>
        <button 
          [class.active]="filter === 'active'" 
          (click)="filter = 'active'">
          Active
        </button>
        <button 
          [class.active]="filter === 'completed'" 
          (click)="filter = 'completed'">
          Completed
        </button>
      </div>
      
      <!-- Todo List -->
      <div class="todos">
        @for (todo of displayedTodos(); track todo.id) {
          <div class="todo-item" [class.completed]="todo.completed">
            <input 
              type="checkbox" 
              [checked]="todo.completed"
              (change)="todoState.toggleTodo(todo.id)">
            
            @if (editingId === todo.id) {
              <input 
                type="text" 
                [(ngModel)]="editText"
                (keyup.enter)="saveEdit(todo.id)"
                (blur)="saveEdit(todo.id)"
                class="edit-input">
            } @else {
              <span (dblclick)="startEdit(todo.id, todo.text)">
                {{ todo.text }}
              </span>
            }
            
            <button 
              class="delete" 
              (click)="todoState.deleteTodo(todo.id)">
              ✕
            </button>
          </div>
        } @empty {
          <p class="empty">No todos yet!</p>
        }
      </div>
      
      <!-- Actions -->
      @if (todoState.completedCount() > 0) {
        <button 
          class="clear-completed" 
          (click)="todoState.clearCompleted()">
          Clear Completed ({{ todoState.completedCount() }})
        </button>
      }
    </div>
  `,
  styles: [`
    .todo-app {
      max-width: 600px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .add-todo {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .add-todo input {
      flex: 1;
      padding: 0.75rem;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    .stats {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      padding: 0.5rem;
      background: #f5f5f5;
      border-radius: 4px;
    }
    
    .filters {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .filters button {
      padding: 0.5rem 1rem;
      background: white;
      border: 2px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .filters button.active {
      background: #007bff;
      color: white;
      border-color: #007bff;
    }
    
    .todo-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      border-bottom: 1px solid #ddd;
    }
    
    .todo-item.completed span {
      text-decoration: line-through;
      color: #999;
    }
    
    .todo-item span {
      flex: 1;
    }
    
    .delete {
      background: #dc3545;
      color: white;
      border: none;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .clear-completed {
      margin-top: 1rem;
      width: 100%;
      padding: 0.75rem;
      background: #ffc107;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class TodoListComponent implements OnInit {
  newTodoText = '';
  filter: 'all' | 'active' | 'completed' = 'all';
  editingId: number | null = null;
  editText = '';
  
  constructor(public todoState: TodoStateService) {
    // Auto-save to localStorage when todos change
    effect(() => {
      const todos = this.todoState.allTodos();
      this.todoState.saveToStorage();
    });
  }
  
  ngOnInit(): void {
    this.todoState.loadFromStorage();
  }
  
  displayedTodos = computed(() => {
    switch (this.filter) {
      case 'active':
        return this.todoState.activeTodos();
      case 'completed':
        return this.todoState.completedTodos();
      default:
        return this.todoState.allTodos();
    }
  });
  
  addTodo(): void {
    if (this.newTodoText.trim()) {
      this.todoState.addTodo(this.newTodoText.trim());
      this.newTodoText = '';
    }
  }
  
  startEdit(id: number, text: string): void {
    this.editingId = id;
    this.editText = text;
  }
  
  saveEdit(id: number): void {
    if (this.editText.trim()) {
      this.todoState.updateTodo(id, this.editText.trim());
    }
    this.editingId = null;
    this.editText = '';
  }
}
```

---

## 🛒 Real-World Example: E-Commerce Cart

```typescript
// state/cart-state.service.ts
import { Injectable, signal, computed, effect } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Coupon {
  code: string;
  discount: number; // percentage
}

@Injectable({
  providedIn: 'root'
})
export class CartStateService {
  // State
  private items = signal<CartItem[]>([]);
  private appliedCoupon = signal<Coupon | null>(null);
  
  // Selectors (read-only)
  cartItems = this.items.asReadonly();
  coupon = this.appliedCoupon.asReadonly();
  
  // Computed values
  itemCount = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );
  
  subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );
  
  discount = computed(() => {
    const coupon = this.appliedCoupon();
    return coupon ? this.subtotal() * (coupon.discount / 100) : 0;
  });
  
  tax = computed(() => (this.subtotal() - this.discount()) * 0.1);
  
  total = computed(() => this.subtotal() - this.discount() + this.tax());
  
  isEmpty = computed(() => this.items().length === 0);
  
  // Actions
  addItem(product: Product): void {
    const existing = this.items().find(item => item.id === product.id);
    
    if (existing) {
      this.updateQuantity(product.id, existing.quantity + 1);
    } else {
      this.items.update(items => [...items, { ...product, quantity: 1 }]);
    }
  }
  
  removeItem(productId: number): void {
    this.items.update(items => items.filter(item => item.id !== productId));
  }
  
  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    
    this.items.update(items =>
      items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }
  
  applyCoupon(code: string): boolean {
    // Simulate coupon validation
    const validCoupons: { [key: string]: number } = {
      'SAVE10': 10,
      'SAVE20': 20,
      'HALF': 50
    };
    
    const discount = validCoupons[code.toUpperCase()];
    
    if (discount) {
      this.appliedCoupon.set({ code, discount });
      return true;
    }
    
    return false;
  }
  
  removeCoupon(): void {
    this.appliedCoupon.set(null);
  }
  
  clearCart(): void {
    this.items.set([]);
    this.appliedCoupon.set(null);
  }
  
  constructor() {
    // Auto-save to localStorage
    effect(() => {
      localStorage.setItem('cart', JSON.stringify({
        items: this.items(),
        coupon: this.appliedCoupon()
      }));
    });
    
    // Load on init
    this.loadFromStorage();
  }
  
  private loadFromStorage(): void {
    const saved = localStorage.getItem('cart');
    if (saved) {
      const { items, coupon } = JSON.parse(saved);
      this.items.set(items || []);
      this.appliedCoupon.set(coupon);
    }
  }
}
```

---

## 🎯 Practice Ideas

### Practice 1: User Preferences State
Create a service to manage:
- Theme (light/dark)
- Language
- Notifications enabled
- Auto-save preferences to localStorage

### Practice 2: Notes App
Build a notes application with:
- Create/edit/delete notes
- Categories/tags
- Search/filter
- Persistence

### Practice 3: Shopping Cart
Implement full shopping cart:
- Add/remove products
- Update quantities
- Apply coupons
- Calculate totals with tax

### Practice 4: Multi-Step Form State
Create wizard form state:
- Current step
- Form data for each step
- Validation state
- Progress tracking

---

## 💡 Best Practices

1. **Encapsulate state in services**
   ```typescript
   private items = signal([]);
   items = this.items.asReadonly();
   ```

2. **Use computed for derived state**
   ```typescript
   total = computed(() => this.items().reduce(...));
   ```

3. **Immutable updates**
   ```typescript
   this.items.update(items => [...items, newItem]);
   ```

4. **Use effects for side effects**
   ```typescript
   effect(() => {
     localStorage.setItem('data', JSON.stringify(this.data()));
   });
   ```

5. **Type your state**
   ```typescript
   interface AppState {
     users: User[];
     loading: boolean;
     error: string | null;
   }
   ```

---

## ✅ Checklist

- [ ] Create state service with signals
- [ ] Implement computed selectors
- [ ] Add actions (methods to modify state)
- [ ] Use effects for persistence
- [ ] Make state immutable
- [ ] Expose read-only signals
- [ ] Add proper TypeScript types
- [ ] Implement real-world state management
