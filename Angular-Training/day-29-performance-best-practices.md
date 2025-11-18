# Day 29: Performance Optimization & Best Practices

## 📚 Key Concepts

### 1. Why Performance Matters
- **User Experience** - Faster apps = happier users
- **SEO** - Google ranks faster sites higher
- **Retention** - Users abandon slow apps
- **Mobile** - Critical for mobile users
- **Cost** - Less bandwidth, less server load

### 2. Performance Metrics

| Metric | Target | Description |
|--------|--------|-------------|
| **FCP** (First Contentful Paint) | < 1.8s | When first content appears |
| **LCP** (Largest Contentful Paint) | < 2.5s | When main content loads |
| **TTI** (Time to Interactive) | < 3.8s | When page becomes interactive |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Visual stability |
| **FID** (First Input Delay) | < 100ms | Responsiveness |

---

## ⚡ Bundle Size Optimization

### 1. Analyze Bundle Size

```bash
# Build with stats
ng build --stats-json

# Analyze bundle
npx webpack-bundle-analyzer dist/stats.json
```

### 2. Lazy Loading

```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component')
      .then(m => m.HomeComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component')
      .then(m => m.AdminComponent) // Only loads when accessed
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.routes')
      .then(m => m.PRODUCT_ROUTES)
  }
];
```

### 3. Tree-Shaking

```typescript
// ❌ Bad - Imports entire library
import * as _ from 'lodash';

// ✅ Good - Import only what you need
import { debounce } from 'lodash-es';

// ✅ Even Better - Use native methods
const debounce = (fn: Function, delay: number) => {
  let timeoutId: any;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};
```

---

## 🎨 Rendering Performance

### 1. OnPush Change Detection

```typescript
// product-card.component.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // 🚀 OnPush
  template: `
    <div class="card">
      <img [src]="product.image" [alt]="product.name">
      <h3>{{ product.name }}</h3>
      <p>\${{ product.price }}</p>
    </div>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;
}
```

### 2. TrackBy Function

```typescript
// product-list.component.ts
@Component({
  template: `
    <div class="products">
      <!-- ❌ Without trackBy - recreates all DOM elements on change -->
      <app-product-card *ngFor="let product of products" [product]="product">
      </app-product-card>
      
      <!-- ✅ With trackBy - only updates changed items -->
      <app-product-card 
        *ngFor="let product of products; trackBy: trackById" 
        [product]="product">
      </app-product-card>
    </div>
  `
})
export class ProductListComponent {
  products: Product[] = [];

  trackById(index: number, item: Product): number {
    return item.id; // Unique identifier
  }
}
```

### 3. Virtual Scrolling (Large Lists)

```typescript
// large-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-large-list',
  standalone: true,
  imports: [CommonModule, ScrollingModule],
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" class="viewport">
      <div *cdkVirtualFor="let item of items" class="item">
        {{ item }}
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  styles: [`
    .viewport {
      height: 400px;
      width: 100%;
      border: 1px solid #ddd;
    }
    .item {
      height: 50px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
    }
  `]
})
export class LargeListComponent {
  items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
}
```

---

## 🖼️ Image Optimization

### 1. NgOptimizedImage Directive (Angular 15+)

```typescript
// image-gallery.component.ts
import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `
    <!-- ❌ Regular img tag -->
    <img src="/assets/hero.jpg" alt="Hero">
    
    <!-- ✅ Optimized image -->
    <img 
      ngSrc="/assets/hero.jpg" 
      alt="Hero"
      width="1200" 
      height="600"
      priority> <!-- Preload above-the-fold images -->
    
    <!-- Lazy load below-the-fold images -->
    <img 
      ngSrc="/assets/product.jpg" 
      alt="Product"
      width="400" 
      height="300">
  `
})
export class GalleryComponent {}
```

### 2. Responsive Images

```typescript
@Component({
  template: `
    <img 
      ngSrc="/assets/product.jpg"
      alt="Product"
      width="800"
      height="600"
      sizes="(max-width: 768px) 100vw, 50vw">
  `
})
```

### 3. Image Compression

```bash
# Use tools like imagemin, sharp, or online tools
# Target: < 200KB for images
```

---

## 🔄 Deferrable Views

```typescript
// dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="dashboard">
      <!-- Critical content loads immediately -->
      <h1>Dashboard</h1>
      <div class="summary">{{ summary }}</div>
      
      <!-- Heavy chart deferred until viewport -->
      @defer (on viewport) {
        <app-heavy-chart [data]="chartData"></app-heavy-chart>
      } @placeholder {
        <div class="chart-placeholder">
          Chart will load when you scroll...
        </div>
      } @loading (minimum 500ms) {
        <div class="loading">Loading chart...</div>
      }
      
      <!-- Analytics widget loads when idle -->
      @defer (on idle) {
        <app-analytics-widget></app-analytics-widget>
      } @placeholder {
        <div>Analytics loading...</div>
      }
    </div>
  `
})
export class DashboardComponent {
  summary = 'Quick stats';
  chartData = [/* large dataset */];
}
```

---

## 📦 Code Splitting & Preloading

### 1. Preload Strategy

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules) // Preload all lazy routes
    )
  ]
};
```

### 2. Custom Preload Strategy

```typescript
// custom-preload.strategy.ts
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Check if route should be preloaded
    if (route.data && route.data['preload']) {
      const delay = route.data['delay'] || 0;
      
      // Preload after delay
      return timer(delay).pipe(
        mergeMap(() => {
          console.log('Preloading:', route.path);
          return load();
        })
      );
    }
    
    return of(null);
  }
}
```

```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component'),
    data: { preload: true, delay: 2000 } // Preload after 2s
  }
];
```

---

## 🧮 Computation Optimization

### 1. Use Signals for Computed Values

```typescript
// ❌ Bad - Function called on every change detection
@Component({
  template: `<p>Total: {{ calculateTotal() }}</p>`
})
export class BadComponent {
  items: Item[] = [];
  
  calculateTotal(): number {
    console.log('Calculating...'); // Called many times!
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}

// ✅ Good - Computed signal only recalculates when dependencies change
@Component({
  template: `<p>Total: {{ total() }}</p>`
})
export class GoodComponent {
  items = signal<Item[]>([]);
  
  total = computed(() => {
    console.log('Calculating...'); // Only when items change
    return this.items().reduce((sum, item) => sum + item.price, 0);
  });
}
```

### 2. Memoization

```typescript
// memoize.utility.ts
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();
  
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

// Usage
export class MyComponent {
  expensiveCalculation = memoize((a: number, b: number) => {
    // Heavy computation
    return a ** b;
  });
}
```

---

## 🌐 HTTP Optimization

### 1. Request Caching

```typescript
// cache.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    // Check cache
    const cachedResponse = this.cache.get(req.url);
    if (cachedResponse) {
      return of(cachedResponse.clone());
    }

    // Make request and cache response
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.url, event.clone());
        }
      })
    );
  }
}
```

### 2. Request Debouncing

```typescript
// search.component.ts
import { Component, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  template: `
    <input [formControl]="searchControl" placeholder="Search...">
    <div *ngFor="let result of results()">{{ result }}</div>
  `
})
export class SearchComponent {
  searchControl = new FormControl('');
  results = signal<any[]>([]);

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300), // Wait 300ms after typing stops
      distinctUntilChanged(), // Only if value changed
      switchMap(term => this.searchService.search(term)) // Cancel previous
    ).subscribe(results => {
      this.results.set(results);
    });
  }
}
```

---

## 🔒 Security Best Practices

### 1. Sanitize User Input

```typescript
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  template: `
    <!-- ❌ Dangerous - XSS vulnerability -->
    <div [innerHTML]="userContent"></div>
    
    <!-- ✅ Safe - Sanitized -->
    <div [innerHTML]="sanitizedContent"></div>
  `
})
export class SafeComponent {
  userContent = '<img src=x onerror="alert(\'XSS\')">'; // Malicious
  
  sanitizedContent: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    this.sanitizedContent = this.sanitizer.sanitize(
      SecurityContext.HTML,
      this.userContent
    ) || '';
  }
}
```

### 2. Use CSP (Content Security Policy)

```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';">
```

### 3. HTTP-Only Cookies for Tokens

```typescript
// ❌ Bad - Token in localStorage (vulnerable to XSS)
localStorage.setItem('token', token);

// ✅ Good - Use HTTP-only cookies (set by backend)
// Token cannot be accessed by JavaScript
```

---

## 📊 Performance Monitoring

### 1. Angular DevTools

```bash
# Install Chrome extension
# "Angular DevTools"
```

### 2. Lighthouse Audit

```bash
# Run Lighthouse in Chrome DevTools
# Or use CLI
npm install -g lighthouse
lighthouse http://localhost:4200 --view
```

### 3. Bundle Analyzer

```bash
ng build --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

### 4. Custom Performance Marks

```typescript
// performance.service.ts
@Injectable({ providedIn: 'root' })
export class PerformanceService {
  mark(name: string): void {
    performance.mark(name);
  }

  measure(name: string, startMark: string, endMark: string): void {
    performance.measure(name, startMark, endMark);
    const measure = performance.getEntriesByName(name)[0];
    console.log(`${name}: ${measure.duration}ms`);
  }
}

// Usage in component
ngOnInit() {
  this.perf.mark('data-fetch-start');
  
  this.service.getData().subscribe(data => {
    this.perf.mark('data-fetch-end');
    this.perf.measure('data-fetch', 'data-fetch-start', 'data-fetch-end');
  });
}
```

---

## 🎯 Performance Checklist

### Bundle Size:
- [ ] Enable production mode
- [ ] Use lazy loading for routes
- [ ] Implement code splitting
- [ ] Tree-shake unused code
- [ ] Compress images
- [ ] Use CDN for assets

### Rendering:
- [ ] Use OnPush change detection
- [ ] Implement trackBy for *ngFor
- [ ] Use virtual scrolling for large lists
- [ ] Defer non-critical components
- [ ] Avoid function calls in templates
- [ ] Use signals for computed values

### Network:
- [ ] Cache HTTP requests
- [ ] Implement request debouncing
- [ ] Preload critical routes
- [ ] Compress responses (gzip/brotli)
- [ ] Use HTTP/2
- [ ] Implement service worker (PWA)

### Images:
- [ ] Use NgOptimizedImage directive
- [ ] Lazy load images
- [ ] Use responsive images
- [ ] Compress images (< 200KB)
- [ ] Use modern formats (WebP)

### Security:
- [ ] Sanitize user input
- [ ] Use Content Security Policy
- [ ] HTTP-only cookies for tokens
- [ ] Enable HTTPS
- [ ] Implement CSRF protection

---

## 🏆 Best Practices Summary

1. **Use modern Angular features**
   - Standalone components
   - Signals
   - Deferrable views
   - OnPush change detection

2. **Optimize bundle size**
   - Lazy loading
   - Tree-shaking
   - Code splitting
   - Remove unused code

3. **Improve rendering performance**
   - TrackBy functions
   - Virtual scrolling
   - Avoid expensive computations
   - Use computed signals

4. **Network optimization**
   - Cache requests
   - Debounce user input
   - Preload routes
   - Use interceptors

5. **Monitor and measure**
   - Use Angular DevTools
   - Run Lighthouse audits
   - Analyze bundle size
   - Track performance metrics

---

## ✅ Final Checklist

- [ ] Production build is optimized
- [ ] Bundle size < 500KB (initial)
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] All routes lazy loaded
- [ ] Images optimized
- [ ] OnPush where applicable
- [ ] TrackBy in all *ngFor
- [ ] Security headers configured
- [ ] Lighthouse score > 90

---

## 📚 Additional Resources

- [Angular Performance Guide](https://angular.dev/best-practices/runtime-performance)
- [Web.dev Performance](https://web.dev/performance/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
