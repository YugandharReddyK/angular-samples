# Day 5: Angular Directives (`ngIf`, `ngFor`, `ngClass`, `ngStyle`)

## Key Concepts

### 1. Directives
Directives are instructions in the DOM.  
- **Structural Directives:** Change the structure/layout (e.g., `*ngIf`, `*ngFor`)
- **Attribute Directives:** Change the appearance/behavior of an element (e.g., `[ngClass]`, `[ngStyle]`)

---

### 2. `*ngIf`
Show or hide elements based on a condition.

```html
<button (click)="showMessage = !showMessage">Toggle Message</button>
<p *ngIf="showMessage">Hello, Angular!</p>
```

---

### 3. `*ngFor`
Repeat an element for each item in a list.

```typescript
// app.component.ts
items = ['Apple', 'Banana', 'Cherry'];
```
```html
<ul>
  <li *ngFor="let item of items">{{ item }}</li>
</ul>
```

---

### 4. `[ngClass]` & `[ngStyle]`
Dynamically apply CSS classes/styles.

```typescript
// app.component.ts
isActive = true;
color = 'blue';
```
```html
<p [ngClass]="{ 'active': isActive }">Active Status</p>
<p [ngStyle]="{ color: color }">This is styled text.</p>
```
```css
/* app.component.css */
.active {
  font-weight: bold;
  color: red;
}
```

---

## Practice Ideas

- Create a list of tasks and display them using `*ngFor`.
- Add a button that shows/hides the task list (`*ngIf`).
- Highlight completed tasks using `[ngClass]`.
- Change the color of a message with `[ngStyle]` when a button is clicked.

---

## Challenge

- Build a simple "Todo List":
  - Tasks should be shown using `*ngFor`.
  - Add a checkbox to mark tasks as done.
  - Use `[ngClass]` to style completed tasks (e.g., strikethrough).
  - Add a button to filter and display only incomplete tasks using `*ngIf`.

---

## Questions to Ask

- What happens if you use `*ngFor` and `*ngIf` on the same element?
- Can `[ngClass]` accept multiple classes at once?
- Try combining `[ngStyle]` and `[ngClass]` for more dynamic styling.

---