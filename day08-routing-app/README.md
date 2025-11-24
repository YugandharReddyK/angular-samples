# Day 8 & 9: Routing & Route Parameters

## 🎯 Learning Objectives

By the end of this tutorial, you will understand:

### Day 8 - Routing Basics
- What is Routing in Angular
- How to configure routes
- How to navigate between pages
- How to use RouterLink and RouterLinkActive
- How to handle 404 errors with wildcard routes
- How router-outlet works

### Day 9 - Route Parameters
- How to define routes with parameters (e.g., `/products/:id`)
- How to read route parameters using ActivatedRoute
- Snapshot vs Observable approach for reading parameters
- How to navigate with parameters using RouterLink
- Building detail pages with dynamic data

## 📚 What is Routing?

**Routing** enables navigation between different views (components) in a single-page application (SPA) without reloading the entire page.

### Why Do We Need Routing?

1. **Multi-Page Experience**: Create multiple "pages" in a single-page app
2. **URL Management**: Each view has its own unique URL
3. **Bookmarkable**: Users can bookmark specific pages
4. **Browser History**: Back/Forward buttons work naturally
5. **Better UX**: Fast navigation without page reloads

### Real-World Analogy

Think of a **hotel**:
- **Routes** = Floor plan (Home is 1st floor, Products is 2nd floor, etc.)
- **RouterLink** = Elevator buttons (click to go to a floor)
- **Router Outlet** = Elevator door (where you exit to see the floor)
- **Wildcard Route** = Security (catches wrong floor numbers)

## 🔧 Key Routing Concepts

### 1. Routes Configuration

Define URL-to-component mappings in `app.routes.ts`:

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: '**', component: NotFoundComponent }  // Must be last!
];
```

### 2. RouterLink Directive

Navigate without page reload:

```html
<a routerLink="/home">Home</a>
<a [routerLink]="['/products']">Products</a>
```

### 3. RouterLinkActive Directive

Highlights the active route:

```html
<a routerLink="/home" routerLinkActive="active">Home</a>
```

When on `/home`, the link gets the `active` CSS class.

### 4. Router Outlet

Placeholder where routed components display:

```html
<router-outlet></router-outlet>
```

The matched component renders inside this outlet.

### 5. Wildcard Route

Catches all undefined routes (404 page):

```typescript
{ path: '**', component: NotFoundComponent }
```

**⚠️ IMPORTANT**: Must be the LAST route in the array!

## 🏗️ Project Structure

```
src/app/
├── app.ts                    # Main app with sidebar
├── app.html                  # Layout with sidebar + router-outlet
├── app.scss                  # Sidebar styles
├── app.routes.ts             # Routes configuration (includes parameterized routes)
│
├── home/                     # Home page component
│   ├── home.ts
│   ├── home.html
│   └── home.scss
│
├── products/                 # Products list page (Day 8)
│   ├── products.ts          # Shows list of products
│   ├── products.html
│   └── products.scss
│
├── product-detail/          # Product detail page (Day 9) 
│   ├── product-detail.ts   # Reads :id parameter to show product details
│   ├── product-detail.html
│   └── product-detail.scss
│
├── users/                   # Users list page (Day 9)
│   ├── users.ts            # Shows list of users
│   ├── users.html
│   └── users.scss
│
├── user/                    # User detail page (Day 9)
│   ├── user.ts             # Reads :id parameter to show user profile
│   ├── user.html
│   └── user.scss
│
├── about/                   # About page component
├── contact/                 # Contact page component
└── not-found/               # 404 page component
```

## 🚀 Running the App

```bash
# Install dependencies
npm install

# Start the development server
ng serve --port 4205

# Open browser
http://localhost:4205
```

## 📖 What to Observe

### Day 8: Basic Navigation

#### 1. Navigation Flow
- Click "Home" in sidebar → URL changes to `/home`
- Click "Products" → URL changes to `/products`
- Notice: **No page reload!** Only the component inside `<router-outlet>` changes

#### 2. Active Route Highlighting
- The current page is highlighted in the sidebar
- This is done with `routerLinkActive="active"`

#### 3. Browser Integration
- Press **Back button** → Goes to previous route
- Press **Forward button** → Goes to next route
- **Bookmark** a page → Direct link works!

#### 4. Wildcard Route
- Type a non-existent URL (e.g., `/xyz`)
- The 404 NotFound page appears
- This is caught by the `**` wildcard route

### Day 9: Route Parameters in Action

#### 1. Products with Parameters
- Click "Products" in sidebar → See list of products at `/products`
- Click any product card → URL changes to `/products/1`, `/products/2`, etc.
- Each product has its own unique URL with its ID
- Notice the detailed product information is displayed

#### 2. Users with Parameters
- Click "Users" in sidebar → See list of users at `/users`
- Click any user card → URL changes to `/user/1`, `/user/2`, etc.
- User profile shows with bio, projects, and details
- Each user has a unique, bookmarkable URL

#### 3. Parameter Reading
- Open DevTools Console (F12)
- Navigate to a product or user
- See how the `:id` parameter is extracted from the URL
- Try manually changing the ID in the URL (e.g., `/products/5` to `/products/3`)

#### 4. Error Handling
- Try an invalid ID like `/products/999`
- See the "Product Not Found" message
- This shows proper handling of missing data

#### 5. Back Navigation
- Click into a product detail page
- Use the "← Back" button
- Notice it returns to the previous page using `Location.back()`

## 🎓 How Routing Works (Step-by-Step)

1. **User clicks** a link with `routerLink="/products"`
2. **Angular Router** intercepts the click (prevents page reload)
3. **Router** changes browser URL to `/products`
4. **Router** looks up `/products` in routes array
5. **Router** finds `{ path: 'products', component: ProductsComponent }`
6. **Router** loads `ProductsComponent` into `<router-outlet>`
7. **Component displays** - User sees products page!

## 🔑 Important Concepts (Day 8)

### Path Matching

```typescript
// Redirect root to /home
{ path: '', redirectTo: '/home', pathMatch: 'full' }
```

- `pathMatch: 'full'` → Exact match only
- Without it, redirects happen on partial matches

### Route Order Matters!

```typescript
export const routes: Routes = [
  { path: 'home', component: HomeComponent },      // ✅ Specific routes first
  { path: 'products', component: ProductsComponent },
  { path: '**', component: NotFoundComponent }     // ✅ Wildcard LAST
];
```

If wildcard comes first, it catches everything!

### RouterLink vs Href

```html
<!-- ❌ BAD: Full page reload -->
<a href="/products">Products</a>

<!-- ✅ GOOD: No reload, SPA navigation -->
<a routerLink="/products">Products</a>
```

---

## 📌 Day 9: Route Parameters

### What are Route Parameters?

Route parameters allow you to pass dynamic values in the URL, like IDs or usernames.

**Examples:**
- `/products/123` - Shows product with ID 123
- `/user/42` - Shows user with ID 42
- `/blog/my-first-post` - Shows blog post with slug "my-first-post"

### Why Use Route Parameters?

1. **Dynamic Content**: Show different data based on URL
2. **Bookmarkable**: Users can save and share specific items
3. **RESTful URLs**: Follow web standards (`/products/1`, `/products/2`)
4. **Clean URLs**: Better than query params for primary identifiers

### Defining Routes with Parameters

Use `:paramName` syntax in the route path:

```typescript
export const routes: Routes = [
  { path: 'products', component: ProductsComponent },           // List all products
  { path: 'products/:id', component: ProductDetailComponent },  // Single product detail
  { path: 'user/:id', component: UserComponent },               // User profile by ID
];
```

⚠️ **Important**: Specific routes (`products`) must come BEFORE parameterized routes (`products/:id`)!

### Navigating with Parameters

#### In Template (RouterLink)

```html
<!-- Navigate to product with ID 5 -->
<a [routerLink]="['/products', 5]">View Product 5</a>

<!-- Using a variable -->
<a [routerLink]="['/products', product.id]">{{ product.name }}</a>

<!-- Loop through items -->
@for (product of products; track product.id) {
  <a [routerLink]="['/products', product.id]">{{ product.name }}</a>
}
```

#### In Component (Programmatic)

```typescript
import { Router } from '@angular/router';

constructor(private router: Router) {}

viewProduct(productId: number) {
  this.router.navigate(['/products', productId]);
}
```

### Reading Route Parameters

There are two approaches to read parameters:

#### Method 1: Snapshot (One-time read)

Best when the component won't be reused with different parameters.

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  template: `<h2>Product ID: {{ productId }}</h2>`
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Read parameter once
    this.productId = this.route.snapshot.paramMap.get('id');
  }
}
```

#### Method 2: Observable (Reactive)

Best when parameters might change while staying on the same component.

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  template: `<h2>Product ID: {{ productId }}</h2>`
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // React to parameter changes
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      // Fetch new data when parameter changes
      this.loadProduct(this.productId);
    });
  }

  loadProduct(id: string | null) {
    // Fetch product data based on ID
  }
}
```

### Complete Example: Product Detail Page

**app.routes.ts**
```typescript
export const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
];
```

**product-detail.component.ts**
```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.html'
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = '';
  product: Product | undefined;

  private products: Product[] = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 }
  ];

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    // Read the :id parameter
    this.productId = this.route.snapshot.paramMap.get('id');
    
    // Find product by ID
    if (this.productId) {
      const id = parseInt(this.productId, 10);
      this.product = this.products.find(p => p.id === id);
    }
  }

  goBack() {
    this.location.back();
  }
}
```

**product-detail.html**
```html
<div *ngIf="product">
  <h2>{{ product.name }}</h2>
  <p>Price: ${{ product.price }}</p>
  <button (click)="goBack()">← Back</button>
</div>

<div *ngIf="!product && productId">
  <h3>Product not found!</h3>
  <p>No product with ID: {{ productId }}</p>
</div>
```

### Multiple Parameters

You can have multiple parameters in a route:

```typescript
// Route definition
{ path: 'blog/:year/:month/:slug', component: BlogPostComponent }

// Navigate
<a [routerLink]="['/blog', 2024, 'january', 'my-post']">Read Post</a>

// Read parameters
ngOnInit() {
  const year = this.route.snapshot.paramMap.get('year');
  const month = this.route.snapshot.paramMap.get('month');
  const slug = this.route.snapshot.paramMap.get('slug');
}
```

### Query Parameters (Bonus)

Query parameters are different from route parameters:

```html
<!-- Query params: /products?category=electronics&sort=price -->
<a [routerLink]="['/products']" [queryParams]="{category: 'electronics', sort: 'price'}">
  Electronics
</a>
```

```typescript
// Read query params
this.route.queryParamMap.subscribe(params => {
  const category = params.get('category');
  const sort = params.get('sort');
});
```

## 📝 Practice Exercises

### Beginner Level (Day 8)

1. **Add a New Route**
   - Create a "Services" component
   - Add route: `{ path: 'services', component: ServicesComponent }`
   - Add menu item in sidebar
   - Test navigation

2. **Experiment with Active Styles**
   - Change the `.active` class styles in `app.scss`
   - Try different colors, borders, or animations

3. **Test Wildcard Route**
   - Type various invalid URLs in the browser
   - Observe how they all show the 404 page

### Beginner Level (Day 9)

4. **Add More Products**
   - Add 2-3 more products to the products array
   - Give them IDs, names, prices, descriptions
   - Test navigation to their detail pages

5. **Customize Product Details**
   - Add more fields to products (e.g., `rating`, `stock`)
   - Display these in the product detail page
   - Style the additional information

6. **Experiment with URLs**
   - Manually type URLs like `/products/1`, `/products/5`
   - Try invalid IDs like `/products/999`
   - Observe how the component handles each case

### Intermediate Level

7. **Create a Dashboard Route**
   - Generate a new Dashboard component
   - Add it to routes
   - Make it the default route (redirect from `''`)

8. **Blog Posts with Parameters**
   - Create BlogList and BlogPost components
   - Add routes: `/blog` and `/blog/:id`
   - Create sample blog posts with IDs
   - Implement navigation between list and detail

9. **Programmatic Navigation**
   - Inject `Router` in a component
   - Navigate using `this.router.navigate(['/products', id])`
   - Add buttons that navigate programmatically

10. **Search by ID**
    - Add an input field in Products page
    - Let users type a product ID
    - Navigate to that product's detail page

### Advanced Level

11. **Observable Parameters**
    - Change from snapshot to observable approach in product-detail
    - Add "Next Product" / "Previous Product" buttons
    - Navigate between products without leaving the detail component
    - Observe how the observable updates automatically

12. **Multiple Parameters**
    - Create a route: `/archive/:year/:month/:day`
    - Build an ArchiveComponent that reads all three parameters
    - Display content based on the date parameters

13. **Query Parameters + Route Parameters**
    - Add filtering to product list (`/products?category=electronics`)
    - Combine with detail view (`/products/5?ref=search`)
    - Read both route params and query params in components

14. **Route Guards** (Preview for later days)
    - Research `CanActivate` guard
    - Try protecting a route (e.g., admin page)
    - Create a simple authentication check

## 🎨 Customization Ideas

1. Change sidebar color scheme
2. Add icons to menu items (use emoji or icon library)
3. Add a header with logo
4. Add footer with copyright
5. Change page transition animations
6. Add a search bar in header
7. Make sidebar collapsible on mobile

## 🧪 Testing Your Understanding

### Day 8 Questions
- ✅ What is the purpose of `<router-outlet>`?
- ✅ Why use `routerLink` instead of `href`?
- ✅ What does `routerLinkActive` do?
- ✅ Why must wildcard route be last?
- ✅ How does Angular Router prevent page reloads?

### Day 9 Questions
- ✅ How do you define a route with parameters?
- ✅ What is the syntax for route parameters in the path?
- ✅ What's the difference between `snapshot.paramMap` and `paramMap.subscribe()`?
- ✅ When should you use the Observable approach vs Snapshot?
- ✅ How do you navigate to a route with parameters using `routerLink`?
- ✅ How do you read multiple parameters from a route?
- ✅ What's the difference between route parameters and query parameters?

## 🎓 Interview Questions You Can Now Answer

### Day 8 - Basic Routing

1. **Q**: What is routing in Angular?
   **A**: Routing is a mechanism that enables navigation between different views/components in a single-page application without reloading the entire page.

2. **Q**: What is the difference between `routerLink` and `href`?
   **A**: `routerLink` enables SPA navigation without page reload, while `href` causes a full page reload. `routerLink` is the correct way to navigate in Angular.

3. **Q**: What is `<router-outlet>`?
   **A**: It's a placeholder directive where the routed component is displayed based on the current URL.

4. **Q**: Why should wildcard routes be last?
   **A**: Because Angular processes routes in order. If wildcard (`**`) comes first, it matches everything and other routes never get a chance to match.

5. **Q**: How do you configure routes in Angular?
   **A**: Define a `Routes` array with path-to-component mappings in `app.routes.ts`, then provide it to the application via `provideRouter`.

### Day 9 - Route Parameters

6. **Q**: What are route parameters in Angular?
   **A**: Route parameters are dynamic segments in a URL path (e.g., `/products/:id`) that allow passing values to components. They're defined with a colon prefix and read using ActivatedRoute.

7. **Q**: How do you define a route with parameters?
   **A**: Use the `:paramName` syntax in the route path: `{ path: 'products/:id', component: ProductDetailComponent }`

8. **Q**: What's the difference between `snapshot.paramMap` and `paramMap.subscribe()`?
   **A**: `snapshot.paramMap` reads parameters once when the component initializes. `paramMap.subscribe()` creates an observable that reacts to parameter changes while staying on the same component, useful when navigating between items without destroying the component.

9. **Q**: How do you navigate with route parameters?
   **A**: Use `[routerLink]="['/products', productId]"` in templates or `this.router.navigate(['/products', productId])` in component code.

10. **Q**: How do you read route parameters in a component?
    **A**: Inject `ActivatedRoute` and use `this.route.snapshot.paramMap.get('id')` for one-time read, or `this.route.paramMap.subscribe()` for reactive updates.

11. **Q**: When should you use Observable vs Snapshot for reading parameters?
    **A**: Use Snapshot when navigating away destroys the component. Use Observable when the same component is reused with different parameters (e.g., navigating from Product 1 to Product 2 without leaving the detail page).

12. **Q**: What's the difference between route parameters and query parameters?
    **A**: Route parameters are part of the path (`/products/123`), required for the route to work, and better for essential identifiers. Query parameters are optional key-value pairs after `?` (`/products?sort=price&filter=electronics`), better for optional filters or settings.

## 🐛 Common Mistakes to Avoid

### Day 8 Mistakes

1. **Wildcard Route Position**
   ```typescript
   // ❌ WRONG: Wildcard first
   { path: '**', component: NotFoundComponent },
   { path: 'home', component: HomeComponent }
   
   // ✅ CORRECT: Wildcard last
   { path: 'home', component: HomeComponent },
   { path: '**', component: NotFoundComponent }
   ```

2. **Using href instead of routerLink**
   ```html
   <!-- ❌ WRONG: Causes page reload -->
   <a href="/home">Home</a>
   
   <!-- ✅ CORRECT: SPA navigation -->
   <a routerLink="/home">Home</a>
   ```

3. **Forgetting to import RouterLink**
   ```typescript
   // ❌ WRONG: Missing import
   imports: [CommonModule]
   
   // ✅ CORRECT: Import RouterLink
   imports: [CommonModule, RouterLink, RouterLinkActive]
   ```

### Day 9 Mistakes

4. **Wrong Route Order with Parameters**
   ```typescript
   // ❌ WRONG: Parameterized route before specific route
   { path: 'products/:id', component: ProductDetailComponent },
   { path: 'products/new', component: NewProductComponent }
   // 'products/new' will be caught by 'products/:id' with id='new'
   
   // ✅ CORRECT: Specific routes first
   { path: 'products/new', component: NewProductComponent },
   { path: 'products/:id', component: ProductDetailComponent }
   ```

5. **Not Handling Missing Parameters**
   ```typescript
   // ❌ WRONG: No null check
   ngOnInit() {
     const id = this.route.snapshot.paramMap.get('id');
     this.product = this.products.find(p => p.id === id); // Error if id is null
   }
   
   // ✅ CORRECT: Check for null
   ngOnInit() {
     const id = this.route.snapshot.paramMap.get('id');
     if (id) {
       this.product = this.products.find(p => p.id === parseInt(id, 10));
     }
   }
   ```

6. **Forgetting to Import ActivatedRoute**
   ```typescript
   // ❌ WRONG: Missing import
   import { Component } from '@angular/core';
   
   // ✅ CORRECT: Import ActivatedRoute
   import { Component } from '@angular/core';
   import { ActivatedRoute } from '@angular/router';
   ```

7. **Using Snapshot When Observable is Needed**
   ```typescript
   // ❌ WRONG: Won't update when navigating Product 1 → Product 2
   ngOnInit() {
     this.id = this.route.snapshot.paramMap.get('id');
   }
   
   // ✅ CORRECT: Use Observable for reactive updates
   ngOnInit() {
     this.route.paramMap.subscribe(params => {
       this.id = params.get('id');
       this.loadProduct(this.id);
     });
   }
   ```

8. **Wrong RouterLink Syntax for Parameters**
   ```html
   <!-- ❌ WRONG: String interpolation -->
   <a routerLink="/products/{{ productId }}">View</a>
   
   <!-- ✅ CORRECT: Array syntax with property binding -->
   <a [routerLink]="['/products', productId]">View</a>
   ```

## 📚 What's Next?

Now that you understand routing and route parameters, you're ready for:
- **Day 10**: Forms (Template-driven and Reactive)
- Query Parameters in depth (e.g., `/products?category=electronics&sort=price`)
- Child Routes and nested routing
- Route Guards (CanActivate, CanDeactivate)
- Lazy Loading (load routes on demand for better performance)
- Route Resolvers (pre-fetch data before showing component)

## 💡 Tips

### Day 8 Tips
- Always use `routerLink` for internal navigation
- Keep routes configuration in a separate file
- Use meaningful route paths (e.g., `/about` not `/pg2`)
- Test wildcard route by typing invalid URLs
- Use browser DevTools Network tab to verify no page reloads

### Day 9 Tips
- Always check if parameter is null before using it
- Use `parseInt()` when converting string IDs to numbers
- Put specific routes before parameterized routes
- Use snapshot for one-time reads, Observable for reactive updates
- Handle "not found" cases gracefully in your components
- Use Location.back() for browser-style back navigation

---

## 🎉 Congratulations!

You've completed Day 8 & 9 - Routing & Route Parameters! You now understand how to:

### Day 8 Skills ✅
- Configure routes in Angular
- Navigate between pages without reload
- Highlight active routes
- Handle 404 errors
- Use router-outlet for component display

### Day 9 Skills ✅
- Define routes with parameters (`:id`)
- Read route parameters using ActivatedRoute
- Navigate with parameters using RouterLink
- Build dynamic detail pages
- Handle missing/invalid parameters
- Use both snapshot and observable approaches

**Next**: Day 10 - Forms (Template-driven & Reactive Forms)

---

## 📖 Quick Reference

### Day 8: Basic Route Configuration
```typescript
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
];
```

### Day 8: Navigation in Template
```html
<a routerLink="/home" routerLinkActive="active">Home</a>
```

### Day 8: Navigation in Component
```typescript
constructor(private router: Router) {}

goHome() {
  this.router.navigate(['/home']);
}
```

### Day 8: Router Outlet
```html
<router-outlet></router-outlet>
```

---

### Day 9: Route with Parameters
```typescript
const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'blog/:year/:month/:slug', component: BlogPostComponent }
];
```

### Day 9: Navigate with Parameters (Template)
```html
<!-- Single parameter -->
<a [routerLink]="['/products', 5]">Product 5</a>
<a [routerLink]="['/products', product.id]">{{ product.name }}</a>

<!-- Multiple parameters -->
<a [routerLink]="['/blog', 2024, 'january', 'my-post']">Read Post</a>
```

### Day 9: Navigate with Parameters (Component)
```typescript
constructor(private router: Router) {}

viewProduct(id: number) {
  this.router.navigate(['/products', id]);
}
```

### Day 9: Read Parameters (Snapshot)
```typescript
import { ActivatedRoute } from '@angular/router';

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  const year = this.route.snapshot.paramMap.get('year');
}
```

### Day 9: Read Parameters (Observable)
```typescript
import { ActivatedRoute } from '@angular/router';

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    this.loadData(id);
  });
}
```

### Day 9: Back Navigation
```typescript
import { Location } from '@angular/common';

constructor(private location: Location) {}

goBack() {
  this.location.back();
}
```
