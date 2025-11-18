# Day 25: Deferrable Views (@defer) - Performance Optimization

## 📚 Key Concepts

### 1. What are Deferrable Views?
**Deferrable Views** (introduced in Angular 17) allow you to lazy load parts of your template, improving initial load performance by deferring rendering of components until they're needed.

### 2. Benefits
✅ **Faster initial load** - Reduce bundle size  
✅ **Better performance** - Load heavy components only when needed  
✅ **Improved UX** - Show placeholders while loading  
✅ **Automatic code splitting** - Angular handles it for you  

### 3. @defer Blocks
- `@defer` - Main block (lazy loaded content)
- `@placeholder` - Shown before deferring
- `@loading` - Shown while loading
- `@error` - Shown if loading fails

---

## 🚀 Basic @defer Usage

### Simple Defer on Viewport

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { HeavyChartComponent } from './heavy-chart/heavy-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeavyChartComponent],
  template: `
    <div class="app">
      <h1>My Dashboard</h1>
      
      <div class="quick-stats">
        <p>Quick stats load immediately</p>
      </div>

      <!-- Defer heavy chart until it's visible -->
      @defer (on viewport) {
        <app-heavy-chart></app-heavy-chart>
      } @placeholder {
        <div class="placeholder">
          📊 Chart will load when you scroll down...
        </div>
      } @loading (minimum 500ms) {
        <div class="loading">
          <span class="spinner"></span>
          Loading chart...
        </div>
      } @error {
        <div class="error">
          Failed to load chart. Please refresh.
        </div>
      }
    </div>
  `,
  styles: [`
    .placeholder {
      padding: 4rem;
      background: #f5f5f5;
      text-align: center;
      border-radius: 8px;
      margin: 2rem 0;
    }
    .loading {
      padding: 2rem;
      text-align: center;
      color: #007bff;
    }
    .error {
      padding: 2rem;
      background: #ffe6e6;
      color: red;
      border-radius: 8px;
    }
  `]
})
export class AppComponent {}
```

---

## 🎯 Defer Triggers

### 1. on viewport (Intersection Observer)

```typescript
@Component({
  template: `
    <!-- Load when component enters viewport -->
    @defer (on viewport) {
      <app-comments-section></app-comments-section>
    } @placeholder {
      <div>Scroll to load comments...</div>
    }
  `
})
export class ArticleComponent {}
```

### 2. on idle (Browser idle time)

```typescript
@Component({
  template: `
    <!-- Load when browser is idle -->
    @defer (on idle) {
      <app-analytics-widget></app-analytics-widget>
    } @placeholder {
      <div>Analytics will load shortly...</div>
    }
  `
})
export class DashboardComponent {}
```

### 3. on interaction (User interaction)

```typescript
@Component({
  template: `
    <!-- Load when user hovers -->
    <div>
      @defer (on hover) {
        <app-user-tooltip [userId]="userId"></app-user-tooltip>
      } @placeholder {
        <span>Hover to see details</span>
      }
    </div>
  `
})
export class UserCardComponent {
  userId = 123;
}
```

### 4. on immediate (Load immediately)

```typescript
@Component({
  template: `
    <!-- Load immediately but still code-split -->
    @defer (on immediate) {
      <app-critical-component></app-critical-component>
    } @loading {
      <div>Loading...</div>
    }
  `
})
export class HomeComponent {}
```

### 5. on timer (After delay)

```typescript
@Component({
  template: `
    <!-- Load after 2 seconds -->
    @defer (on timer(2000)) {
      <app-promotional-banner></app-promotional-banner>
    } @placeholder {
      <div><!-- empty placeholder --></div>
    }
  `
})
export class MarketingComponent {}
```

### 6. when (Conditional expression)

```typescript
@Component({
  template: `
    <!-- Load when user is authenticated -->
    @defer (when isAuthenticated) {
      <app-user-dashboard></app-user-dashboard>
    } @placeholder {
      <div>Please log in to continue...</div>
    }
  `
})
export class ProtectedComponent {
  isAuthenticated = false;

  login() {
    this.isAuthenticated = true; // Triggers @defer
  }
}
```

---

## 🔄 Multiple Triggers

```typescript
@Component({
  standalone: true,
  template: `
    <div class="product-gallery">
      <!-- Load on hover OR viewport OR after 3 seconds -->
      @defer (on hover; on viewport; on timer(3000)) {
        <app-image-gallery [images]="images"></app-image-gallery>
      } @placeholder {
        <div class="placeholder-grid">
          <div *ngFor="let item of [1,2,3,4]" class="placeholder-item">
            📷
          </div>
        </div>
      } @loading (minimum 200ms; after 100ms) {
        <div class="loading-overlay">
          <div class="spinner"></div>
          Loading gallery...
        </div>
      }
    </div>
  `
})
export class ProductComponent {
  images = ['img1.jpg', 'img2.jpg', 'img3.jpg'];
}
```

---

## 💡 Real-World Examples

### Example 1: Lazy Load Comments

```typescript
// blog-post.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article>
      <h1>{{ title }}</h1>
      <div class="content">
        {{ content }}
      </div>

      <hr>

      <!-- Comments load when scrolled into view -->
      @defer (on viewport) {
        <section class="comments">
          <h3>Comments ({{ commentCount }})</h3>
          <div *ngFor="let comment of comments" class="comment">
            <strong>{{ comment.author }}</strong>
            <p>{{ comment.text }}</p>
          </div>
        </section>
      } @placeholder {
        <div class="comments-placeholder">
          💬 Scroll down to load comments...
        </div>
      } @loading (minimum 500ms) {
        <div class="comments-loading">
          Loading comments...
        </div>
      }
    </article>
  `,
  styles: [`
    article { max-width: 800px; margin: 0 auto; padding: 2rem; }
    .comments { margin-top: 2rem; }
    .comment { 
      border-left: 3px solid #007bff;
      padding-left: 1rem;
      margin: 1rem 0;
    }
    .comments-placeholder {
      padding: 2rem;
      background: #f5f5f5;
      text-align: center;
      border-radius: 8px;
    }
  `]
})
export class BlogPostComponent {
  title = 'Understanding Angular Deferrable Views';
  content = 'Deferrable views are a powerful feature...';
  commentCount = 42;
  comments = [
    { author: 'John', text: 'Great article!' },
    { author: 'Jane', text: 'Very helpful, thanks!' }
  ];
}
```

### Example 2: Dashboard Widgets

```typescript
// dashboard.component.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div class="dashboard">
      <h1>Dashboard</h1>

      <!-- Critical info loads immediately -->
      <div class="summary">
        <h2>Welcome back, {{ userName }}</h2>
        <p>Last login: {{ lastLogin }}</p>
      </div>

      <!-- Charts load when browser is idle -->
      @defer (on idle) {
        <div class="charts-row">
          <app-sales-chart></app-sales-chart>
          <app-traffic-chart></app-traffic-chart>
        </div>
      } @placeholder {
        <div class="charts-placeholder">
          <div class="placeholder-box">📊 Chart</div>
          <div class="placeholder-box">📈 Chart</div>
        </div>
      } @loading (minimum 300ms) {
        <div class="loading-charts">
          Loading analytics...
        </div>
      }

      <!-- Data table loads on viewport -->
      @defer (on viewport) {
        <app-data-table [data]="tableData"></app-data-table>
      } @placeholder {
        <div class="table-placeholder">
          Scroll to load data table...
        </div>
      }

      <!-- Admin panel only loads if user is admin -->
      @defer (when isAdmin()) {
        <app-admin-panel></app-admin-panel>
      }
    </div>
  `,
  styles: [`
    .dashboard { padding: 2rem; }
    .charts-row { 
      display: grid; 
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin: 2rem 0;
    }
    .charts-placeholder {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .placeholder-box {
      height: 300px;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      border-radius: 8px;
    }
  `]
})
export class DashboardComponent {
  userName = 'John Doe';
  lastLogin = new Date().toLocaleDateString();
  tableData = [];
  isAdmin = signal(false);
}
```

### Example 3: Modal with Lazy Content

```typescript
// modal.component.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-modal-demo',
  standalone: true,
  template: `
    <button (click)="showModal.set(true)">
      Open Settings
    </button>

    @if (showModal()) {
      <div class="modal-overlay" (click)="showModal.set(false)">
        <div class="modal" (click)="$event.stopPropagation()">
          <h2>Settings</h2>
          
          <!-- Heavy settings component only loads when modal opens -->
          @defer (when showModal()) {
            <app-advanced-settings></app-advanced-settings>
          } @loading {
            <div class="loading">Loading settings...</div>
          }
          
          <button (click)="showModal.set(false)">Close</button>
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      min-width: 500px;
      max-width: 90vw;
    }
  `]
})
export class ModalDemoComponent {
  showModal = signal(false);
}
```

---

## 🎯 Practice Ideas

### Practice 1: E-Commerce Product Page
Create product page with:
- Product info (loads immediately)
- Reviews section (defer on viewport)
- Related products (defer on idle)
- Q&A section (defer on viewport)

### Practice 2: News Article Page
Build article with:
- Article content (immediate)
- Comments (defer on viewport)
- Recommended articles (defer on idle)
- Social sharing widgets (defer on interaction/hover)

### Practice 3: Admin Dashboard
Create dashboard with:
- User stats (immediate)
- Charts (defer on idle)
- User list (defer on viewport)
- Admin tools (defer when isAdmin)

### Practice 4: Social Media Feed
Implement feed with:
- Initial posts (immediate)
- Infinite scroll (defer on viewport)
- Post details modal (defer when opened)
- Video player (defer on viewport)

---

## 💡 Best Practices

1. **Use @defer for heavy components**
   ```typescript
   // Heavy chart library, video players, rich editors
   @defer (on viewport) {
     <app-heavy-component></app-heavy-component>
   }
   ```

2. **Always provide @placeholder**
   ```typescript
   // Give users visual feedback
   @defer (on viewport) {
     <app-chart></app-chart>
   } @placeholder {
     <div class="skeleton"></div>
   }
   ```

3. **Use minimum loading time to avoid flicker**
   ```typescript
   // Prevent flash of loading state
   @loading (minimum 500ms) {
     <div>Loading...</div>
   }
   ```

4. **Combine triggers wisely**
   ```typescript
   // Load on hover OR after 3 seconds
   @defer (on hover; on timer(3000)) {
     <app-tooltip></app-tooltip>
   }
   ```

5. **Use @error for fallbacks**
   ```typescript
   @defer (on viewport) {
     <app-component></app-component>
   } @error {
     <div>Failed to load. <button>Retry</button></div>
   }
   ```

---

## 🐛 Common Mistakes

❌ **Deferring critical content**
```typescript
// Don't defer important above-the-fold content
@defer (on idle) {
  <h1>{{ title }}</h1> <!-- Bad! -->
}
```

❌ **No placeholder**
```typescript
// Always provide placeholder
@defer (on viewport) {
  <app-chart></app-chart>
} // Missing @placeholder - jarring UX
```

❌ **Over-deferring**
```typescript
// Don't defer everything - use judgement
@defer (on timer(5000)) {
  <p>Simple text</p> <!-- Unnecessary! -->
}
```

---

## 📊 Performance Impact

### Before @defer:
- Initial bundle: **500 KB**
- Time to Interactive: **3.2s**

### After @defer:
- Initial bundle: **200 KB** ⬇️ 60%
- Time to Interactive: **1.1s** ⬇️ 66%
- Lazy chunks loaded on-demand

---

## 📚 Additional Resources

- [Angular Defer Documentation](https://angular.dev/guide/defer)
- [Performance Guide](https://angular.dev/best-practices/runtime-performance)

---

## ✅ Checklist

- [ ] Understand what deferrable views are
- [ ] Use @defer with different triggers
- [ ] Implement @placeholder blocks
- [ ] Add @loading states with minimum time
- [ ] Handle @error cases
- [ ] Combine multiple triggers
- [ ] Measure performance improvements
- [ ] Apply to real-world components (charts, modals, tables)
