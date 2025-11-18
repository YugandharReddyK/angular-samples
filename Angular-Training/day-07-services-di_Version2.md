# Day 7: Services & Dependency Injection

## Key Concepts

### 1. What is a Service?
- A service is a class that provides reusable functionality, such as fetching data, logging, or business logic.
- Services help keep components lean.

### 2. Dependency Injection (DI)
- DI is a design pattern where dependencies (like services) are provided to components instead of components creating them.
- Angular uses DI system to inject services where needed.

---

## Sample Code

### Step 1: Create a Service

```bash
ng generate service logger
# or shorter
ng g s logger
```

#### logger.service.ts
```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Service available app-wide
})
export class LoggerService {
  log(message: string) {
    console.log('LoggerService:', message);
  }
}
```

### Step 2: Use the Service in a Component

#### app.component.ts
```typescript
import { Component } from '@angular/core';
import { LoggerService } from './logger.service';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="doLog()">Log Message</button>
  `
})
export class AppComponent {
  constructor(private logger: LoggerService) {}

  doLog() {
    this.logger.log('Button clicked!');
  }
}
```

---

## Practice Ideas

- Create a service that returns a list of items (e.g., tasks, products).
- Inject the service in a component and display the items.
- Modify the service to add/remove items and see the changes in the UI.

---

## Challenge

- Build a "Message Service":
  - Create a service that stores messages.
  - Add methods to add, retrieve, and clear messages.
  - Use the service in two different components (e.g., one to add messages, one to display them).

---

## Questions to Ask

- What happens if you inject a service in two different components? Do they share the same instance?
- Try changing `providedIn: 'root'` to a different scope (e.g., in a module) and see what happens.
- Can a service depend on another service? Try it!

---