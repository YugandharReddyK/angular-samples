# Day 27: Advanced Testing - Unit & E2E

## 📚 Key Concepts

### 1. Why Testing Matters
- **Catch bugs early** - Before production
- **Refactor confidently** - Tests ensure nothing breaks
- **Documentation** - Tests show how code should work
- **Better design** - Testable code is often better code

### 2. Types of Testing in Angular

| Type | Scope | Tools | Speed |
|------|-------|-------|-------|
| **Unit Tests** | Individual functions/components | Jasmine, Jest | Fast ⚡ |
| **Integration Tests** | Multiple components together | Jasmine, Jest | Medium |
| **E2E Tests** | Full application flow | Playwright, Cypress | Slow 🐌 |

---

## 🧪 Unit Testing with Jasmine & Karma

### Testing Services

```typescript
// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

```typescript
// user.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, User } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify no outstanding HTTP requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers', () => {
    it('should return an array of users', () => {
      const mockUsers: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ];

      service.getUsers().subscribe(users => {
        expect(users).toEqual(mockUsers);
        expect(users.length).toBe(2);
      });

      const req = httpMock.expectOne('https://api.example.com/users');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });

    it('should handle HTTP errors', () => {
      const errorMessage = 'Server error';

      service.getUsers().subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.status).toBe(500);
        }
      });

      const req = httpMock.expectOne('https://api.example.com/users');
      req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getUserById', () => {
    it('should return a user by id', () => {
      const mockUser: User = { id: 1, name: 'John Doe', email: 'john@example.com' };

      service.getUserById(1).subscribe(user => {
        expect(user).toEqual(mockUser);
      });

      const req = httpMock.expectOne('https://api.example.com/users/1');
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });
  });

  describe('createUser', () => {
    it('should create a new user', () => {
      const newUser = { name: 'New User', email: 'new@example.com' };
      const createdUser: User = { id: 3, ...newUser };

      service.createUser(newUser).subscribe(user => {
        expect(user).toEqual(createdUser);
      });

      const req = httpMock.expectOne('https://api.example.com/users');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newUser);
      req.flush(createdUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', () => {
      service.deleteUser(1).subscribe();

      const req = httpMock.expectOne('https://api.example.com/users/1');
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });
});
```

---

## 🎨 Testing Components

### Simple Component Test

```typescript
// counter.component.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: `
    <div class="counter">
      <h2>Counter: {{ count() }}</h2>
      <button (click)="increment()" id="increment">+</button>
      <button (click)="decrement()" id="decrement">-</button>
      <button (click)="reset()" id="reset">Reset</button>
    </div>
  `
})
export class CounterComponent {
  count = signal(0);

  increment(): void {
    this.count.update(c => c + 1);
  }

  decrement(): void {
    this.count.update(c => c - 1);
  }

  reset(): void {
    this.count.set(0);
  }
}
```

```typescript
// counter.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial count of 0', () => {
    const h2 = compiled.querySelector('h2');
    expect(h2?.textContent).toContain('Counter: 0');
  });

  it('should increment count when + button is clicked', () => {
    const incrementBtn = compiled.querySelector('#increment') as HTMLButtonElement;
    
    incrementBtn.click();
    fixture.detectChanges();
    
    expect(component.count()).toBe(1);
    
    const h2 = compiled.querySelector('h2');
    expect(h2?.textContent).toContain('Counter: 1');
  });

  it('should decrement count when - button is clicked', () => {
    component.count.set(5);
    fixture.detectChanges();
    
    const decrementBtn = compiled.querySelector('#decrement') as HTMLButtonElement;
    decrementBtn.click();
    fixture.detectChanges();
    
    expect(component.count()).toBe(4);
  });

  it('should reset count to 0 when reset button is clicked', () => {
    component.count.set(10);
    fixture.detectChanges();
    
    const resetBtn = compiled.querySelector('#reset') as HTMLButtonElement;
    resetBtn.click();
    fixture.detectChanges();
    
    expect(component.count()).toBe(0);
  });

  it('should have three buttons', () => {
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(3);
  });
});
```

---

## 📝 Testing Components with Services

```typescript
// user-list.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, User } from './user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-list">
      <h2>Users</h2>
      
      @if (loading()) {
        <div class="loading">Loading...</div>
      }
      
      @if (error()) {
        <div class="error">{{ error() }}</div>
      }
      
      <ul>
        @for (user of users(); track user.id) {
          <li>{{ user.name }} - {{ user.email }}</li>
        }
      </ul>
    </div>
  `
})
export class UserListComponent implements OnInit {
  users = signal<User[]>([]);
  loading = signal(false);
  error = signal('');

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load users');
        this.loading.set(false);
      }
    });
  }
}
```

```typescript
// user-list.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService, User } from './user.service';
import { of, throwError } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let compiled: HTMLElement;

  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  beforeEach(async () => {
    // Create spy object
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    userService.getUsers.and.returnValue(of(mockUsers));

    fixture.detectChanges(); // Triggers ngOnInit

    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.users()).toEqual(mockUsers);
    expect(component.loading()).toBe(false);
  });

  it('should display loading message while loading', () => {
    userService.getUsers.and.returnValue(of(mockUsers));
    component.loading.set(true);
    fixture.detectChanges();

    const loadingDiv = compiled.querySelector('.loading');
    expect(loadingDiv?.textContent).toContain('Loading...');
  });

  it('should display users in list', () => {
    userService.getUsers.and.returnValue(of(mockUsers));
    fixture.detectChanges();

    const listItems = compiled.querySelectorAll('li');
    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toContain('John Doe');
    expect(listItems[1].textContent).toContain('Jane Smith');
  });

  it('should display error message on error', () => {
    userService.getUsers.and.returnValue(
      throwError(() => new Error('Server error'))
    );

    fixture.detectChanges();

    expect(component.error()).toBe('Failed to load users');
    
    const errorDiv = compiled.querySelector('.error');
    expect(errorDiv?.textContent).toContain('Failed to load users');
  });

  it('should set loading to false after error', () => {
    userService.getUsers.and.returnValue(
      throwError(() => new Error('Server error'))
    );

    fixture.detectChanges();

    expect(component.loading()).toBe(false);
  });
});
```

---

## 🎭 Testing with Signals

```typescript
// cart.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService (Signals)', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty cart', () => {
    expect(service.items().length).toBe(0);
    expect(service.itemCount()).toBe(0);
    expect(service.total()).toBe(0);
  });

  it('should add item to cart', () => {
    const product = { id: 1, name: 'Product 1', price: 10, image: '', description: '', category: '', stock: 10 };
    
    service.addToCart(product);
    
    expect(service.items().length).toBe(1);
    expect(service.itemCount()).toBe(1);
    expect(service.total()).toBe(11); // price + tax
  });

  it('should increase quantity when adding existing item', () => {
    const product = { id: 1, name: 'Product 1', price: 10, image: '', description: '', category: '', stock: 10 };
    
    service.addToCart(product);
    service.addToCart(product);
    
    expect(service.items().length).toBe(1);
    expect(service.items()[0].quantity).toBe(2);
    expect(service.itemCount()).toBe(2);
  });

  it('should remove item from cart', () => {
    const product = { id: 1, name: 'Product 1', price: 10, image: '', description: '', category: '', stock: 10 };
    
    service.addToCart(product);
    service.removeFromCart(1);
    
    expect(service.items().length).toBe(0);
    expect(service.itemCount()).toBe(0);
  });

  it('should update item quantity', () => {
    const product = { id: 1, name: 'Product 1', price: 10, image: '', description: '', category: '', stock: 10 };
    
    service.addToCart(product);
    service.updateQuantity(1, 5);
    
    expect(service.items()[0].quantity).toBe(5);
    expect(service.itemCount()).toBe(5);
  });

  it('should remove item when quantity set to 0', () => {
    const product = { id: 1, name: 'Product 1', price: 10, image: '', description: '', category: '', stock: 10 };
    
    service.addToCart(product);
    service.updateQuantity(1, 0);
    
    expect(service.items().length).toBe(0);
  });

  it('should calculate subtotal correctly', () => {
    const product1 = { id: 1, name: 'Product 1', price: 10, image: '', description: '', category: '', stock: 10 };
    const product2 = { id: 2, name: 'Product 2', price: 20, image: '', description: '', category: '', stock: 10 };
    
    service.addToCart(product1);
    service.addToCart(product2);
    
    expect(service.subtotal()).toBe(30);
  });

  it('should calculate tax correctly (10%)', () => {
    const product = { id: 1, name: 'Product 1', price: 100, image: '', description: '', category: '', stock: 10 };
    
    service.addToCart(product);
    
    expect(service.tax()).toBe(10);
  });

  it('should calculate total correctly', () => {
    const product = { id: 1, name: 'Product 1', price: 100, image: '', description: '', category: '', stock: 10 };
    
    service.addToCart(product);
    
    expect(service.total()).toBe(110); // 100 + 10% tax
  });

  it('should clear cart', () => {
    const product = { id: 1, name: 'Product 1', price: 10, image: '', description: '', category: '', stock: 10 };
    
    service.addToCart(product);
    service.clearCart();
    
    expect(service.items().length).toBe(0);
    expect(service.itemCount()).toBe(0);
    expect(service.total()).toBe(0);
  });
});
```

---

## 🌐 E2E Testing with Playwright

### Installation

```bash
npm init playwright@latest
```

### Basic E2E Test

```typescript
// e2e/home.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
  });

  test('should display title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Welcome');
  });

  test('should navigate to products page', async ({ page }) => {
    await page.click('a[href="/products"]');
    await expect(page).toHaveURL(/.*products/);
  });
});
```

### E2E Test for Shopping Cart

```typescript
// e2e/shopping-cart.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Shopping Cart', () => {
  test('should add product to cart', async ({ page }) => {
    await page.goto('http://localhost:4200/products');
    
    // Click first "Add to Cart" button
    await page.click('.product-card button:has-text("Add to Cart")');
    
    // Check cart badge updated
    const cartBadge = page.locator('.cart-button');
    await expect(cartBadge).toContainText('1');
  });

  test('should complete checkout flow', async ({ page }) => {
    // Add product
    await page.goto('http://localhost:4200/products');
    await page.click('.product-card button:has-text("Add to Cart")');
    
    // Go to cart
    await page.click('.cart-button');
    await expect(page).toHaveURL(/.*cart/);
    
    // Proceed to checkout
    await page.click('button:has-text("Checkout")');
    
    // Fill checkout form
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="address"]', '123 Main St');
    
    // Submit order
    await page.click('button:has-text("Place Order")');
    
    // Verify success
    await expect(page.locator('.success-message')).toBeVisible();
  });

  test('should update quantity in cart', async ({ page }) => {
    await page.goto('http://localhost:4200/cart');
    
    // Find quantity input and change value
    const quantityInput = page.locator('input[type="number"]').first();
    await quantityInput.fill('3');
    
    // Verify total updated
    const total = page.locator('.total');
    await expect(total).not.toContainText('$0');
  });
});
```

---

## 🎯 Practice Ideas

### Practice 1: Test Todo Service
Create tests for:
- Adding todos
- Toggling completion
- Deleting todos
- Filtering todos

### Practice 2: Test Form Component
Test reactive form with:
- Validation
- Error messages
- Submission
- Reset functionality

### Practice 3: Test API Integration
Mock HTTP calls and test:
- Success scenarios
- Error handling
- Loading states
- Retry logic

### Practice 4: E2E User Journey
Create E2E tests for:
- User registration
- Login flow
- Product search
- Checkout process

---

## 💡 Best Practices

### 1. AAA Pattern (Arrange, Act, Assert)
```typescript
it('should increment counter', () => {
  // Arrange
  component.count.set(5);
  
  // Act
  component.increment();
  
  // Assert
  expect(component.count()).toBe(6);
});
```

### 2. Test One Thing at a Time
```typescript
// ❌ Bad - Testing multiple things
it('should do everything', () => {
  component.increment();
  expect(component.count()).toBe(1);
  component.decrement();
  expect(component.count()).toBe(0);
});

// ✅ Good - Separate tests
it('should increment', () => {
  component.increment();
  expect(component.count()).toBe(1);
});

it('should decrement', () => {
  component.count.set(1);
  component.decrement();
  expect(component.count()).toBe(0);
});
```

### 3. Use Descriptive Test Names
```typescript
// ❌ Bad
it('works', () => { ... });

// ✅ Good
it('should display error message when API call fails', () => { ... });
```

### 4. Mock External Dependencies
```typescript
// Always mock HTTP, services, etc.
const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
userServiceSpy.getUsers.and.returnValue(of(mockData));
```

### 5. Clean Up After Tests
```typescript
afterEach(() => {
  httpMock.verify(); // Verify no outstanding requests
  localStorage.clear(); // Clear storage
});
```

---

## 📊 Code Coverage

### Run Tests with Coverage

```bash
ng test --code-coverage
```

### View Coverage Report
```bash
# Open coverage/index.html in browser
```

### Target Coverage Goals:
- **Statements:** 80%+
- **Branches:** 75%+
- **Functions:** 80%+
- **Lines:** 80%+

---

## 🔧 Testing Utilities

### Custom Test Helpers

```typescript
// test-helpers.ts
export function createMockUser(overrides?: Partial<User>): User {
  return {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    ...overrides
  };
}

export function clickButton(fixture: ComponentFixture<any>, selector: string): void {
  const button = fixture.nativeElement.querySelector(selector) as HTMLButtonElement;
  button.click();
  fixture.detectChanges();
}

export function getTextContent(fixture: ComponentFixture<any>, selector: string): string {
  const element = fixture.nativeElement.querySelector(selector);
  return element?.textContent.trim() || '';
}
```

---

## ✅ Checklist

- [ ] Understand different types of testing
- [ ] Write unit tests for services
- [ ] Write unit tests for components
- [ ] Mock HTTP calls with HttpTestingController
- [ ] Test components with service dependencies
- [ ] Test signals and computed values
- [ ] Write E2E tests with Playwright
- [ ] Achieve good code coverage (80%+)
- [ ] Follow AAA pattern
- [ ] Use descriptive test names

---

## 📚 Additional Resources

- [Angular Testing Guide](https://angular.dev/guide/testing)
- [Jasmine Documentation](https://jasmine.github.io/)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://angular.dev/guide/testing/best-practices)
