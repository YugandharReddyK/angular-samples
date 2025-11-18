# Day 15: Lifecycle Hooks

## Key Concepts

### 1. What are Lifecycle Hooks?
- Special methods that Angular calls at specific moments in a component's life.
- Allow you to tap into key events like creation, updates, and destruction.

### 2. Common Lifecycle Hooks

| Hook | When It's Called |
|------|------------------|
| `ngOnChanges()` | When an `@Input()` property changes |
| `ngOnInit()` | Once, after the first `ngOnChanges()` |
| `ngDoCheck()` | During every change detection run |
| `ngAfterContentInit()` | After content (ng-content) is projected |
| `ngAfterContentChecked()` | After every check of projected content |
| `ngAfterViewInit()` | After component's view is initialized |
| `ngAfterViewChecked()` | After every check of component's view |
| `ngOnDestroy()` | Just before the component is destroyed |

---

## Sample Code

### Step 1: Implementing Lifecycle Hooks

```typescript
// lifecycle-demo.component.ts
import { 
  Component, 
  OnInit, 
  OnChanges, 
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  Input,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-lifecycle-demo',
  template: `
    <h3>Lifecycle Demo Component</h3>
    <p>Message: {{ message }}</p>
    <p>Counter: {{ counter }}</p>
  `
})
export class LifecycleDemoComponent 
  implements OnInit, OnChanges, DoCheck, AfterContentInit, 
             AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  
  @Input() message: string = '';
  counter = 0;

  constructor() {
    console.log('Constructor called');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called', changes);
  }

  ngOnInit() {
    console.log('ngOnInit called');
  }

  ngDoCheck() {
    console.log('ngDoCheck called');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked called');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called - Cleanup here!');
  }
}
```

### Step 2: Using the Component

```typescript
// app.component.ts
export class AppComponent {
  parentMessage = 'Hello from Parent';
  showComponent = true;

  changeMessage() {
    this.parentMessage = 'Message Changed at ' + new Date().toLocaleTimeString();
  }

  toggleComponent() {
    this.showComponent = !this.showComponent;
  }
}
```

```html
<!-- app.component.html -->
<h2>Lifecycle Hooks Demo</h2>
<button (click)="changeMessage()">Change Message</button>
<button (click)="toggleComponent()">Toggle Component</button>

<app-lifecycle-demo 
  *ngIf="showComponent" 
  [message]="parentMessage">
</app-lifecycle-demo>
```

---

## Practical Examples

### Example 1: Cleanup in ngOnDestroy

```typescript
export class TimerComponent implements OnInit, OnDestroy {
  private intervalId: any;
  seconds = 0;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.seconds++;
      console.log('Timer:', this.seconds);
    }, 1000);
  }

  ngOnDestroy() {
    console.log('Cleaning up timer');
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
```

### Example 2: React to Input Changes

```typescript
export class UserComponent implements OnChanges {
  @Input() userId: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId']) {
      console.log('User ID changed from', 
        changes['userId'].previousValue, 
        'to', 
        changes['userId'].currentValue
      );
      // Fetch new user data
      this.loadUserData();
    }
  }

  loadUserData() {
    console.log('Loading data for user:', this.userId);
  }
}
```

---

## Practice Ideas

- Create a component with a timer that starts in `ngOnInit` and stops in `ngOnDestroy`.
- Use `ngOnChanges` to detect when an `@Input` property changes and log the old and new values.
- Add console logs to each lifecycle hook and observe the order of execution.

---

## Challenge

- Build a **User Profile Component**:
  - Accepts `userId` as `@Input`.
  - When `userId` changes (`ngOnChanges`), fetch user data from a service.
  - Show a loading message while fetching.
  - Clean up any subscriptions in `ngOnDestroy`.
  - Log each lifecycle hook to observe the flow.

---

## Questions to Ask

- When should you use `ngOnInit` vs the constructor?
- What's the difference between `ngAfterViewInit` and `ngAfterContentInit`?
- Why is cleanup in `ngOnDestroy` important (memory leaks)?
- Try triggering each hook and observe when they fire.

---