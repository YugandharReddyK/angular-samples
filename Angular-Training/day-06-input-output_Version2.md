# Day 6: Input & Output Properties (Parent-Child Communication)

## Key Concepts

### 1. @Input
- Pass data **from parent to child** component.
- The child declares an `@Input()` property to receive data.

### 2. @Output
- Send events/data **from child to parent**.
- The child declares an `@Output()` property (typically an EventEmitter).

---

## Sample Code

### Step 1: Create Child Component

```bash
ng generate component child
```

#### child.component.ts
```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <h3>Child Component</h3>
    <p>Received: {{ receivedMessage }}</p>
    <button (click)="sendMessage()">Send Message to Parent</button>
  `
})
export class ChildComponent {
  @Input() receivedMessage: string = '';
  @Output() messageSent = new EventEmitter<string>();

  sendMessage() {
    this.messageSent.emit('Hello from Child!');
  }
}
```

### Step 2: Use Child Component in Parent

#### app.component.ts (Parent)
```typescript
export class AppComponent {
  parentMessage = 'Hello from Parent!';
  childReply = '';

  onChildMessage(msg: string) {
    this.childReply = msg;
  }
}
```

#### app.component.html
```html
<h2>Parent Component</h2>
<p>Message from Child: {{ childReply }}</p>
<app-child
  [receivedMessage]="parentMessage"
  (messageSent)="onChildMessage($event)">
</app-child>
```

---

## Practice Ideas

- Pass different types of data: numbers, objects, arrays.
- Try sending multiple events from child to parent.
- Use multiple child components and pass unique messages to each.

---

## Challenge

- Build a "counter" component:
  - Parent passes a starting value (`@Input`).
  - Child displays value and has buttons to increment/decrement.
  - Child emits the new value to parent (`@Output`), which displays it.

---

## Questions to Ask

- What happens if you try to mutate an `@Input` directly in the child?
- Can a parent listen to multiple outputs from one child?
- Try making two-way binding between parent and child (hint: use both `@Input` and `@Output`).

---