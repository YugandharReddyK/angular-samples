# Day 8: Routing & Navigation (Part 1)

## Key Concepts

### 1. What is Routing?
- Routing allows you to navigate between different views/components in a single-page Angular application.

### 2. Router Module
- Angular's RouterModule enables navigation and URL management.

---

## Step-by-Step Guide

### Step 1: Setup Routing in Your App

When creating a new project with CLI, you can enable routing:
```bash
ng new my-app --routing
```

Or, add routing manually by editing `app.module.ts`:
```typescript
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  // ...
})
export class AppModule { }
```

### Step 2: Create Components for Pages

```bash
ng generate component home
ng generate component about
```

### Step 3: Configure Routes

In `app-routing.module.ts` (if present) or `app.module.ts`:
```typescript
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];
```

### Step 4: Add Router Outlet

In `app.component.html`:
```html
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/about">About</a>
</nav>
<router-outlet></router-outlet>
```

---

## Practice Ideas

- Add another page (e.g., Contact) and configure its route.
- Change the navigation to use buttons instead of links.
- Try navigating to `/about` in your browser.

---

## Challenge

- Add a “Not Found” page:
  - Create a component `not-found`.
  - Add a route: `{ path: '**', component: NotFoundComponent }`
  - Test by visiting a non-existent URL.

---

## Questions to Ask

- What happens if you visit a route that isn’t defined?
- Can you pass data between routes? (Hint: route parameters, to be covered soon!)
- How does Angular know which component to display for a given URL?

---