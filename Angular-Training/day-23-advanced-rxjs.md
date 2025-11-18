# Day 23: Advanced RxJS Operators

## 📚 Key Concepts

### 1. What is RxJS?
**RxJS (Reactive Extensions for JavaScript)** is a library for reactive programming using Observables, making it easier to compose asynchronous or callback-based code.

### 2. Why Learn Advanced Operators?
- Handle complex async scenarios
- Chain multiple API calls
- Manage concurrent requests
- Implement search with debounce
- Handle retries and error recovery
- Optimize performance

---

## 🔄 Transformation Operators

### map - Transform emitted values

```typescript
// search.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface UserCard {
  id: number;
  displayName: string;
  contact: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUserCards(): Observable<UserCard[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => users.map(user => ({
        id: user.id,
        displayName: user.name,
        contact: user.email
      })))
    );
  }
}
```

### switchMap - Cancel previous, switch to new Observable

Perfect for search functionality - cancels previous search when user types new character.

```typescript
// search.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="search">
      <h2>Search Users</h2>
      <input 
        type="text" 
        [formControl]="searchControl" 
        placeholder="Search by name...">
      
      <div *ngIf="loading" class="loading">Searching...</div>
      
      <div *ngIf="error" class="error">{{ error }}</div>
      
      <div class="results">
        <div *ngFor="let user of results" class="result-item">
          <h4>{{ user.name }}</h4>
          <p>{{ user.email }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search { padding: 2rem; }
    input {
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
      border: 2px solid #ddd;
      border-radius: 4px;
    }
    .result-item {
      padding: 1rem;
      border-bottom: 1px solid #ddd;
    }
    .loading { color: #007bff; padding: 1rem; }
    .error { color: red; padding: 1rem; background: #ffe6e6; }
  `]
})
export class SearchComponent {
  searchControl = new FormControl('');
  results: any[] = [];
  loading = false;
  error = '';

  constructor(private http: HttpClient) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // Wait 300ms after user stops typing
      distinctUntilChanged(), // Only if value changed
      switchMap(searchTerm => {
        if (!searchTerm || searchTerm.length < 2) {
          return of([]); // Return empty array
        }
        
        this.loading = true;
        this.error = '';
        
        // Cancel previous request, start new one
        return this.http.get<any[]>(
          `https://jsonplaceholder.typicode.com/users?name_like=${searchTerm}`
        ).pipe(
          catchError(err => {
            this.error = 'Search failed';
            return of([]);
          })
        );
      })
    ).subscribe({
      next: (results) => {
        this.results = results;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'An error occurred';
        this.loading = false;
      }
    });
  }
}
```

### mergeMap - Run concurrently, preserve order

Use when you want all requests to complete (don't cancel previous).

```typescript
// notification.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, toArray } from 'rxjs/operators';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  sendBulkNotifications(userIds: number[]) {
    return from(userIds).pipe(
      mergeMap(userId => 
        this.http.post('/api/notifications', { userId })
      ),
      toArray() // Collect all results
    );
  }
}
```

### concatMap - Sequential, one after another

Use when order matters and you need previous result.

```typescript
// sequential-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SequentialApiService {
  constructor(private http: HttpClient) {}

  createUserWithProfile(userData: any) {
    return this.http.post<any>('/api/users', userData).pipe(
      // Wait for user creation, then create profile
      concatMap(user => 
        this.http.post('/api/profiles', {
          userId: user.id,
          ...userData.profile
        })
      )
    );
  }
}
```

---

## 🔀 Combination Operators

### forkJoin - Wait for all Observables to complete

Like Promise.all() - waits for all to finish.

```typescript
// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <h2>Dashboard</h2>
      
      <div *ngIf="loading">Loading dashboard data...</div>
      
      <div *ngIf="!loading" class="dashboard-grid">
        <div class="card">
          <h3>Users</h3>
          <p>{{ data.users.length }} total</p>
        </div>
        <div class="card">
          <h3>Posts</h3>
          <p>{{ data.posts.length }} total</p>
        </div>
        <div class="card">
          <h3>Comments</h3>
          <p>{{ data.comments.length }} total</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { padding: 2rem; }
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
    .card {
      padding: 2rem;
      background: #f5f5f5;
      border-radius: 8px;
      text-align: center;
    }
  `]
})
export class DashboardComponent implements OnInit {
  loading = true;
  data: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch all data in parallel
    forkJoin({
      users: this.http.get('https://jsonplaceholder.typicode.com/users'),
      posts: this.http.get('https://jsonplaceholder.typicode.com/posts'),
      comments: this.http.get('https://jsonplaceholder.typicode.com/comments')
    }).subscribe({
      next: (result) => {
        this.data = result;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load dashboard', err);
        this.loading = false;
      }
    });
  }
}
```

### combineLatest - Emit when any Observable emits

```typescript
// filter.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { startWith, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="filters">
      <select [formControl]="categoryControl">
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      
      <input 
        type="number" 
        [formControl]="maxPriceControl" 
        placeholder="Max Price">
      
      <div class="products">
        <div *ngFor="let product of filteredProducts$ | async">
          {{ product.name }} - ${{ product.price }}
        </div>
      </div>
    </div>
  `
})
export class ProductFilterComponent implements OnInit {
  categoryControl = new FormControl('');
  maxPriceControl = new FormControl(1000);
  filteredProducts$: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const products$ = this.http.get<any[]>('/api/products');

    // Combine both filters and refilter whenever either changes
    this.filteredProducts$ = combineLatest([
      this.categoryControl.valueChanges.pipe(startWith('')),
      this.maxPriceControl.valueChanges.pipe(startWith(1000))
    ]).pipe(
      switchMap(([category, maxPrice]) => products$),
      map(([category, maxPrice, products]: any) => 
        products.filter((p: any) =>
          (!category || p.category === category) &&
          p.price <= maxPrice
        )
      )
    );
  }
}
```

---

## ⏱️ Utility Operators

### tap - Side effects without modifying stream

```typescript
// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-list',
  standalone: true,
  template: `<div *ngFor="let user of users">{{ user.name }}</div>`
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').pipe(
      tap(users => console.log('Fetched users:', users.length)),
      tap(users => this.logAnalytics('users_loaded', users.length)),
      catchError(err => {
        console.error('Error loading users', err);
        return of([]);
      })
    ).subscribe(users => {
      this.users = users;
    });
  }

  logAnalytics(event: string, count: number): void {
    // Send to analytics service
    console.log(`Analytics: ${event} - ${count}`);
  }
}
```

### retry & retryWhen - Retry failed requests

```typescript
// resilient-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError, retryWhen, delay, take } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResilientApiService {
  constructor(private http: HttpClient) {}

  // Simple retry - retry 3 times immediately
  getUsersWithRetry() {
    return this.http.get('/api/users').pipe(
      retry(3),
      catchError(err => {
        console.error('Failed after 3 retries', err);
        return throwError(() => err);
      })
    );
  }

  // Retry with delay - wait 1 second between retries
  getUsersWithDelayedRetry() {
    return this.http.get('/api/users').pipe(
      retryWhen(errors =>
        errors.pipe(
          delay(1000),
          take(3)
        )
      ),
      catchError(err => {
        console.error('Failed after 3 delayed retries', err);
        return throwError(() => err);
      })
    );
  }
}
```

### shareReplay - Share and cache results

```typescript
// config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config$: Observable<any>;

  constructor(private http: HttpClient) {
    // Cache config - only one HTTP request made
    this.config$ = this.http.get('/api/config').pipe(
      shareReplay(1) // Share and replay last value
    );
  }

  getConfig(): Observable<any> {
    return this.config$; // Returns cached value
  }
}
```

---

## 🎯 Practice Ideas

### Practice 1: Advanced Search
Build search with:
- Debounce (300ms)
- Minimum 2 characters
- Cancel previous requests (switchMap)
- Loading indicator
- Error handling

### Practice 2: Parallel API Calls
Create dashboard that loads:
- User profile
- Recent posts
- Notifications
- Statistics
Use forkJoin to load all in parallel

### Practice 3: Dependent API Calls
Implement:
1. Fetch user by ID
2. Use user.companyId to fetch company
3. Use company.locationId to fetch location
Use concatMap/switchMap

### Practice 4: Auto-Complete
Build auto-complete:
- Debounce input
- Call search API
- Display suggestions
- Handle selection

### Practice 5: Infinite Scroll
Implement pagination:
- Load first page
- Detect scroll to bottom
- Load next page (concat results)
- Handle loading states

---

## 💡 Best Practices

1. **Choose the right operator:**
   - `switchMap`: Search, user input
   - `mergeMap`: Parallel independent requests
   - `concatMap`: Sequential dependent requests
   - `exhaustMap`: Ignore new until current completes

2. **Always handle errors:**
   ```typescript
   .pipe(
     catchError(err => {
       console.error(err);
       return of(defaultValue);
     })
   )
   ```

3. **Unsubscribe to prevent memory leaks:**
   ```typescript
   // Use async pipe in template (auto-unsubscribes)
   data$ = this.service.getData();
   
   // Or use takeUntil pattern
   private destroy$ = new Subject<void>();
   
   ngOnInit() {
     this.service.getData()
       .pipe(takeUntil(this.destroy$))
       .subscribe(...);
   }
   
   ngOnDestroy() {
     this.destroy$.next();
     this.destroy$.complete();
   }
   ```

---

## 📚 Operator Cheat Sheet

| Operator | Use Case | Example |
|----------|----------|---------|
| `map` | Transform values | Convert API response |
| `switchMap` | Cancel previous | Search, navigation |
| `mergeMap` | Parallel requests | Bulk operations |
| `concatMap` | Sequential | Dependent API calls |
| `forkJoin` | Wait for all | Load multiple resources |
| `combineLatest` | React to any change | Multiple filters |
| `debounceTime` | Delay execution | Search input |
| `distinctUntilChanged` | Skip duplicates | Avoid redundant calls |
| `retry` | Retry on error | Network resilience |
| `shareReplay` | Cache results | Config, master data |
| `tap` | Side effects | Logging, analytics |

---

## ✅ Checklist

- [ ] Understand transformation operators (map, switchMap, mergeMap)
- [ ] Use combination operators (forkJoin, combineLatest)
- [ ] Implement search with debounceTime + switchMap
- [ ] Handle parallel API calls with forkJoin
- [ ] Implement sequential API calls with concatMap
- [ ] Add retry logic to HTTP requests
- [ ] Use shareReplay for caching
- [ ] Implement proper error handling
- [ ] Prevent memory leaks with unsubscribe
