# Day 4: Data Binding - Sample App

## 🎯 Learning Objectives

This app demonstrates **all 4 types of data binding** in Angular:

1. **Interpolation** `{{ }}` - Display data in templates
2. **Property Binding** `[property]="value"` - Bind to HTML element properties
3. **Event Binding** `(event)="handler()"` - Handle user events
4. **Two-Way Binding** `[(ngModel)]="value"` - Sync data between component and template

## 📚 What You'll See

### 1. **Interpolation Examples**
- Display variables, expressions, and method results
- String manipulation in templates
- Dynamic content rendering

### 2. **Property Binding Examples**
- Image `src` binding
- Button `disabled` state
- Dynamic class and style binding
- Conditional styling based on component state

### 3. **Event Binding Examples**
- Click event handling
- Interactive counter
- Event parameters
- Multiple event handlers

### 4. **Two-Way Binding Examples**
- Form input synchronization
- Real-time data updates
- Character counter
- User registration form

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Run development server
ng serve

# Open browser to http://localhost:4200
```

## 🎮 Interactive Components

### Counter Component
- **Demonstrates:** Event binding + Interpolation
- **Try:** Click buttons to increment, decrement, or reset
- **Learn:** How events trigger component methods

### User Form Component
- **Demonstrates:** Two-way binding with [(ngModel)]
- **Try:** Type in fields and see instant updates
- **Learn:** How data syncs between input and component

### Image Gallery Component
- **Demonstrates:** Property binding + Event binding
- **Try:** Click images to select them
- **Learn:** Dynamic class binding and click handlers

## 📝 Key Files to Examine

1. **`src/app/app.html`** - See all 4 binding types in action
2. **`src/app/app.ts`** - Component properties and methods
3. **`src/app/counter/`** - Event binding example
4. **`src/app/user-form/`** - Two-way binding with forms
5. **`src/app/image-gallery/`** - Property and event binding combo

## 🔍 Binding Syntax Reference

| Type | Syntax | Direction | Example |
|------|--------|-----------|---------|
| **Interpolation** | `{{ value }}` | Component → Template | `<h1>{{ title }}</h1>` |
| **Property** | `[property]="value"` | Component → Template | `<img [src]="imageUrl">` |
| **Event** | `(event)="handler()"` | Template → Component | `<button (click)="save()">` |
| **Two-Way** | `[(ngModel)]="value"` | Component ↔ Template | `<input [(ngModel)]="name">` |

## ⚠️ Important Notes

### FormsModule Required for [(ngModel)]
Two-way binding requires importing `FormsModule`:

```typescript
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  // ...
})
```

### Event Object Access
Access event data with `$event`:
```html
<input (input)="handleInput($event.target.value)">
```

### Template Expressions
- Keep them simple
- Avoid complex logic
- No assignments (=, +=, etc.)
- No `new`, `typeof`, `instanceof`

## 🎓 Practice Exercises

1. **Add a Temperature Converter**
   - Input field for Celsius
   - Display Fahrenheit using interpolation
   - Use two-way binding

2. **Create a Color Picker**
   - Slider for RGB values
   - Bind slider values to a div's background color
   - Display hex color code

3. **Build a Todo Input**
   - Text input with two-way binding
   - Add button (event binding)
   - Display character count (interpolation)

4. **Image URL Changer**
   - Input field for image URL
   - Property bind to img src
   - Show "No image" if URL is empty

5. **Like Button**
   - Button with click counter
   - Change color when liked (class binding)
   - Display like count

## 📖 Related Training Document

Refer to: **`day-04-data-binding_Version2.md`** in the Angular-Training folder

## 🔗 What's Next?

**Day 5:** Directives (`*ngIf`, `*ngFor`, `ngClass`, `ngStyle`) - Learn to conditionally render and repeat elements dynamically!
