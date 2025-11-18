# Day 4: Templates, Data Binding, and Interpolation 🔗

## 🎯 Learning Objectives

By the end of Day 4, you will:
- Master all four types of data binding in Angular
- Use interpolation to display dynamic data
- Bind properties to HTML elements
- Handle user events effectively
- Implement two-way data binding
- Understand template expressions and statements
- Apply binding best practices

---

## 📚 Four Types of Data Binding

| Type | Syntax | Direction | Example |
|------|--------|-----------|---------|
| **Interpolation** | `{{ value }}` | Component → Template | `<h1>{{ title }}</h1>` |
| **Property Binding** | `[property]="value"` | Component → Template | `<img [src]="url">` |
| **Event Binding** | `(event)="handler()"` | Template → Component | `<button (click)="save()">` |
| **Two-Way Binding** | `[(ngModel)]="value"` | Component ↔ Template | `<input [(ngModel)]="name">` |

---

## 1️⃣ Interpolation (`{{ }}`)

### **What is Interpolation?**
Interpolation displays component data in the template by evaluating expressions inside double curly braces.

### **Basic Examples**

```typescript
// component.ts
@Component({
  selector: 'app-demo',
  standalone: true,
  template: `
    <h1>{{ title }}</h1>
    <p>User: {{ user.name }}</p>
    <p>Age: {{ user.age }}</p>
    <p>Total: {{ price * quantity }}</p>
    <p>Message: {{ getMessage() }}</p>
  `
})
export class DemoComponent {
  title = 'Welcome to Angular!';
  user = { name: 'John Doe', age: 30 };
  price = 100;
  quantity = 3;
  
  getMessage(): string {
    return `Total cost: $${this.price * this.quantity}`;
  }
}
```

**Output:**
```
Welcome to Angular!
User: John Doe
Age: 30
Total: 300
Message: Total cost: $300
```

### **What You Can Use in Interpolation**

```html
<!-- ✅ Valid -->
{{ title }}                          <!-- Property -->
{{ user.name }}                      <!-- Object property -->
{{ items[0] }}                       <!-- Array element -->
{{ price * quantity }}               <!-- Expression -->
{{ price > 100 ? 'Expensive' : 'Affordable' }}  <!-- Ternary -->
{{ getName() }}                      <!-- Method call -->
{{ 'Hello ' + name }}                <!-- String concatenation -->

<!-- ❌ Invalid -->
{{ let x = 10 }}                     <!-- No assignments -->
{{ if (true) { } }}                  <!-- No statements -->
{{ items.push(1) }}                  <!-- No state changes -->
```

---

## 2️⃣ Property Binding (`[property]`)

### **What is Property Binding?**
Binds component data to HTML element properties, attributes, or directives.

### **Basic Syntax**

```typescript
@Component({
  selector: 'app-demo',
  standalone: true,
  template: `
    <!-- Element properties -->
    <img [src]="imageUrl" [alt]="imageAlt">
    <button [disabled]="isDisabled">Click Me</button>
    <input [value]="username" [placeholder]="placeholderText">
    
    <!-- Class binding -->
    <div [class.active]="isActive">Active Item</div>
    <div [class]="dynamicClasses">Multiple Classes</div>
    
    <!-- Style binding -->
    <p [style.color]="textColor">Colored Text</p>
    <p [style.font-size.px]="fontSize">Sized Text</p>
    <div [style]="dynamicStyles">Styled Div</div>
    
    <!-- Attribute binding -->
    <button [attr.aria-label]="ariaLabel">Accessible Button</button>
    <td [attr.colspan]="columnSpan">Cell</td>
  `
})
export class DemoComponent {
  imageUrl = 'assets/logo.png';
  imageAlt = 'Company Logo';
  isDisabled = false;
  username = 'johndoe';
  placeholderText = 'Enter username';
  
  isActive = true;
  dynamicClasses = 'card elevated shadow';
  
  textColor = '#007bff';
  fontSize = 16;
  dynamicStyles = {
    'background-color': '#f0f0f0',
    'padding': '20px',
    'border-radius': '8px'
  };
  
  ariaLabel = 'Close dialog';
  columnSpan = 2;
}
```

### **Class Binding Examples**

```typescript
@Component({
  template: `
    <!-- Single class toggle -->
    <div [class.active]="isActive">Item 1</div>
    
    <!-- Multiple classes (string) -->
    <div [class]="'card shadow-sm rounded'">Item 2</div>
    
    <!-- Multiple classes (array) -->
    <div [class]="['card', 'shadow', isLarge ? 'large' : 'small']">Item 3</div>
    
    <!-- Multiple classes (object) -->
    <div [class]="{ active: isActive, disabled: isDisabled, large: isLarge }">
      Item 4
    </div>
  `
})
export class ClassBindingComponent {
  isActive = true;
  isDisabled = false;
  isLarge = true;
}
```

### **Style Binding Examples**

```typescript
@Component({
  template: `
    <!-- Single style -->
    <p [style.color]="color">Colored Text</p>
    <p [style.font-size.px]="fontSize">Sized Text</p>
    <p [style.font-size]="fontSize + 'px'">Also Sized</p>
    
    <!-- Multiple styles (object) -->
    <div [style]="cardStyles">Styled Card</div>
    
    <!-- Conditional styles -->
    <span [style.font-weight]="isImportant ? 'bold' : 'normal'">Text</span>
  `
})
export class StyleBindingComponent {
  color = '#ff6b6b';
  fontSize = 18;
  isImportant = true;
  
  cardStyles = {
    'background-color': '#ffffff',
    'padding': '20px',
    'border': '1px solid #ddd',
    'border-radius': '8px',
    'box-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)'
  };
}
```

---

## 3️⃣ Event Binding (`(event)`)

### **What is Event Binding?**
Listens to DOM events and executes component methods when they occur.

### **Common Events**

```typescript
@Component({
  selector: 'app-events',
  standalone: true,
  template: `
    <!-- Click events -->
    <button (click)="handleClick()">Click Me</button>
    <button (click)="incrementCounter()">Count: {{ counter }}</button>
    <button (dblclick)="handleDoubleClick()">Double Click</button>
    
    <!-- Input events -->
    <input (input)="onInput($event)" placeholder="Type here">
    <input (change)="onChange($event)" placeholder="Change event">
    <input (blur)="onBlur()" placeholder="Blur event">
    <input (focus)="onFocus()" placeholder="Focus event">
    
    <!-- Keyboard events -->
    <input (keyup)="onKeyUp($event)" placeholder="Any key">
    <input (keyup.enter)="onEnter()" placeholder="Press Enter">
    <input (keyup.escape)="onEscape()" placeholder="Press Escape">
    <input (keydown.shift.a)="onShiftA()" placeholder="Shift+A">
    
    <!-- Mouse events -->
    <div (mouseenter)="onMouseEnter()" 
         (mouseleave)="onMouseLeave()"
         class="hover-area">
      Hover over me!
    </div>
    
    <!-- Form events -->
    <form (submit)="onSubmit($event)">
      <input name="username">
      <button type="submit">Submit</button>
    </form>
  `
})
export class EventsComponent {
  counter = 0;
  
  handleClick(): void {
    console.log('Button clicked!');
    alert('You clicked the button!');
  }
  
  incrementCounter(): void {
    this.counter++;
  }
  
  handleDoubleClick(): void {
    console.log('Double clicked!');
  }
  
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('Current value:', input.value);
  }
  
  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('Value changed to:', input.value);
  }
  
  onBlur(): void {
    console.log('Input lost focus');
  }
  
  onFocus(): void {
    console.log('Input gained focus');
  }
  
  onKeyUp(event: KeyboardEvent): void {
    console.log('Key pressed:', event.key);
  }
  
  onEnter(): void {
    console.log('Enter key pressed!');
  }
  
  onEscape(): void {
    console.log('Escape key pressed!');
  }
  
  onShiftA(): void {
    console.log('Shift + A pressed!');
  }
  
  onMouseEnter(): void {
    console.log('Mouse entered');
  }
  
  onMouseLeave(): void {
    console.log('Mouse left');
  }
  
  onSubmit(event: Event): void {
    event.preventDefault();  // Prevent page reload
    console.log('Form submitted!');
  }
}
```

### **Event Object ($event)**

```typescript
@Component({
  template: `
    <input (input)="onInputChange($event)">
    <p>You typed: {{ inputValue }}</p>
    
    <button (click)="onButtonClick($event)">Click Position</button>
    <p>Clicked at: ({{ clickX }}, {{ clickY }})</p>
  `
})
export class EventObjectComponent {
  inputValue = '';
  clickX = 0;
  clickY = 0;
  
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.inputValue = input.value;
  }
  
  onButtonClick(event: MouseEvent): void {
    this.clickX = event.clientX;
    this.clickY = event.clientY;
  }
}
```

---

## 4️⃣ Two-Way Binding (`[(ngModel)]`)

### **What is Two-Way Binding?**
Synchronizes data between component and template in both directions.

### **Setup for Standalone Components**

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-two-way',
  standalone: true,
  imports: [FormsModule],  // ⚠️ Must import FormsModule!
  template: `...`
})
```

### **Basic ngModel Example**

```typescript
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="form">
      <h2>User Profile</h2>
      
      <!-- Text input -->
      <label>
        Name:
        <input [(ngModel)]="user.name" placeholder="Enter name">
      </label>
      
      <!-- Email input -->
      <label>
        Email:
        <input type="email" [(ngModel)]="user.email" placeholder="Enter email">
      </label>
      
      <!-- Number input -->
      <label>
        Age:
        <input type="number" [(ngModel)]="user.age">
      </label>
      
      <!-- Textarea -->
      <label>
        Bio:
        <textarea [(ngModel)]="user.bio" rows="4"></textarea>
      </label>
      
      <!-- Checkbox -->
      <label>
        <input type="checkbox" [(ngModel)]="user.subscribe">
        Subscribe to newsletter
      </label>
      
      <!-- Radio buttons -->
      <fieldset>
        <legend>Gender:</legend>
        <label>
          <input type="radio" [(ngModel)]="user.gender" value="male">
          Male
        </label>
        <label>
          <input type="radio" [(ngModel)]="user.gender" value="female">
          Female
        </label>
        <label>
          <input type="radio" [(ngModel)]="user.gender" value="other">
          Other
        </label>
      </fieldset>
      
      <!-- Select dropdown -->
      <label>
        Country:
        <select [(ngModel)]="user.country">
          <option value="">Select...</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
        </select>
      </label>
      
      <hr>
      
      <!-- Display values -->
      <h3>Current Values:</h3>
      <pre>{{ user | json }}</pre>
    </div>
  `
})
export class UserFormComponent {
  user = {
    name: '',
    email: '',
    age: 0,
    bio: '',
    subscribe: false,
    gender: '',
    country: ''
  };
}
```

### **Two-Way Binding Expanded Syntax**

```typescript
// [(ngModel)]="value" is shorthand for:
<input [ngModel]="value" (ngModelChange)="value = $event">

// You can use the expanded form for custom logic:
<input 
  [ngModel]="searchTerm" 
  (ngModelChange)="onSearchChange($event)"
>

// Component
searchTerm = '';

onSearchChange(value: string): void {
  this.searchTerm = value.toLowerCase().trim();
  console.log('Search term:', this.searchTerm);
}
```

---

## 💻 Complete Examples

### Example 1: Like Counter

```typescript
@Component({
  selector: 'app-like-counter',
  standalone: true,
  template: `
    <div class="like-widget">
      <button 
        (click)="like()" 
        [disabled]="likes >= maxLikes"
        [class.disabled]="likes >= maxLikes">
        ❤️ Like ({{ likes }})
      </button>
      
      <p *ngIf="likes >= maxLikes" class="max-message">
        Maximum likes reached!
      </p>
      
      <button (click)="reset()" class="reset-btn">Reset</button>
    </div>
  `,
  styles: [`
    .like-widget {
      text-align: center;
      padding: 20px;
    }
    
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      border: none;
      border-radius: 4px;
      margin: 5px;
    }
    
    button:not(.reset-btn) {
      background: #e74c3c;
      color: white;
    }
    
    button.disabled {
      background: #95a5a6;
      cursor: not-allowed;
    }
    
    .reset-btn {
      background: #3498db;
      color: white;
    }
    
    .max-message {
      color: #e74c3c;
      font-weight: bold;
    }
  `]
})
export class LikeCounterComponent {
  likes = 0;
  maxLikes = 10;
  
  like(): void {
    if (this.likes < this.maxLikes) {
      this.likes++;
    }
  }
  
  reset(): void {
    this.likes = 0;
  }
}
```

### Example 2: Color Picker

```typescript
@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="color-picker">
      <h2>Color Picker</h2>
      
      <label>
        Choose a color:
        <input type="color" [(ngModel)]="selectedColor">
      </label>
      
      <div 
        class="preview" 
        [style.background-color]="selectedColor">
      </div>
      
      <p>Selected: {{ selectedColor }}</p>
      
      <div class="presets">
        <button 
          *ngFor="let color of presetColors"
          (click)="selectColor(color)"
          [style.background-color]="color"
          class="preset-btn">
        </button>
      </div>
    </div>
  `,
  styles: [`
    .color-picker {
      padding: 20px;
      max-width: 400px;
      margin: 0 auto;
    }
    
    .preview {
      width: 200px;
      height: 200px;
      border: 2px solid #333;
      border-radius: 8px;
      margin: 20px 0;
    }
    
    .presets {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    
    .preset-btn {
      width: 40px;
      height: 40px;
      border: 2px solid #333;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class ColorPickerComponent {
  selectedColor = '#3498db';
  presetColors = [
    '#e74c3c', '#3498db', '#2ecc71', '#f39c12', 
    '#9b59b6', '#1abc9c', '#34495e', '#95a5a6'
  ];
  
  selectColor(color: string): void {
    this.selectedColor = color;
  }
}
```

### Example 3: Real-Time Search

```typescript
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="search-container">
      <input 
        type="text"
        [(ngModel)]="searchTerm"
        (input)="onSearch()"
        placeholder="Search products..."
        class="search-input">
      
      <p>Found {{ filteredProducts.length }} result(s)</p>
      
      <ul class="product-list">
        @for (product of filteredProducts; track product.id) {
          <li>
            <strong>{{ product.name }}</strong> - ${{ product.price }}
          </li>
        } @empty {
          <li class="no-results">No products found</li>
        }
      </ul>
    </div>
  `,
  styles: [`
    .search-container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
    }
    
    .search-input {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      border: 2px solid #ddd;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    
    .product-list {
      list-style: none;
      padding: 0;
    }
    
    .product-list li {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    
    .no-results {
      color: #999;
      font-style: italic;
    }
  `]
})
export class SearchComponent {
  searchTerm = '';
  
  products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 },
    { id: 4, name: 'Monitor', price: 299 },
    { id: 5, name: 'Headphones', price: 150 }
  ];
  
  filteredProducts = [...this.products];
  
  onSearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(term)
    );
  }
}
```

---

## 💡 Best Practices

### 1. Keep Template Expressions Simple

```typescript
// ❌ Bad - Complex logic in template
<div>{{ (user?.address?.city || 'Unknown').toUpperCase().substring(0, 10) }}</div>

// ✅ Good - Move logic to component
<div>{{ displayCity }}</div>

// Component
get displayCity(): string {
  const city = this.user?.address?.city || 'Unknown';
  return city.toUpperCase().substring(0, 10);
}
```

### 2. Use Type-Safe Event Handlers

```typescript
// ✅ Type-safe event handling
onInputChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  console.log(input.value);
}

onClick(event: MouseEvent): void {
  console.log(event.clientX, event.clientY);
}
```

### 3. Prevent Default Carefully

```typescript
// Form submission
onSubmit(event: Event): void {
  event.preventDefault();  // Prevent page reload
  this.saveData();
}

// Link click
onLinkClick(event: Event): void {
  event.preventDefault();  // Prevent navigation
  this.customAction();
}
```

### 4. Use Class and Style Bindings Wisely

```typescript
// ✅ Good - Object syntax for multiple classes
[class]="{ active: isActive, disabled: isDisabled, large: isLarge }"

// ✅ Good - Single class toggle
[class.active]="isActive"

// ❌ Avoid - String concatenation
[class]="'card ' + (isActive ? 'active' : '') + ' ' + size"
```

---

## 🎯 Practice Ideas

### Practice 1: Toggle Component
Create a component that:
- Has a "Show/Hide" button
- Toggles visibility of content
- Changes button text based on state

### Practice 2: Temperature Converter
Build a converter that:
- Has inputs for Celsius and Fahrenheit
- Updates both fields when either changes
- Uses two-way binding

### Practice 3: Form Validator
Create a registration form with:
- Name, email, password fields
- Real-time validation messages
- Submit button (disabled until valid)

### Practice 4: Theme Switcher
Build a theme toggle that:
- Changes between light/dark themes
- Updates background and text colors
- Persists selected theme

### Practice 5: Todo Input
Create a todo input that:
- Has an input field and "Add" button
- Adds items to a list
- Clears input after adding

---

## 🐛 Common Mistakes

### 1. Forgetting FormsModule

```typescript
// ❌ Error: Can't bind to 'ngModel'
@Component({
  standalone: true,
  imports: [],  // Missing FormsModule!
  template: `<input [(ngModel)]="value">`
})

// ✅ Fix
imports: [FormsModule]
```

### 2. Using Statements in Interpolation

```typescript
// ❌ Invalid
{{ let x = 10 }}
{{ if (condition) { doSomething() } }}
{{ for (let item of items) }}

// ✅ Valid
{{ condition ? 'Yes' : 'No' }}
{{ getItems() }}
```

### 3. Mutating Data in Templates

```typescript
// ❌ Bad - Side effects in template
<button (click)="items.push(newItem)">Add</button>

// ✅ Good - Use component method
<button (click)="addItem()">Add</button>

addItem(): void {
  this.items.push(this.newItem);
}
```

---

## ✅ End of Day 4 Checklist

- [ ] Understand all four binding types
- [ ] Use interpolation to display data
- [ ] Bind properties (class, style, attribute)
- [ ] Handle user events (click, input, keyup)
- [ ] Implement two-way binding with ngModel
- [ ] Use $event object correctly
- [ ] Follow template expression best practices
- [ ] Build at least 3 interactive components

---

## 📚 Additional Resources

- [Angular Template Syntax](https://angular.dev/guide/templates)
- [Data Binding Guide](https://angular.dev/guide/templates/binding)
- [Event Handling](https://angular.dev/guide/templates/event-listeners)

---

**Next:** [Day 5 - Directives (ngIf, ngFor, ngClass)](./day-05-directives_Version2.md)