# Day 17: Component Styling & Encapsulation

## Key Concepts

### 1. Component Styles
- Each component can have its own styles.
- Styles are scoped to the component by default.

### 2. Ways to Add Styles

**Option 1: External Stylesheet**
```typescript
@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
```

**Option 2: Inline Styles**
```typescript
@Component({
  selector: 'app-example',
  template: `<h1>Hello</h1>`,
  styles: [`
    h1 { color: blue; }
  `]
})
```

### 3. View Encapsulation Modes

| Mode | Description |
|------|-------------|
| `Emulated` (default) | Styles scoped to component using attributes |
| `None` | No encapsulation - styles are global |
| `ShadowDom` | Uses Shadow DOM for true encapsulation |

---

## Sample Code

### Step 1: Default Style Encapsulation

```typescript
// card.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <h3>{{ title }}</h3>
      <p>{{ content }}</p>
    </div>
  `,
  styles: [`
    .card {
      border: 2px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      margin: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h3 {
      color: #333;
      margin: 0 0 8px 0;
    }
    p {
      color: #666;
      margin: 0;
    }
  `]
})
export class CardComponent {
  title = 'Card Title';
  content = 'This is card content with scoped styles.';
}
```

### Step 2: Understanding Encapsulation Modes

```typescript
// emulated.component.ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-emulated',
  template: `<p class="text">Emulated Encapsulation</p>`,
  styles: [`.text { color: blue; }`],
  encapsulation: ViewEncapsulation.Emulated // Default
})
export class EmulatedComponent {}
```

```typescript
// none.component.ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-none',
  template: `<p class="global-text">No Encapsulation</p>`,
  styles: [`.global-text { color: red; }`],
  encapsulation: ViewEncapsulation.None // Styles leak globally
})
export class NoneComponent {}
```

```typescript
// shadow-dom.component.ts
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-shadow',
  template: `<p class="shadow-text">Shadow DOM</p>`,
  styles: [`.shadow-text { color: green; }`],
  encapsulation: ViewEncapsulation.ShadowDom // True isolation
})
export class ShadowComponent {}
```

---

## Step 3: Using :host and :host-context

```typescript
// themed.component.ts
@Component({
  selector: 'app-themed',
  template: `
    <div class="content">
      <h2>Themed Component</h2>
      <p>This component responds to host classes.</p>
    </div>
  `,
  styles: [`
    /* Style the component host element */
    :host {
      display: block;
      border: 2px solid #ddd;
      padding: 16px;
    }

    /* Style when host has 'dark' class */
    :host(.dark) {
      background: #333;
      color: white;
      border-color: #555;
    }

    /* Style based on ancestor context */
    :host-context(.theme-blue) .content {
      background: lightblue;
    }
  `]
})
export class ThemedComponent {}
```

```html
<!-- app.component.html -->
<app-themed></app-themed>
<app-themed class="dark"></app-themed>

<div class="theme-blue">
  <app-themed></app-themed>
</div>
```

---

## Step 4: Global Styles

```css
/* src/styles.css */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: #0056b3;
}
```

---

## Practice Ideas

- Create a button component with different style variants (primary, secondary, danger).
- Test different encapsulation modes and observe how styles behave.
- Use `:host` to style the component wrapper.
- Create a card component with custom styling.

---

## Challenge

- Build a **Theme Switcher**:
  - Create a component with multiple theme options (light, dark, blue).
  - Use `:host` and class binding to apply themes.
  - Add a toggle button to switch between themes.
  - Store the selected theme in a service.

Example:
```typescript
export class ThemeComponent {
  currentTheme = 'light';

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
  }
}
```

```html
<div [class]="currentTheme">
  <button (click)="toggleTheme()">Toggle Theme</button>
  <app-themed [class]="currentTheme"></app-themed>
</div>
```

---

## Questions to Ask

- What happens when you use `ViewEncapsulation.None`? Try it!
- How does Angular implement style encapsulation in Emulated mode? (Inspect the DOM)
- When would you use global styles vs component styles?
- Can component styles override global styles?

---