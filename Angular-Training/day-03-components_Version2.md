# Day 3: Components Deep Dive

## 📚 Key Concepts

### 1. What is a Component?
A **component** is the fundamental building block of Angular applications. Think of components as custom HTML elements that combine:
- **Template** (HTML) - The view
- **Class** (TypeScript) - The logic and data
- **Styles** (CSS/SCSS) - The appearance
- **Metadata** (@Component decorator) - Configuration

**Real-world analogy:** Like LEGO blocks, you build complex UIs by combining smaller, reusable components.

### 2. Component Anatomy

```
Component = Template + Class + Styles + Metadata
```

| Part | Purpose | File |
|------|---------|------|
| **Template** | What users see | `.html` |
| **Class** | Logic & data | `.ts` |
| **Styles** | How it looks | `.css/.scss` |
| **Tests** | Automated tests | `.spec.ts` |

### 3. Component Lifecycle
1. Component is **created** (constructor called)
2. Angular **renders** the template
3. User **interacts** with the component
4. Component **updates** based on changes
5. Component is **destroyed** when removed

---

## 🛠️ Creating Components

### Method 1: Angular CLI (Recommended)

```bash
# Generate component with all files
ng generate component header

# Shorter form
ng g c header

# Generate standalone component (modern Angular)
ng g c header --standalone

# Generate inline template and styles
ng g c header --inline-template --inline-style

# Skip tests
ng g c header --skip-tests
```

**This creates:**
```
src/app/header/
├── header.component.ts       # Component class & metadata
├── header.component.html     # Template
├── header.component.scss     # Styles
└── header.component.spec.ts  # Unit tests
```


### Method 2: Manual Creation

```typescript
// src/app/header/header.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',              // How to use: <app-header></app-header>
  standalone: true,                     // Modern standalone component
  templateUrl: './header.component.html', // External template
  styleUrls: ['./header.component.scss']  // External styles
})
export class HeaderComponent {
  // Component properties
  title = 'Welcome to My App!';
  subtitle = 'Building amazing things with Angular';
  showMenu = false;

  // Component methods
  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  changeTitle(newTitle: string): void {
    this.title = newTitle;
  }
}
```

---

## 💻 Component Examples

### Example 1: Simple Header Component

**header.component.ts:**
```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'My Angular App';
  menuItems = ['Home', 'About', 'Services', 'Contact'];
  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
```

**header.component.html:**
```html
<header class="header">
  <div class="container">
    <h1 class="logo">{{ title }}</h1>
    
    <button class="menu-toggle" (click)="toggleMenu()">
      {{ isMenuOpen ? '✕' : '☰' }}
    </button>
    
    <nav [class.open]="isMenuOpen">
      <ul>
        <li *ngFor="let item of menuItems">
          <a href="#">{{ item }}</a>
        </li>
      </ul>
    </nav>
  </div>
</header>
```

**header.component.scss:**
```scss
.header {
  background-color: #333;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  margin: 0;
  font-size: 1.5rem;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
}

nav {
  ul {
    list-style: none;
    display: flex;
    gap: 2rem;
    margin: 0;
    padding: 0;
  }
  
  a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
    
    &:hover {
      color: #4CAF50;
    }
  }
  
  @media (max-width: 768px) {
    display: none;
    
    &.open {
      display: block;
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      background: #333;
      
      ul {
        flex-direction: column;
        padding: 1rem;
      }
    }
  }
}
```

### Example 2: User Card Component

```typescript
// user-card.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-card">
      <img [src]="user.avatar" [alt]="user.name" class="avatar">
      <div class="info">
        <h3>{{ user.name }}</h3>
        <p class="email">{{ user.email }}</p>
        <span class="badge" [class]="user.role">{{ user.role }}</span>
      </div>
      <div class="actions">
        <button (click)="onView()" class="btn-primary">View Profile</button>
        <button (click)="onEdit()" class="btn-secondary">Edit</button>
      </div>
    </div>
  `,
  styles: [`
    .user-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
    }
    
    .user-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
    
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
    }
    
    .info {
      text-align: center;
    }
    
    .info h3 {
      margin: 0 0 0.5rem 0;
      font-size: 1.25rem;
    }
    
    .email {
      color: #666;
      margin: 0 0 0.5rem 0;
    }
    
    .badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 600;
    }
    
    .badge.admin {
      background: #dc3545;
      color: white;
    }
    
    .badge.user {
      background: #28a745;
      color: white;
    }
    
    .actions {
      display: flex;
      gap: 0.5rem;
      width: 100%;
    }
    
    button {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    }
    
    .btn-primary {
      background: #007bff;
      color: white;
    }
    
    .btn-secondary {
      background: #6c757d;
      color: white;
    }
  `]
})
export class UserCardComponent {
  user: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1'
  };

  onView(): void {
    console.log('Viewing user:', this.user.name);
    alert(`Viewing profile of ${this.user.name}`);
  }

  onEdit(): void {
    console.log('Editing user:', this.user.name);
    alert(`Editing profile of ${this.user.name}`);
  }
}
```

### Example 3: Inline Template Component

```typescript
// counter.component.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  // Inline template (good for small components)
  template: `
    <div class="counter">
      <h2>Counter: {{ count() }}</h2>
      <div class="buttons">
        <button (click)="decrement()" [disabled]="count() <= 0">-</button>
        <button (click)="reset()">Reset</button>
        <button (click)="increment()">+</button>
      </div>
      <p class="status">
        @if (count() === 0) {
          <span>Start counting!</span>
        } @else if (count() < 10) {
          <span>Keep going...</span>
        } @else {
          <span>Great job! 🎉</span>
        }
      </p>
    </div>
  `,
  // Inline styles
  styles: [`
    .counter {
      text-align: center;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px;
      max-width: 400px;
      margin: 2rem auto;
    }
    
    h2 {
      margin: 0 0 1rem 0;
      font-size: 2rem;
    }
    
    .buttons {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      margin-bottom: 1rem;
    }
    
    button {
      padding: 0.75rem 1.5rem;
      border: 2px solid white;
      background: transparent;
      color: white;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
    }
    
    button:hover:not(:disabled) {
      background: white;
      color: #667eea;
    }
    
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .status {
      margin: 1rem 0 0 0;
      font-size: 1.1rem;
    }
  `]
})
export class CounterComponent {
  count = signal(0);

  increment(): void {
    this.count.update(c => c + 1);
  }

  decrement(): void {
    this.count.update(c => Math.max(0, c - 1));
  }

  reset(): void {
    this.count.set(0);
  }
}
```

---

## 🎯 Using Components

### In Templates

```html
<!-- app.component.html -->
<div class="app">
  <!-- Use header component -->
  <app-header></app-header>
  
  <main>
    <!-- Use user card component -->
    <app-user-card></app-user-card>
    
    <!-- Use counter component -->
    <app-counter></app-counter>
  </main>
  
  <!-- Use footer component -->
  <app-footer></app-footer>
</div>
```

### Importing in Standalone Components

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserCardComponent } from './user-card/user-card.component';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    UserCardComponent,
    CounterComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'My Angular App';
}
```

---

## 🎯 Practice Ideas

### Practice 1: Product Card Component
Create a product card that displays:
- Product image
- Product name
- Price
- "Add to Cart" button
- Rating (stars)

### Practice 2: Navigation Menu
Build a navigation component with:
- Logo/brand name
- Menu items (array)
- Active link highlighting
- Responsive mobile menu

### Practice 3: Todo Item Component
Create a todo item with:
- Checkbox for completion
- Todo text
- Delete button
- Edit functionality (bonus)

### Practice 4: Profile Component
Build a user profile showing:
- Profile picture
- Name and bio
- Social media links
- Follow/Unfollow button
- Stats (followers, following, posts)

### Practice 5: Weather Widget
Create a weather widget displaying:
- Current temperature
- Weather condition (sunny, rainy, etc.)
- Location
- 5-day forecast

---

## 💡 Component Best Practices

### 1. Single Responsibility
```typescript
// ❌ Bad - Component doing too much
@Component({...})
export class UserDashboardComponent {
  // Handles users, products, orders, analytics...
}

// ✅ Good - Focused components
@Component({...})
export class UserListComponent { }

@Component({...})
export class UserDetailsComponent { }

@Component({...})
export class UserStatsComponent { }
```

### 2. Meaningful Names
```typescript
// ❌ Bad
@Component({ selector: 'app-comp1' })

// ✅ Good
@Component({ selector: 'app-user-profile-card' })
```

### 3. Keep Templates Simple
```typescript
// ❌ Bad - Complex logic in template
<div>{{ (data?.items || []).filter(i => i.active).map(i => i.name).join(', ') }}</div>

// ✅ Good - Logic in component class
<div>{{ activeItemNames }}</div>

// Component
get activeItemNames(): string {
  return (this.data?.items || [])
    .filter(i => i.active)
    .map(i => i.name)
    .join(', ');
}
```

### 4. Use Signals for Reactive Data
```typescript
@Component({...})
export class MyComponent {
  // ✅ Modern reactive approach
  count = signal(0);
  doubled = computed(() => this.count() * 2);
  
  increment() {
    this.count.update(c => c + 1);
  }
}
```

---

## 🐛 Common Mistakes

### 1. Forgetting to Import Component
```typescript
// ❌ Error: Component not found
@Component({
  standalone: true,
  imports: [], // Missing HeaderComponent!
  template: `<app-header></app-header>`
})
```

### 2. Wrong Selector Usage
```typescript
// Component selector: 'app-header'

// ❌ Wrong
<header></header>
<AppHeader></AppHeader>

// ✅ Correct
<app-header></app-header>
```

### 3. Not Using Standalone
```typescript
// ❌ Old NgModule approach (still works but not recommended)
@NgModule({
  declarations: [HeaderComponent],
  ...
})

// ✅ Modern standalone (preferred)
@Component({
  standalone: true,
  ...
})
```

---

## ✅ End of Day 3 Checklist

- [ ] Understand what a component is
- [ ] Know component anatomy (template, class, styles, metadata)
- [ ] Create components using CLI
- [ ] Write inline and external templates
- [ ] Use component selectors correctly
- [ ] Import and use components in other components
- [ ] Apply basic styling to components
- [ ] Follow component best practices
- [ ] Build at least 3 different components

---

## 📚 Additional Resources

- [Angular Components Guide](https://angular.dev/guide/components)
- [Component Styles](https://angular.dev/guide/components/styling)
- [Component Interaction](https://angular.dev/guide/components/inputs)

---

**Next:** [Day 4 - Templates, Data Binding, and Interpolation](./day-04-data-binding_Version2.md)

## Practice Ideas

- Create a `footer` component and display a copyright message.
- Change the `title` in `HeaderComponent` and see it update.
- Add a button to the header that changes the title when clicked.

## Challenge

- Create a new component called `sidebar`.
- Add two properties: `menuTitle` and `menuItems` (array of strings).
- Display `menuTitle` and list the items in the template.
- Use the sidebar component in your app.

## Questions to Ask

- How does Angular know where to place your component?
- What happens if you forget to add the component to the module’s declarations?
- Try changing the selector—what happens in your HTML?
