# Day 8: Routing & Navigation

## 🎯 Learning Objectives

By the end of this tutorial, you will understand:
- What is Routing in Angular
- How to configure routes
- How to navigate between pages
- How to use RouterLink and RouterLinkActive
- How to handle 404 errors with wildcard routes
- How router-outlet works

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
├── app.routes.ts             # Routes configuration
│
├── home/                     # Home page component
│   ├── home.ts
│   ├── home.html
│   └── home.scss
│
├── products/                 # Products page component
│   ├── products.ts
│   ├── products.html
│   └── products.scss
│
├── about/                    # About page component
├── contact/                  # Contact page component
└── not-found/                # 404 page component
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

### 1. Navigation Flow
- Click "Home" in sidebar → URL changes to `/home`
- Click "Products" → URL changes to `/products`
- Notice: **No page reload!** Only the component inside `<router-outlet>` changes

### 2. Active Route Highlighting
- The current page is highlighted in the sidebar
- This is done with `routerLinkActive="active"`

### 3. Browser Integration
- Press **Back button** → Goes to previous route
- Press **Forward button** → Goes to next route
- **Bookmark** a page → Direct link works!

### 4. Wildcard Route
- Type a non-existent URL (e.g., `/xyz`)
- The 404 NotFound page appears
- This is caught by the `**` wildcard route

## 🎓 How Routing Works (Step-by-Step)

1. **User clicks** a link with `routerLink="/products"`
2. **Angular Router** intercepts the click (prevents page reload)
3. **Router** changes browser URL to `/products`
4. **Router** looks up `/products` in routes array
5. **Router** finds `{ path: 'products', component: ProductsComponent }`
6. **Router** loads `ProductsComponent` into `<router-outlet>`
7. **Component displays** - User sees products page!

## 🔑 Important Concepts

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

## 📝 Practice Exercises

### Beginner Level

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

### Intermediate Level

4. **Create a Dashboard Route**
   - Generate a new Dashboard component
   - Add it to routes
   - Make it the default route (redirect from `''`)

5. **Add Route Transitions**
   - Add CSS animations when components load
   - Use Angular animations library (optional challenge)

6. **Programmatic Navigation**
   - Inject `Router` in a component
   - Navigate using `this.router.navigate(['/home'])`
   - Add buttons that navigate programmatically

### Advanced Level

7. **Route Guards** (Preview for later days)
   - Research `CanActivate` guard
   - Try protecting a route (e.g., admin page)

8. **Child Routes** (Preview for Day 9)
   - Research nested routes
   - Try creating `/products/details` route

## 🎨 Customization Ideas

1. Change sidebar color scheme
2. Add icons to menu items (use emoji or icon library)
3. Add a header with logo
4. Add footer with copyright
5. Change page transition animations
6. Add a search bar in header
7. Make sidebar collapsible on mobile

## 🧪 Testing Your Understanding

Ask yourself:
- ✅ What is the purpose of `<router-outlet>`?
- ✅ Why use `routerLink` instead of `href`?
- ✅ What does `routerLinkActive` do?
- ✅ Why must wildcard route be last?
- ✅ How does Angular Router prevent page reloads?

## 🎓 Interview Questions You Can Now Answer

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

## 🐛 Common Mistakes to Avoid

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

## 📚 What's Next?

Now that you understand basic routing, you're ready for:
- **Day 9**: Route Parameters (e.g., `/products/:id`)
- Query Parameters (e.g., `/products?category=electronics`)
- Child Routes and nested routing
- Route Guards (protect routes)
- Lazy Loading (load routes on demand)

## 💡 Tips

- Always use `routerLink` for internal navigation
- Keep routes configuration in a separate file
- Use meaningful route paths (e.g., `/about` not `/pg2`)
- Test wildcard route by typing invalid URLs
- Use browser DevTools Network tab to verify no page reloads

---

## 🎉 Congratulations!

You've completed Day 8 - Routing & Navigation! You now understand how to:
- Configure routes in Angular
- Navigate between pages without reload
- Highlight active routes
- Handle 404 errors
- Use router-outlet for component display

**Next**: Day 9 - Route Parameters & Navigation Guards

---

## 📖 Quick Reference

### Route Configuration
```typescript
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: '**', component: NotFoundComponent }
];
```

### Navigation in Template
```html
<a routerLink="/home" routerLinkActive="active">Home</a>
```

### Navigation in Component
```typescript
constructor(private router: Router) {}

goHome() {
  this.router.navigate(['/home']);
}
```

### Router Outlet
```html
<router-outlet></router-outlet>
```
