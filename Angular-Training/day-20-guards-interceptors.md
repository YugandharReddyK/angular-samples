# Day 20: Route Guards & HTTP Interceptors

## 📚 Key Concepts

### 1. Route Guards
Route guards are interfaces that control navigation to and from routes based on certain conditions.

**Types of Guards:**
- **CanActivate**: Determines if a route can be activated
- **CanDeactivate**: Determines if a route can be deactivated (unsaved changes)
- **CanLoad**: Determines if a lazy-loaded module can be loaded
- **Resolve**: Pre-fetches data before route activation

### 2. HTTP Interceptors
Interceptors intercept HTTP requests and responses, allowing you to:
- Add authentication tokens
- Log requests/responses
- Handle errors globally
- Modify headers
- Show loading indicators

---

## 🔐 Sample Code: Authentication Guard

### Step 1: Create Auth Service

```typescript
// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {
    // Check if user is logged in from localStorage
    this.isAuthenticated = !!localStorage.getItem('authToken');
  }

  login(username: string, password: string): boolean {
    // Simulate authentication
    if (username === 'admin' && password === 'password123') {
      this.isAuthenticated = true;
      localStorage.setItem('authToken', 'fake-jwt-token-12345');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
```

### Step 2: Create Auth Guard

```typescript
// auth.guard.ts
import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router,
  UrlTree 
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Redirect to login page with return url
    return this.router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url }
    });
  }
}
```

### Step 3: Apply Guard to Routes

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard] // Protected route
  },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard] // Protected route
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

---

## 🚫 CanDeactivate Guard (Unsaved Changes)

```typescript
// unsaved-changes.guard.ts
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UnsavedChangesGuard implements CanDeactivate<CanComponentDeactivate> {
  
  canDeactivate(
    component: CanComponentDeactivate
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
```

### Using CanDeactivate in Component

```typescript
// edit-profile.component.ts
import { Component } from '@angular/core';
import { CanComponentDeactivate } from './unsaved-changes.guard';

@Component({
  selector: 'app-edit-profile',
  template: `
    <h2>Edit Profile</h2>
    <form>
      <input [(ngModel)]="name" name="name" placeholder="Name">
      <button (click)="save()">Save</button>
    </form>
  `
})
export class EditProfileComponent implements CanComponentDeactivate {
  name = 'John Doe';
  private originalName = 'John Doe';

  canDeactivate(): boolean {
    if (this.name !== this.originalName) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  save(): void {
    this.originalName = this.name;
    alert('Profile saved!');
  }
}
```

---

## 🔧 HTTP Interceptors

### Step 1: Create Auth Interceptor

```typescript
// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // Add authorization header with token if available
    const token = this.authService.getToken();
    
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Unauthorized - redirect to login
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
```

### Step 2: Create Logging Interceptor

```typescript
// logging.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const startTime = Date.now();
    
    console.log(`🚀 Request: ${request.method} ${request.url}`);

    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            const duration = Date.now() - startTime;
            console.log(`✅ Response: ${request.method} ${request.url} (${duration}ms)`, event.body);
          }
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          console.error(`❌ Error: ${request.method} ${request.url} (${duration}ms)`, error);
        }
      })
    );
  }
}
```

### Step 3: Register Interceptors

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './auth.interceptor';
import { LoggingInterceptor } from './logging.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

---

## 📊 Loading Interceptor

```typescript
// loading.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private activeRequests = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if (this.activeRequests === 0) {
      this.loadingService.show();
    }
    
    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.loadingService.hide();
        }
      })
    );
  }
}
```

```typescript
// loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  show(): void {
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.loadingSubject.next(false);
  }
}
```

---

## 🎯 Practice Ideas

### Practice 1: Protected Admin Panel
1. Create login component with form
2. Implement authentication service
3. Create AuthGuard for admin routes
4. Add logout functionality

### Practice 2: Form with Unsaved Changes Warning
1. Create a form component
2. Implement CanDeactivate guard
3. Show warning when navigating away with unsaved changes

### Practice 3: API Integration with Interceptors
1. Create service that calls an API
2. Add AuthInterceptor to attach token
3. Add LoggingInterceptor to log all requests
4. Add LoadingInterceptor to show global loader

### Practice 4: Role-Based Access
1. Extend AuthService with user roles
2. Create RoleGuard that checks user role
3. Protect routes based on roles (admin, user, guest)

### Practice 5: Token Refresh Interceptor
1. Implement token refresh logic
2. Intercept 401 errors
3. Retry failed request with new token

---

## 🔍 Real-World Scenarios

### Scenario 1: E-Commerce Checkout
- Guard checkout route (must be logged in)
- Warn before leaving cart page with items
- Intercept API calls to add auth token

### Scenario 2: Admin Dashboard
- Multiple role-based guards (admin, editor, viewer)
- Audit logging interceptor
- Session timeout handling

### Scenario 3: Form Builder Application
- Prevent navigation with unsaved forms
- Auto-save interceptor
- Error handling interceptor with user notifications

---

## 💡 Best Practices

1. **Guards:**
   - Keep guard logic simple and focused
   - Use services for complex business logic
   - Always provide feedback to users
   - Handle edge cases (network errors, timeouts)

2. **Interceptors:**
   - Order matters (registered in providers array)
   - Don't modify original request unless necessary
   - Handle errors gracefully
   - Be mindful of performance

3. **Security:**
   - Never store sensitive data in localStorage (use httpOnly cookies)
   - Always validate on backend
   - Use HTTPS in production
   - Implement CSRF protection

---

## 🐛 Common Mistakes

❌ **Forgetting to return true/false in guards**
```typescript
canActivate() {
  if (this.authService.isLoggedIn()) {
    // Missing return!
  }
}
```

✅ **Correct:**
```typescript
canActivate(): boolean {
  return this.authService.isLoggedIn();
}
```

❌ **Mutating the original request**
```typescript
intercept(req: HttpRequest<any>, next: HttpHandler) {
  req.headers.set('Authorization', 'token'); // Error!
  return next.handle(req);
}
```

✅ **Correct:**
```typescript
intercept(req: HttpRequest<any>, next: HttpHandler) {
  const clonedReq = req.clone({
    setHeaders: { Authorization: 'token' }
  });
  return next.handle(clonedReq);
}
```

---

## 📚 Additional Resources

- [Angular Guards Documentation](https://angular.dev/guide/routing/common-router-tasks#preventing-unauthorized-access)
- [HTTP Interceptors Guide](https://angular.dev/guide/http/interceptors)
- [Security Best Practices](https://angular.dev/best-practices/security)

---

## ✅ Checklist

- [ ] Understand different types of guards
- [ ] Implement CanActivate guard
- [ ] Implement CanDeactivate guard
- [ ] Create authentication interceptor
- [ ] Create logging interceptor
- [ ] Handle HTTP errors globally
- [ ] Implement loading indicator with interceptor
- [ ] Test guards with different scenarios
- [ ] Implement role-based access control
