# Day 30: Final Project - Full-Stack E-Commerce Application

## 🎯 Project Overview

Build a complete e-commerce application applying all concepts learned over the past 30 days.

### Application Features:
- ✅ Product catalog with search and filters
- ✅ Shopping cart with state management
- ✅ User authentication & authorization
- ✅ Checkout process with forms
- ✅ Order history
- ✅ Admin panel (lazy loaded)
- ✅ Responsive design
- ✅ Performance optimized

---

## 🏗️ Project Structure

```
e-commerce-app/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── cart.service.ts
│   │   │   │   ├── product.service.ts
│   │   │   │   └── order.service.ts
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── admin.guard.ts
│   │   │   └── interceptors/
│   │   │       ├── auth.interceptor.ts
│   │   │       └── error.interceptor.ts
│   │   ├── features/
│   │   │   ├── products/
│   │   │   │   ├── product-list/
│   │   │   │   ├── product-detail/
│   │   │   │   └── product-filter/
│   │   │   ├── cart/
│   │   │   │   ├── cart-page/
│   │   │   │   └── cart-item/
│   │   │   ├── checkout/
│   │   │   │   ├── checkout-form/
│   │   │   │   └── order-summary/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   └── register/
│   │   │   └── admin/
│   │   │       ├── dashboard/
│   │   │       ├── manage-products/
│   │   │       └── manage-orders/
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   ├── footer/
│   │   │   │   ├── loading-spinner/
│   │   │   │   └── error-message/
│   │   │   └── pipes/
│   │   │       ├── currency-format.pipe.ts
│   │   │       └── filter.pipe.ts
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   └── main.ts
```

---

## 📋 Step-by-Step Implementation Guide

### Phase 1: Setup & Core Services (Hours 1-2)

#### Step 1: Create Project

```bash
ng new e-commerce-app --standalone --routing --style=scss
cd e-commerce-app
```

#### Step 2: Install Dependencies

```bash
npm install @angular/material @angular/cdk
```

#### Step 3: Create Cart Service with Signals

```typescript
// src/app/core/services/cart.service.ts
import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  
  // Public readonly signals
  items = this.cartItems.asReadonly();
  
  itemCount = computed(() => 
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );
  
  subtotal = computed(() =>
    this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  );
  
  tax = computed(() => this.subtotal() * 0.1);
  
  total = computed(() => this.subtotal() + this.tax());

  addToCart(product: Product): void {
    const existingItem = this.cartItems().find(item => item.id === product.id);
    
    if (existingItem) {
      this.updateQuantity(product.id, existingItem.quantity + 1);
    } else {
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

  loadFromStorage(): void {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cartItems.set(JSON.parse(saved));
    }
  }

  saveToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }
}
```

#### Step 4: Create Product Service

```typescript
// src/app/core/services/product.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';
  
  searchTerm = signal('');
  selectedCategory = signal('');
  priceRange = signal({ min: 0, max: 1000 });

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`);
  }
}
```

#### Step 5: Create Auth Service

```typescript
// src/app/core/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  id: number;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  user = this.currentUser.asReadonly();
  
  isAuthenticated = signal(false);
  isAdmin = signal(false);

  constructor(private router: Router) {
    this.loadUserFromStorage();
  }

  login(email: string, password: string): boolean {
    // Simulate login - in real app, call backend API
    if (email && password) {
      const user: User = {
        id: 1,
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'user'
      };
      
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      this.isAdmin.set(user.role === 'admin');
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', 'fake-jwt-token');
      
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.isAdmin.set(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  private loadUserFromStorage(): void {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (savedUser && token) {
      const user: User = JSON.parse(savedUser);
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      this.isAdmin.set(user.role === 'admin');
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
```

---

### Phase 2: Components & UI (Hours 3-5)

#### Step 6: Header Component

```typescript
// src/app/shared/components/header/header.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="header">
      <div class="container">
        <div class="logo">
          <a routerLink="/">🛒 E-Shop</a>
        </div>
        
        <nav>
          <a routerLink="/">Home</a>
          <a routerLink="/products">Products</a>
          
          @if (authService.isAuthenticated()) {
            <a routerLink="/orders">My Orders</a>
            
            @if (authService.isAdmin()) {
              <a routerLink="/admin">Admin</a>
            }
          }
        </nav>
        
        <div class="actions">
          <a routerLink="/cart" class="cart-button">
            🛒 Cart ({{ cartService.itemCount() }})
            @if (cartService.itemCount() > 0) {
              <span class="cart-total">
                \${{ cartService.total().toFixed(2) }}
              </span>
            }
          </a>
          
          @if (authService.isAuthenticated()) {
            <span>{{ authService.user()?.name }}</span>
            <button (click)="authService.logout()">Logout</button>
          } @else {
            <a routerLink="/login" class="login-button">Login</a>
          }
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: #333;
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo a {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      text-decoration: none;
    }
    nav {
      display: flex;
      gap: 1.5rem;
    }
    nav a {
      color: white;
      text-decoration: none;
    }
    nav a:hover {
      text-decoration: underline;
    }
    .actions {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    .cart-button {
      background: #007bff;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      text-decoration: none;
    }
    .cart-total {
      margin-left: 0.5rem;
      font-weight: bold;
    }
    button, .login-button {
      background: #28a745;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
    }
  `]
})
export class HeaderComponent {
  constructor(
    public cartService: CartService,
    public authService: AuthService
  ) {}
}
```

#### Step 7: Product List Component

```typescript
// src/app/features/products/product-list/product-list.component.ts
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService, Product } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="product-list-page">
      <div class="filters">
        <h3>Filters</h3>
        
        <div class="filter-group">
          <label>Search:</label>
          <input 
            type="text" 
            [(ngModel)]="searchTerm"
            placeholder="Search products...">
        </div>
        
        <div class="filter-group">
          <label>Category:</label>
          <select [(ngModel)]="selectedCategory">
            <option value="">All Categories</option>
            <option *ngFor="let cat of categories()" [value]="cat">
              {{ cat }}
            </option>
          </select>
        </div>
        
        <div class="filter-group">
          <label>Price Range:</label>
          <input 
            type="range" 
            min="0" 
            max="1000" 
            [(ngModel)]="maxPrice">
          <span>\$0 - \${{ maxPrice }}</span>
        </div>
      </div>

      <div class="products-container">
        <h2>Products ({{ filteredProducts().length }})</h2>
        
        @if (loading()) {
          <div class="loading">Loading products...</div>
        }
        
        @if (error()) {
          <div class="error">{{ error() }}</div>
        }
        
        <div class="products-grid">
          @for (product of filteredProducts(); track product.id) {
            <div class="product-card">
              <img [src]="product.image" [alt]="product.name">
              <h3>{{ product.name }}</h3>
              <p class="price">\${{ product.price }}</p>
              <p class="description">{{ product.description | slice:0:100 }}...</p>
              <div class="actions">
                <button (click)="addToCart(product)" class="add-to-cart">
                  Add to Cart
                </button>
                <a [routerLink]="['/products', product.id]" class="view-details">
                  Details
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-list-page {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 2rem;
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    .filters {
      background: #f5f5f5;
      padding: 1rem;
      border-radius: 8px;
      height: fit-content;
    }
    .filter-group {
      margin-bottom: 1rem;
    }
    .filter-group label {
      display: block;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
    .filter-group input, .filter-group select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    .product-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .product-card img {
      width: 100%;
      height: 200px;
      object-fit: contain;
      margin-bottom: 1rem;
    }
    .price {
      font-size: 1.5rem;
      font-weight: bold;
      color: #007bff;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    .add-to-cart {
      flex: 1;
      background: #28a745;
      color: white;
      border: none;
      padding: 0.5rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .view-details {
      background: #007bff;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      text-decoration: none;
      text-align: center;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products = signal<Product[]>([]);
  categories = signal<string[]>([]);
  loading = signal(true);
  error = signal('');
  
  searchTerm = '';
  selectedCategory = '';
  maxPrice = 1000;

  filteredProducts = computed(() => {
    return this.products().filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || product.category === this.selectedCategory;
      const matchesPrice = product.price <= this.maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });
  });

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load products');
        this.loading.set(false);
      }
    });
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => this.categories.set(categories)
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.cartService.saveToStorage();
  }
}
```

---

### Phase 3: Routing & Guards (Hour 6)

#### Step 8: Configure Routes

```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/products', 
    pathMatch: 'full' 
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/product-list/product-list.component')
      .then(m => m.ProductListComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./features/products/product-detail/product-detail.component')
      .then(m => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart-page/cart-page.component')
      .then(m => m.CartPageComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout-form/checkout-form.component')
      .then(m => m.CheckoutFormComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/dashboard/dashboard.component')
      .then(m => m.AdminDashboardComponent),
    canActivate: [AuthGuard, AdminGuard]
  }
];
```

---

## 🎯 Key Implementation Points

### 1. State Management with Signals
- Cart state using `signal()` and `computed()`
- Reactive filters
- Automatic view updates

### 2. Performance Optimization
- Lazy loading routes
- OnPush change detection
- TrackBy functions
- Deferrable views for heavy components

### 3. Forms & Validation
- Reactive forms for checkout
- Custom validators
- Error messages

### 4. HTTP & RxJS
- Product API integration
- Error handling
- Retry logic
- Loading states

### 5. Guards & Interceptors
- Authentication guard
- Admin role guard
- Token interceptor
- Error interceptor

---

## ✅ Final Checklist

### Core Functionality:
- [ ] Product listing with filters
- [ ] Product details page
- [ ] Shopping cart with add/remove
- [ ] Cart persistence (localStorage)
- [ ] User authentication
- [ ] Protected routes
- [ ] Checkout form with validation
- [ ] Admin panel (lazy loaded)

### Code Quality:
- [ ] Standalone components throughout
- [ ] Signals for state management
- [ ] OnPush change detection
- [ ] Proper error handling
- [ ] Loading indicators
- [ ] Responsive design
- [ ] Accessibility features

### Performance:
- [ ] Lazy loaded routes
- [ ] Deferrable views
- [ ] Image optimization
- [ ] TrackBy in lists
- [ ] Pure pipes

### Testing:
- [ ] Unit tests for services
- [ ] Component tests
- [ ] E2E tests for critical paths

---

## 🚀 Deployment

```bash
# Build for production
ng build --configuration production

# Analyze bundle size
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json

# Deploy to hosting (e.g., Netlify, Vercel, Firebase)
```

---

## 📚 Presentation Checklist

- [ ] Demo all features
- [ ] Explain architecture decisions
- [ ] Show code organization
- [ ] Discuss performance optimizations
- [ ] Present challenges faced
- [ ] Share lessons learned
- [ ] Q&A session

---

**Congratulations!** 🎉 You've completed the 30-day Angular training by building a full-featured e-commerce application!
