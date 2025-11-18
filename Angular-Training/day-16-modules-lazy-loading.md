# Day 16: Angular Modules & Lazy Loading

## Key Concepts

### 1. What are Angular Modules?
- Modules (NgModules) organize an application into cohesive blocks of functionality.
- Every Angular app has at least one module: the **root module** (`AppModule`).

### 2. Feature Modules
- Separate modules for different features (e.g., `UserModule`, `AdminModule`).
- Help organize code and enable lazy loading.

### 3. Lazy Loading
- Load modules on-demand (when user navigates to that route).
- Improves initial load time by splitting the app into smaller bundles.

---

## Sample Code

### Step 1: Create a Feature Module

```bash
ng generate module admin --route admin --module app.module
# This creates:
# - admin module
# - admin routing module
# - admin component
# - updates app-routing.module
```

Or manually:
```bash
ng generate module admin
ng generate component admin/admin-dashboard
```

### Step 2: Feature Module Structure

```typescript
// admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
```

### Step 3: Configure Lazy Loading

#### admin-routing.module.ts
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
```

#### app-routing.module.ts
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

---

## Step 4: Using the Feature Module

```html
<!-- app.component.html -->
<nav>
  <a routerLink="/home">Home</a>
  <a routerLink="/admin">Admin</a>
</nav>
<router-outlet></router-outlet>
```

---

## Practice Ideas

- Create a `UserModule` with lazy loading.
- Add multiple components to a feature module.
- Check the Network tab in DevTools to see lazy-loaded bundles.

---

## Challenge

- Build a **Products Feature Module**:
  - Create `ProductsModule` with lazy loading.
  - Add two components: `ProductListComponent` and `ProductDetailComponent`.
  - Configure routes:
    - `/products` → List of products
    - `/products/:id` → Product details
  - Navigate to products and observe the lazy loading in action.

---

## Bonus: Preloading Strategy

```typescript
// app-routing.module.ts
import { PreloadAllModules } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules 
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

---

## Questions to Ask

- What's the difference between `forRoot()` and `forChild()` in routing?
- How can you verify that a module is lazy-loaded? (Check Network tab!)
- What are the benefits of lazy loading in large applications?
- Try creating a shared module for common components/pipes/directives.

---