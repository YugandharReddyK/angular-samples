# Day 14: Pipes (Built-in & Custom)

## Key Concepts

### 1. What are Pipes?
- Pipes transform data in templates for display purposes.
- They don't change the actual data, just how it's displayed.
- Syntax: `{{ value | pipeName }}`

### 2. Built-in Pipes
- **DatePipe**: Format dates
- **UpperCasePipe / LowerCasePipe**: Change text case
- **CurrencyPipe**: Format currency
- **DecimalPipe**: Format numbers
- **JsonPipe**: Display objects as JSON
- **SlicePipe**: Extract part of an array/string
- **PercentPipe**: Format percentages

### 3. Custom Pipes
- Create your own transformation logic.

---

## Sample Code - Built-in Pipes

```typescript
// app.component.ts
export class AppComponent {
  today = new Date();
  name = 'angular';
  price = 1234.56;
  rating = 0.85;
  user = { name: 'John', age: 30 };
  items = ['Apple', 'Banana', 'Cherry', 'Date'];
}
```

```html
<!-- app.component.html -->
<h2>Built-in Pipes Examples</h2>

<!-- DatePipe -->
<p>Date: {{ today | date }}</p>
<p>Custom Date: {{ today | date:'fullDate' }}</p>
<p>Short Date: {{ today | date:'short' }}</p>

<!-- UpperCase / LowerCase -->
<p>Uppercase: {{ name | uppercase }}</p>
<p>Lowercase: {{ name | lowercase }}</p>
<p>Title Case: {{ 'hello world' | titlecase }}</p>

<!-- CurrencyPipe -->
<p>Price: {{ price | currency }}</p>
<p>Price (EUR): {{ price | currency:'EUR' }}</p>

<!-- DecimalPipe -->
<p>Decimal: {{ price | number:'1.2-2' }}</p>

<!-- PercentPipe -->
<p>Rating: {{ rating | percent }}</p>

<!-- JsonPipe -->
<p>User Object: {{ user | json }}</p>

<!-- SlicePipe -->
<p>First 2 items: {{ items | slice:0:2 }}</p>
```

---

## Creating a Custom Pipe

### Step 1: Generate a Pipe

```bash
ng generate pipe reverse
# or
ng g p reverse
```

### Step 2: Implement the Pipe

```typescript
// reverse.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    return value.split('').reverse().join('');
  }
}
```

### Step 3: Use the Custom Pipe

```html
<p>Original: {{ name }}</p>
<p>Reversed: {{ name | reverse }}</p>
<!-- Output: ralugnA -->
```

---

## Practice Ideas

- Create a pipe to capitalize the first letter of each word.
- Create a pipe that truncates text to a specified length and adds "...".
- Use multiple pipes together: `{{ today | date:'short' | uppercase }}`.

---

## Challenge

- Create a **Filter Pipe** for lists:
  - Takes an array and a search term.
  - Returns filtered array based on the search term.
  - Use it to filter a list of users by name.

Example:
```typescript
// filter.pipe.ts
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) {
      return items;
    }
    return items.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
```

```html
<input [(ngModel)]="searchTerm" placeholder="Search users...">
<ul>
  <li *ngFor="let user of users | filter:searchTerm">
    {{ user.name }}
  </li>
</ul>
```

---

## Questions to Ask

- What's the difference between pure and impure pipes?
- Can you chain multiple pipes together? Try it!
- When should you use a pipe vs a method in the component?

---