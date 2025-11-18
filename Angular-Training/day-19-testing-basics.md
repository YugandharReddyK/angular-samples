# Day 19: Testing Basics

## Key Concepts

### 1. Why Testing?
- Catch bugs early
- Ensure code quality
- Safe refactoring
- Documentation through tests

### 2. Testing Tools in Angular
- **Jasmine**: Testing framework (describe, it, expect)
- **Karma**: Test runner (runs tests in browser)
- **TestBed**: Angular testing utility

### 3. Types of Tests
- **Unit Tests**: Test individual components/services in isolation
- **Integration Tests**: Test how parts work together
- **E2E Tests**: Test entire application flow (not covered today)

---

## Sample Code

### Step 1: Running Tests

```bash
# Run all tests
ng test

# Run tests once (no watch mode)
ng test --watch=false

# Run with code coverage
ng test --code-coverage
```

---

### Step 2: Testing a Simple Service

#### calculator.service.ts
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }
}
```

#### calculator.service.spec.ts
```typescript
import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add two numbers correctly', () => {
    const result = service.add(2, 3);
    expect(result).toBe(5);
  });

  it('should subtract two numbers correctly', () => {
    const result = service.subtract(10, 4);
    expect(result).toBe(6);
  });

  it('should multiply two numbers correctly', () => {
    const result = service.multiply(3, 4);
    expect(result).toBe(12);
  });

  it('should divide two numbers correctly', () => {
    const result = service.divide(10, 2);
    expect(result).toBe(5);
  });

  it('should throw error when dividing by zero', () => {
    expect(() => service.divide(10, 0)).toThrow(new Error('Cannot divide by zero'));
  });
});
```

---

### Step 3: Testing a Component

#### counter.component.ts
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <h3>Counter: {{ count }}</h3>
    <button class="increment" (click)="increment()">+</button>
    <button class="decrement" (click)="decrement()">-</button>
    <button class="reset" (click)="reset()">Reset</button>
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

#### counter.component.spec.ts
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize count to 0', () => {
    expect(component.count).toBe(0);
  });

  it('should display initial count', () => {
    const h3 = compiled.querySelector('h3');
    expect(h3?.textContent).toContain('Counter: 0');
  });

  it('should increment count when increment button is clicked', () => {
    const button = compiled.querySelector('.increment') as HTMLButtonElement;
    button.click();
    expect(component.count).toBe(1);
  });

  it('should update display after increment', () => {
    component.increment();
    fixture.detectChanges();
    const h3 = compiled.querySelector('h3');
    expect(h3?.textContent).toContain('Counter: 1');
  });

  it('should decrement count when decrement button is clicked', () => {
    component.count = 5;
    component.decrement();
    expect(component.count).toBe(4);
  });

  it('should reset count to 0', () => {
    component.count = 10;
    component.reset();
    expect(component.count).toBe(0);
  });

  it('should handle multiple operations', () => {
    component.increment();
    component.increment();
    component.increment();
    expect(component.count).toBe(3);
    component.decrement();
    expect(component.count).toBe(2);
    component.reset();
    expect(component.count).toBe(0);
  });
});
```

---

### Step 4: Testing a Component with Service Dependency

#### user.service.ts
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUsers() {
    return [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ];
  }
}
```

#### user-list.component.spec.ts
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from './user.service';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      providers: [ UserService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users from service', () => {
    spyOn(userService, 'getUsers').and.returnValue([
      { id: 1, name: 'Test User' }
    ]);
    
    component.ngOnInit();
    
    expect(component.users.length).toBe(1);
    expect(component.users[0].name).toBe('Test User');
  });
});
```

---

## Common Jasmine Matchers

```typescript
// Equality
expect(value).toBe(5);
expect(value).toEqual({ name: 'Test' });

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();

// Comparison
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(10);

// String matching
expect(text).toContain('hello');
expect(text).toMatch(/pattern/);

// Array
expect(array).toContain(item);

// Exceptions
expect(() => someFunction()).toThrow();
expect(() => someFunction()).toThrowError('error message');
```

---

## Practice Ideas

- Write tests for a `TodoService` with add, remove, and toggle methods.
- Test a component that uses `@Input()` and `@Output()`.
- Write tests for form validation.

---

## Challenge

- Test a **Login Component**:
  - Component has username and password fields.
  - Has a login button that's disabled when fields are empty.
  - Emits an event when login button is clicked.
  - Write tests for:
    - Component creation
    - Button disabled state
    - Form validation
    - Event emission on submit

---

## Questions to Ask

- What's the difference between `toBe()` and `toEqual()`?
- Why do we need `fixture.detectChanges()`?
- What is the purpose of `beforeEach()`?
- How do you test asynchronous code? (Explore `async` and `fakeAsync`)

---