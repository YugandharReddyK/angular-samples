# Day 9: Routing & Navigation (Part 2) – Route Parameters

## Key Concepts

### 1. Route Parameters
- Pass dynamic values in the URL (e.g., `/users/123`)
- Used for detail pages (user profile, product details, etc.)

### 2. ActivatedRoute
- Service to read route parameters in a component.

---

## Step-by-Step Guide

### Step 1: Define a Route with Parameters

In `app-routing.module.ts` or `app.module.ts`:
```typescript
const routes: Routes = [
  { path: 'user/:id', component: UserComponent },
  // ...other routes
];
```

### Step 2: Create the Component

```bash
ng generate component user
```

### Step 3: Read Parameters in the Component

#### user.component.ts
```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  template: `<h2>User ID: {{ userId }}</h2>`
})
export class UserComponent implements OnInit {
  userId: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    // For reactive updates, use:
    // this.route.paramMap.subscribe(params => {
    //   this.userId = params.get('id');
    // });
  }
}
```

### Step 4: Navigation with Parameters

In any template:
```html
<a [routerLink]="['/user', 42]">Go to User 42</a>
<!-- or in code: -->
this.router.navigate(['/user', userId]);
```

---

## Practice Ideas

- Add a list of users; clicking on a user navigates to their details page (`/user/:id`).
- Display a message if the parameter is missing or invalid.
- Try changing the parameter in the URL and observe the component update.

---

## Challenge

- Add another parameter (e.g., `/product/:id/:category`), and show both parameters in the component.
- Implement a "Back" button that navigates to the previous page using `Location` service or router.

---

## Questions to Ask

- What happens if a user visits `/user/` without an ID?
- How can you respond to route parameter changes while already on the page?
- Try using query parameters (e.g., `/user/42?showDetails=true`)—explore `ActivatedRoute` for these.

---