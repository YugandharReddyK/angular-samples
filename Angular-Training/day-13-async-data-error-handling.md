# Day 13: Displaying Fetched Data & Error Handling

## Key Concepts

### 1. Async Pipe
- Automatically subscribes to Observables in templates.
- Automatically unsubscribes when component is destroyed.
- Cleaner code, less manual subscription management.

### 2. Loading States
- Show a loading indicator while data is being fetched.

### 3. Error Handling
- Handle HTTP errors gracefully.
- Display user-friendly error messages.

---

## Sample Code

### Step 1: Using Async Pipe

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Observable } from 'rxjs';

export class AppComponent {
  users$: Observable<any[]>;

  constructor(private dataService: DataService) {
    this.users$ = this.dataService.getUsers();
  }
}
```

```html
<!-- app.component.html -->
<h2>User List</h2>
<ul>
  <li *ngFor="let user of users$ | async">
    {{ user.name }} - {{ user.email }}
  </li>
</ul>
```

### Step 2: Loading & Error States

```typescript
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

export class AppComponent implements OnInit {
  users: any[] = [];
  loading = false;
  error = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loading = true;
    this.dataService.getUsers().subscribe(
      (data) => {
        this.users = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load users. Please try again.';
        this.loading = false;
        console.error('Error:', error);
      }
    );
  }

  retry() {
    this.error = '';
    this.ngOnInit();
  }
}
```

```html
<!-- app.component.html -->
<h2>User List</h2>

<div *ngIf="loading">Loading users...</div>

<div *ngIf="error" style="color: red;">
  {{ error }}
  <button (click)="retry()">Retry</button>
</div>

<ul *ngIf="!loading && !error">
  <li *ngFor="let user of users">
    {{ user.name }} - {{ user.email }}
  </li>
</ul>
```

### Step 3: Advanced Error Handling with RxJS

```typescript
// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError((error) => {
        console.error('API Error:', error);
        return throwError(() => new Error('Something went wrong!'));
      })
    );
  }
}
```

---

## Practice Ideas

- Add a "Refresh" button to reload data.
- Show different error messages based on error status (404, 500, etc.).
- Display a skeleton loader or spinner while loading.

---

## Challenge

- Build a **Post Viewer**:
  - Fetch posts from `https://jsonplaceholder.typicode.com/posts`.
  - Show loading indicator while fetching.
  - If error occurs, display an error message with a retry button.
  - Use the async pipe to display posts.
  - Add a search box to filter posts by title (client-side filtering).

---

## Questions to Ask

- What happens if you don't unsubscribe from an Observable?
- How does the async pipe prevent memory leaks?
- Try simulating an error by using a wrong API URL and observe the behavior.

---