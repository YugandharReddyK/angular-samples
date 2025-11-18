# Day 12: HTTP Client & API Calls

## Key Concepts

### 1. HttpClient
- Angular service to make HTTP requests (GET, POST, PUT, DELETE, etc.).
- Communicates with backend APIs to fetch or send data.

### 2. HttpClientModule
- Required to use HttpClient.
- Import in `app.module.ts`:
  ```typescript
  import { HttpClientModule } from '@angular/common/http';

  @NgModule({
    imports: [BrowserModule, HttpClientModule],
    // ...
  })
  export class AppModule { }
  ```

### 3. Observables
- HTTP requests return Observables (from RxJS).
- Subscribe to get the data.

---

## Sample Code

### Step 1: Create a Data Service

```bash
ng generate service data
```

#### data.service.ts
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
```

### Step 2: Use Service in Component

```typescript
// app.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

export class AppComponent implements OnInit {
  users: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getUsers().subscribe(
      (data) => {
        this.users = data;
        console.log('Users:', this.users);
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
```

### Step 3: Display Data in Template

```html
<!-- app.component.html -->
<h2>User List</h2>
<ul>
  <li *ngFor="let user of users">
    {{ user.name }} - {{ user.email }}
  </li>
</ul>
```

---

## Practice Ideas

- Fetch posts from `https://jsonplaceholder.typicode.com/posts` and display them.
- Add a button to fetch data on demand instead of on component initialization.
- Create a method to fetch a single user by ID and display their details.

---

## Challenge

- Build a simple **User Directory**:
  - Fetch users from the API.
  - Display users in a list.
  - Add a form to create a new user (POST request).
  - Log the response when a new user is created.

---

## Questions to Ask

- What happens if the API is slow or fails? (We'll handle errors tomorrow!)
- What's the difference between `subscribe()` and `async` pipe?
- Try using different HTTP methods: PUT, DELETE.

---