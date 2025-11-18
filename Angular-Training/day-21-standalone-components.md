# Day 21: Standalone Components (Modern Angular)

## 📚 Key Concepts

### 1. What are Standalone Components?
- **Introduced in Angular 14**, stable in Angular 15+
- Components that don't require NgModules
- Simpler, more modular architecture
- Easier to understand and maintain
- Recommended approach for new Angular applications

### 2. Benefits of Standalone Components
✅ **Reduced boilerplate** - No need for NgModule declarations  
✅ **Better tree-shaking** - Smaller bundle sizes  
✅ **Simpler mental model** - Direct imports where needed  
✅ **Easier testing** - Less setup required  
✅ **Gradual migration** - Can mix with NgModule-based code  

---

## 🔄 Traditional vs Standalone Comparison

### ❌ Traditional NgModule Approach

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### ✅ Modern Standalone Approach

```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent);
```

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <main>
      <h1>Welcome to Standalone Components!</h1>
    </main>
    <app-footer></app-footer>
  `
})
export class AppComponent {
  title = 'Standalone App';
}
```

---

## 🚀 Creating Standalone Components

### Step 1: Create Standalone Component with CLI

```bash
ng generate component header --standalone
```

### Step 2: Manual Standalone Component

```typescript
// card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for *ngIf, *ngFor, etc.
  template: `
    <div class="card">
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <button *ngIf="showButton" (click)="onAction()">
        {{ buttonText }}
      </button>
    </div>
  `,
  styles: [`
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin: 16px 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    button {
      background: #007bff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class CardComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() buttonText = 'Click Me';
  @Input() showButton = true;

  onAction(): void {
    alert(`Action triggered from ${this.title}`);
  }
}
```

---

## 🔌 Standalone Components with Services

```typescript
// user.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Available globally
})
export class UserService {
  private users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  getUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }
}
```

```typescript
// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>User List</h2>
    <ul>
      <li *ngFor="let user of users">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>
  `
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }
}
```

---

## 🛣️ Routing with Standalone Components

### Step 1: Configure Routes

```typescript
// app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)
  }
];
```

### Step 2: Bootstrap Application with Routing

```typescript
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
  ]
});
```

### Step 3: Add Router Outlet

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/">Home</a>
      <a routerLink="/about">About</a>
      <a routerLink="/contact">Contact</a>
      <a routerLink="/admin">Admin</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav {
      background: #333;
      padding: 1rem;
    }
    nav a {
      color: white;
      margin-right: 1rem;
      text-decoration: none;
    }
    nav a:hover {
      text-decoration: underline;
    }
  `]
})
export class AppComponent {}
```

---

## 📝 Forms with Standalone Components

### Template-Driven Forms

```typescript
// contact-form.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Contact Us</h2>
    <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">
      <div>
        <label>Name:</label>
        <input 
          type="text" 
          name="name" 
          [(ngModel)]="formData.name" 
          required>
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          [(ngModel)]="formData.email" 
          required 
          email>
      </div>
      <div>
        <label>Message:</label>
        <textarea 
          name="message" 
          [(ngModel)]="formData.message" 
          required>
        </textarea>
      </div>
      <button type="submit" [disabled]="!contactForm.valid">
        Submit
      </button>
    </form>
  `
})
export class ContactFormComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit(form: any): void {
    if (form.valid) {
      console.log('Form submitted:', this.formData);
      alert('Thank you for contacting us!');
      form.reset();
    }
  }
}
```

### Reactive Forms

```typescript
// registration-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Register</h2>
    <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
      <div>
        <label>Username:</label>
        <input type="text" formControlName="username">
        <div *ngIf="registrationForm.get('username')?.invalid && registrationForm.get('username')?.touched">
          <small>Username is required (min 3 characters)</small>
        </div>
      </div>
      
      <div>
        <label>Email:</label>
        <input type="email" formControlName="email">
        <div *ngIf="registrationForm.get('email')?.invalid && registrationForm.get('email')?.touched">
          <small>Valid email is required</small>
        </div>
      </div>
      
      <div>
        <label>Password:</label>
        <input type="password" formControlName="password">
        <div *ngIf="registrationForm.get('password')?.invalid && registrationForm.get('password')?.touched">
          <small>Password must be at least 6 characters</small>
        </div>
      </div>
      
      <button type="submit" [disabled]="!registrationForm.valid">
        Register
      </button>
    </form>
  `
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Registration data:', this.registrationForm.value);
      alert('Registration successful!');
      this.registrationForm.reset();
    }
  }
}
```

---

## 🌐 HTTP Client with Standalone

```typescript
// main.ts - Provide HttpClient
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient()
  ]
});
```

```typescript
// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
```

```typescript
// product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from './product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Products</h2>
    
    <div *ngIf="loading">Loading products...</div>
    
    <div *ngIf="error" class="error">
      Error: {{ error }}
    </div>
    
    <div class="products">
      <div *ngFor="let product of products" class="product-card">
        <h3>{{ product.title }}</h3>
        <p>{{ product.description | slice:0:100 }}...</p>
        <p class="price">\${{ product.price }}</p>
      </div>
    </div>
  `,
  styles: [`
    .products {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }
    .product-card {
      border: 1px solid #ddd;
      padding: 1rem;
      border-radius: 8px;
    }
    .price {
      font-weight: bold;
      color: #007bff;
    }
    .error {
      color: red;
      padding: 1rem;
      background: #ffe6e6;
      border-radius: 4px;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
```

---

## 🔄 Migration from NgModule to Standalone

### Step 1: Convert Components One by One

```typescript
// Before (NgModule)
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {}

// After (Standalone)
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html'
})
export class HeaderComponent {}
```

### Step 2: Use Angular CLI Migration

```bash
ng generate @angular/core:standalone
```

---

## 🎯 Practice Ideas

### Practice 1: Build Todo App with Standalone Components
Create a todo application using only standalone components:
- `TodoListComponent`
- `TodoItemComponent`
- `AddTodoComponent`
- `TodoService`

### Practice 2: Product Catalog
Build a product catalog with:
- Product list (fetch from API)
- Product details (routing with params)
- Shopping cart (shared service)
- Checkout form (reactive forms)

### Practice 3: User Dashboard
Create a user dashboard with:
- Authentication (guards)
- Profile page
- Settings page
- Lazy-loaded admin panel

### Practice 4: Blog Platform
Build a simple blog:
- Post list
- Post details
- Create post form
- Comments section

---

## 💡 Best Practices

1. **Use standalone: true for new components**
   ```typescript
   ng generate component my-component --standalone
   ```

2. **Import only what you need**
   ```typescript
   imports: [CommonModule, FormsModule] // Not entire modules
   ```

3. **Use provideHttpClient() instead of HttpClientModule**
   ```typescript
   bootstrapApplication(AppComponent, {
     providers: [provideHttpClient()]
   });
   ```

4. **Lazy load components, not modules**
   ```typescript
   {
     path: 'admin',
     loadComponent: () => import('./admin.component').then(m => m.AdminComponent)
   }
   ```

---

## 🐛 Common Mistakes

❌ **Forgetting standalone: true**
```typescript
@Component({
  selector: 'app-card',
  // Missing standalone: true
  template: `<div>Card</div>`
})
```

❌ **Not importing CommonModule**
```typescript
@Component({
  standalone: true,
  // Missing CommonModule for *ngIf, *ngFor
  template: `<div *ngIf="show">Content</div>`
})
```

❌ **Using old bootstrap method**
```typescript
// Don't use platformBrowserDynamic
platformBrowserDynamic().bootstrapModule(AppModule);

// Use bootstrapApplication
bootstrapApplication(AppComponent);
```

---

## 📚 Additional Resources

- [Angular Standalone Components Guide](https://angular.dev/guide/components/importing)
- [Migration Guide](https://angular.dev/reference/migrations/standalone)
- [Standalone APIs](https://angular.dev/guide/standalone-components)

---

## ✅ Checklist

- [ ] Understand what standalone components are
- [ ] Create standalone component with CLI
- [ ] Set up routing with standalone components
- [ ] Use forms (template-driven and reactive) in standalone
- [ ] Integrate HTTP client with standalone architecture
- [ ] Implement lazy loading for standalone components
- [ ] Migrate existing NgModule component to standalone
- [ ] Build complete app using only standalone components
