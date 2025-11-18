# Day 24: Change Detection Strategies & Performance

## 📚 Key Concepts

### 1. What is Change Detection?
Change Detection is the mechanism by which Angular detects changes in component data and updates the view accordingly.

### 2. How Angular Detects Changes
Angular uses **Zone.js** to monkey-patch browser APIs (setTimeout, addEventListener, etc.) and trigger change detection automatically when:
- User events (click, input, etc.)
- setTimeout/setInterval callbacks
- HTTP requests complete
- Any async operation completes

### 3. Change Detection Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| **Default** | Checks entire component tree | Most components |
| **OnPush** | Only checks when inputs change or events fire | Performance optimization |

---

## 🎯 Default Change Detection

```typescript
// default-component.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-default',
  standalone: true,
  template: `
    <div>
      <h3>Default Change Detection</h3>
      <p>Counter: {{ counter }}</p>
      <p>Random: {{ random }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `
})
export class DefaultComponent {
  counter = 0;
  
  // Called on EVERY change detection cycle (expensive!)
  get random(): number {
    console.log('🔄 Random getter called');
    return Math.random();
  }

  increment(): void {
    this.counter++;
  }
}
```

**Problem:** The `random` getter is called on every change detection cycle, even when nothing related to it has changed!

---

## ⚡ OnPush Change Detection

```typescript
// onpush-component.component.ts
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-onpush',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // 🚀 OnPush
  template: `
    <div class="card">
      <h3>{{ user.name }}</h3>
      <p>Email: {{ user.email }}</p>
      <p>Checks: {{ checksCount }}</p>
    </div>
  `
})
export class OnPushComponent {
  @Input() user: any;
  checksCount = 0;

  ngDoCheck(): void {
    this.checksCount++;
    console.log('OnPush component checked');
  }
}
```

### When OnPush Components Re-check:

1. **@Input() reference changes**
2. **Event originates from component**
3. **async pipe receives new value**
4. **Manual markForCheck()**

---

## 🔄 OnPush with Immutable Data

```typescript
// parent.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnPushChildComponent } from './onpush-child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [CommonModule, OnPushChildComponent],
  template: `
    <div class="parent">
      <h2>Parent Component</h2>
      <button (click)="updateUserWrong()">❌ Update Wrong (Mutate)</button>
      <button (click)="updateUserCorrect()">✅ Update Correct (New Ref)</button>
      
      <app-onpush-child [user]="user"></app-onpush-child>
    </div>
  `
})
export class ParentComponent {
  user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
  };

  // ❌ WRONG - Mutates object, OnPush won't detect
  updateUserWrong(): void {
    this.user.name = 'Jane Doe'; // Mutation!
    console.log('Mutated user (OnPush child won\'t update)');
  }

  // ✅ CORRECT - Creates new object reference
  updateUserCorrect(): void {
    this.user = {
      ...this.user,
      name: 'Jane Doe'
    };
    console.log('Created new user reference (OnPush child will update)');
  }
}
```

```typescript
// onpush-child.component.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-onpush-child',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="child">
      <h3>OnPush Child</h3>
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
  `,
  styles: [`
    .child {
      border: 2px solid #007bff;
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 8px;
    }
  `]
})
export class OnPushChildComponent {
  @Input() user: any;
}
```

---

## 🔧 Manual Change Detection

```typescript
// manual-detection.component.ts
import { 
  Component, 
  ChangeDetectionStrategy, 
  ChangeDetectorRef 
} from '@angular/core';

@Component({
  selector: 'app-manual-detection',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <h3>Manual Change Detection</h3>
      <p>Count: {{ count }}</p>
      <p>Last Updated: {{ lastUpdated }}</p>
      <button (click)="startBackgroundUpdate()">
        Start Background Update
      </button>
    </div>
  `
})
export class ManualDetectionComponent {
  count = 0;
  lastUpdated = '';

  constructor(private cdr: ChangeDetectorRef) {}

  startBackgroundUpdate(): void {
    // Update happening outside Angular's zone
    setInterval(() => {
      this.count++;
      this.lastUpdated = new Date().toLocaleTimeString();
      
      // Manually trigger change detection
      this.cdr.markForCheck();
    }, 1000);
  }

  ngOnDestroy(): void {
    // Or detach completely
    // this.cdr.detach();
  }
}
```

### ChangeDetectorRef Methods:

```typescript
// Mark this component to be checked in next cycle
this.cdr.markForCheck();

// Force immediate check (use sparingly!)
this.cdr.detectChanges();

// Detach from change detection tree
this.cdr.detach();

// Reattach to change detection tree
this.cdr.reattach();
```

---

## 📊 Performance Comparison

### List Component - Default vs OnPush

```typescript
// list-item.component.ts (OnPush)
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-list-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="item">
      <h4>{{ item.title }}</h4>
      <p>{{ item.description }}</p>
      <small>Checks: {{ checkCount }}</small>
    </div>
  `,
  styles: [`
    .item {
      padding: 1rem;
      border: 1px solid #ddd;
      margin: 0.5rem 0;
      border-radius: 4px;
    }
  `]
})
export class ListItemComponent {
  @Input() item: any;
  checkCount = 0;

  ngDoCheck(): void {
    this.checkCount++;
  }
}
```

```typescript
// list.component.ts
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent],
  template: `
    <div class="list">
      <h2>Product List ({{ items().length }} items)</h2>
      
      <button (click)="addItem()">Add Item</button>
      <button (click)="updateFirstItem()">Update First Item</button>
      
      <div class="items">
        <app-list-item 
          *ngFor="let item of items(); trackBy: trackById" 
          [item]="item">
        </app-list-item>
      </div>
    </div>
  `
})
export class ListComponent {
  items = signal([
    { id: 1, title: 'Item 1', description: 'Description 1' },
    { id: 2, title: 'Item 2', description: 'Description 2' },
    { id: 3, title: 'Item 3', description: 'Description 3' }
  ]);

  addItem(): void {
    const newId = this.items().length + 1;
    // Create new array reference (important for OnPush!)
    this.items.update(items => [
      ...items,
      { id: newId, title: `Item ${newId}`, description: `Description ${newId}` }
    ]);
  }

  updateFirstItem(): void {
    // Create new array with updated first item
    this.items.update(items => [
      { ...items[0], title: 'Updated Item' },
      ...items.slice(1)
    ]);
  }

  // Optimize *ngFor rendering
  trackById(index: number, item: any): number {
    return item.id;
  }
}
```

---

## 🚀 Performance Optimization Techniques

### 1. Use trackBy with *ngFor

```typescript
// ❌ Without trackBy - recreates all DOM elements
<div *ngFor="let item of items">{{ item.name }}</div>

// ✅ With trackBy - only updates changed items
<div *ngFor="let item of items; trackBy: trackById">{{ item.name }}</div>

trackById(index: number, item: any): number {
  return item.id; // Unique identifier
}
```

### 2. Use Pure Pipes

```typescript
// pure-filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pureFilter',
  standalone: true,
  pure: true // Only re-run when input reference changes
})
export class PureFilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    console.log('Filter pipe called');
    if (!searchTerm) return items;
    
    return items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
```

### 3. Avoid Function Calls in Templates

```typescript
// ❌ BAD - Function called on every change detection
<div>Total: {{ calculateTotal() }}</div>

// ✅ GOOD - Use computed signal or cached value
<div>Total: {{ total() }}</div>

total = computed(() => {
  return this.items().reduce((sum, item) => sum + item.price, 0);
});
```

### 4. Use async Pipe

```typescript
// ❌ Manual subscription
export class Component {
  users: User[] = [];
  
  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.cdr.markForCheck(); // Need manual trigger!
    });
  }
}

// ✅ async pipe - automatic unsubscribe + change detection
export class Component {
  users$ = this.userService.getUsers();
}

// Template:
<div *ngFor="let user of users$ | async">{{ user.name }}</div>
```

---

## 🎯 Practice Ideas

### Practice 1: Optimize Product List
Create a product list with 1000 items:
- Implement OnPush strategy
- Use trackBy function
- Measure performance difference

### Practice 2: Real-time Dashboard
Build dashboard with live updates:
- Use OnPush components
- Manual markForCheck() for WebSocket updates
- Compare with Default strategy

### Practice 3: Immutable State Management
Create todo app with:
- OnPush components throughout
- Immutable update patterns
- Proper input handling

### Practice 4: Performance Audit
Take existing app and:
- Add OnPush to appropriate components
- Add trackBy to *ngFor loops
- Replace getters with computed/cached values
- Measure before/after performance

---

## 💡 Best Practices

1. **Use OnPush by default for new components**
   ```typescript
   @Component({
     changeDetection: ChangeDetectionStrategy.OnPush
   })
   ```

2. **Always use immutable updates with OnPush**
   ```typescript
   // ✅ Create new reference
   this.items = [...this.items, newItem];
   
   // ❌ Mutate (won't trigger OnPush)
   this.items.push(newItem);
   ```

3. **Use trackBy with *ngFor**
   ```typescript
   <div *ngFor="let item of items; trackBy: trackById">
   ```

4. **Prefer async pipe over manual subscriptions**
   ```typescript
   users$ = this.service.getUsers();
   // Template: {{ users$ | async }}
   ```

5. **Use Signals for reactive state**
   ```typescript
   count = signal(0);
   doubled = computed(() => this.count() * 2);
   ```

---

## 🐛 Common Mistakes

❌ **Mutating objects with OnPush**
```typescript
this.user.name = 'New Name'; // Won't update!
```

❌ **Calling functions in templates**
```typescript
<div>{{ expensiveCalculation() }}</div> // Called every CD cycle!
```

❌ **Not using trackBy**
```typescript
<div *ngFor="let item of items"> // Recreates all on change!
```

---

## 📊 Performance Metrics

### Before Optimization:
- Change Detection cycles: **150/sec**
- Component checks: **1000+/sec**
- FPS: **30-40**

### After Optimization:
- Change Detection cycles: **15/sec** ⬇️ 90%
- Component checks: **50/sec** ⬇️ 95%
- FPS: **60** ⬆️ 50%

---

## 📚 Additional Resources

- [Angular Change Detection Guide](https://angular.dev/best-practices/runtime-performance)
- [OnPush Change Detection](https://angular.dev/api/core/ChangeDetectionStrategy)

---

## ✅ Checklist

- [ ] Understand how change detection works
- [ ] Know the difference between Default and OnPush
- [ ] Implement OnPush components
- [ ] Use immutable update patterns
- [ ] Add trackBy to all *ngFor loops
- [ ] Replace template function calls with computed
- [ ] Use async pipe for observables
- [ ] Measure performance improvements
- [ ] Know when to use markForCheck()
