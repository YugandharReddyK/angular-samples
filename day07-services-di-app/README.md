# Day 7: Services and Dependency Injection

## 🎯 Learning Objectives

By the end of this tutorial, you will understand:
- What are Services in Angular
- Why we need Services
- How to create a Service
- What is Dependency Injection (DI)
- How to inject Services into Components
- How Services are shared across components (Singleton pattern)

## 📚 What are Services?

**Services** are classes that contain business logic, data management, or shared functionality that can be used across multiple components.

### Why Do We Need Services?

1. **Code Reusability**: Write logic once, use it everywhere
2. **Separation of Concerns**: Components focus on UI, Services handle business logic
3. **Data Sharing**: Share data between components that don't have parent-child relationships
4. **Maintainability**: Easier to test and maintain code

### Real-World Analogy

Think of a **hotel**:
- **Components** = Rooms (each room is independent)
- **Services** = Hotel facilities (restaurant, gym, laundry)
  - All rooms can use the same restaurant
  - Everyone shares the same gym
  - One laundry service for all guests

## 🔧 Creating a Service

### Basic Service Structure

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Makes it a singleton (one instance for entire app)
})
export class MyService {
  
  // Service logic goes here
  getData() {
    return "Hello from Service!";
  }
}
```

### Key Points:
- Services are just TypeScript classes
- `@Injectable()` decorator makes it injectable
- `providedIn: 'root'` creates a singleton (one instance shared by all)

## 💉 What is Dependency Injection?

**Dependency Injection (DI)** is a design pattern where Angular automatically provides (injects) instances of services to components that need them.

### Without DI (Old Way - Bad):
```typescript
export class MyComponent {
  myService = new MyService();  // ❌ Component creates service manually
}
```

### With DI (Angular Way - Good):
```typescript
export class MyComponent {
  constructor(private myService: MyService) { }  // ✅ Angular injects it
}
```

### Benefits of DI:
- Angular manages service lifecycle
- Easy to test (can inject mock services)
- Services are shared automatically
- Cleaner, more maintainable code

## 🏗️ Project Structure

```
src/app/
├── services/
│   ├── logger.ts         # Logging functionality
│   ├── data.ts           # Shared data management
│   └── cart.ts           # Shopping cart logic
├── component-a/          # Uses Logger and Data services
├── component-b/          # Uses same Data service (shared!)
└── app.component.ts      # Uses all three services
```

## 🎓 Services in This App

### 1. Logger Service
**Purpose**: Centralized logging system

```typescript
export class Logger {
  log(message: string) {
    console.log('[LOG]', message);
  }
}
```

**Usage**: Track events throughout the app
- Component A can log: "User updated message"
- Component B can log: "Component B loaded"
- Same logger, same logs list

### 2. Data Service
**Purpose**: Share data between components

```typescript
export class Data {
  message = "Hello from Data Service!";
  
  updateMessage(newMessage: string) {
    this.message = newMessage;
  }
}
```

**Key Concept**: When Component A changes the message, Component B sees the change instantly because they share the SAME Data service instance!

### 3. Cart Service
**Purpose**: Manage shopping cart

```typescript
export class Cart {
  items = [];
  
  addItem(product) {
    this.items.push(product);
  }
  
  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
}
```

**Usage**: Multiple components can add/remove items from the same cart

## 🔍 How Services Work (Singleton Pattern)

```
┌─────────────────────────────────────┐
│         Angular Injector            │
│   (Creates ONE instance of each)    │
│                                     │
│  ┌────────────────────────────┐    │
│  │    Logger Service (1)      │    │
│  │    Data Service (1)        │    │
│  │    Cart Service (1)        │    │
│  └────────────────────────────┘    │
└─────────────────────────────────────┘
            ↓         ↓         ↓
    ┌────────┐  ┌────────┐  ┌────────┐
    │  App   │  │Comp-A  │  │Comp-B  │
    │Component│  │Component│  │Component│
    └────────┘  └────────┘  └────────┘
    All components get THE SAME instance!
```

## 🚀 Running the App

```bash
# Install dependencies
npm install

# Start the development server
ng serve

# Open browser
http://localhost:4200
```

## 📖 What to Observe

### 1. Logger Service Demo
- Click buttons in different sections
- Notice all logs go to the same logs display
- This proves all components share the same Logger service

### 2. Cart Service Demo
- Add products to cart
- Total updates automatically
- Cart items persist across the app

### 3. Shared Data Service Demo
- Component A: Type a new message in the input field
- Component B: Instantly shows the same message
- This demonstrates the **singleton pattern**!

## 🎯 Key Takeaways

1. **Services = Shared Logic**: Extract business logic into services
2. **@Injectable = Injectable**: Decorator makes a class injectable
3. **Constructor Injection**: Services are injected via constructor
4. **Singleton Pattern**: One service instance is shared by all components
5. **providedIn: 'root'**: Registers service application-wide

## 🔑 Important Concepts

### How to Inject a Service

```typescript
import { Component } from '@angular/core';
import { MyService } from './services/my-service';

@Component({
  selector: 'app-my-component',
  // ...
})
export class MyComponent {
  // Inject via constructor
  constructor(private myService: MyService) { }
  
  // Now use it in methods
  doSomething() {
    this.myService.someMethod();
  }
}
```

### Service Best Practices

1. **One Responsibility**: Each service should do one thing well
2. **No UI Logic**: Services shouldn't know about templates
3. **Stateless When Possible**: Avoid storing too much state
4. **Use providedIn: 'root'**: For app-wide services (most common)

## 📝 Practice Exercises

### Beginner Level

1. **Create a User Service**
   - Create `user.service.ts`
   - Add properties: `username`, `email`, `isLoggedIn`
   - Add methods: `login()`, `logout()`, `getUsername()`
   - Inject it into AppComponent and display user info

2. **Create a Theme Service**
   - Create `theme.service.ts`
   - Add property: `isDarkMode = false`
   - Add method: `toggleTheme()`
   - Inject it into AppComponent
   - Change background color based on theme

### Intermediate Level

3. **Todo Service**
   - Create `todo.service.ts`
   - Add `todos` array
   - Add methods: `addTodo()`, `removeTodo()`, `getTodos()`
   - Create two components that share the same todo list
   - Demonstrate that adding in one component shows in the other

4. **Notification Service**
   - Create `notification.service.ts`
   - Add `notifications` array
   - Add methods: `addNotification()`, `clearNotifications()`
   - Display notifications in a separate component
   - Trigger notifications from different components

### Advanced Level

5. **API Service**
   - Create `api.service.ts`
   - Simulate API calls with `setTimeout()`
   - Add methods: `getUsers()`, `getUserById(id)`
   - Use the service in a component to display mock user data

6. **State Management**
   - Create `state.service.ts`
   - Manage global app state (e.g., user preferences, settings)
   - Create methods to get and update state
   - Use it across multiple components to share state

## 🎨 Experiment Ideas

1. Try creating a service WITHOUT `@Injectable()` - what happens?
2. Create a service without `providedIn: 'root'` - how do you provide it?
3. Add more products to the Cart service
4. Create a "discount code" feature in the Cart service
5. Add a "clear logs" button for the Logger service
6. Create a "reset all" button that resets all services

## 🧪 Testing Your Understanding

Ask yourself:
- ✅ What is a Service?
- ✅ What is Dependency Injection?
- ✅ How do you create a service?
- ✅ How do you inject a service into a component?
- ✅ What is the singleton pattern?
- ✅ Why are services better than putting logic in components?

## 🎓 Interview Questions You Can Now Answer

1. **Q**: What are Services in Angular?
   **A**: Services are classes that contain business logic, data, or functionality that can be shared across multiple components.

2. **Q**: What is Dependency Injection?
   **A**: DI is a design pattern where Angular automatically provides (injects) service instances to components that need them, rather than components creating services manually.

3. **Q**: What does `providedIn: 'root'` mean?
   **A**: It registers the service at the application root level, making it a singleton (one instance shared by all components).

4. **Q**: How do you inject a service into a component?
   **A**: By adding it as a parameter in the component's constructor:
   ```typescript
   constructor(private myService: MyService) { }
   ```

5. **Q**: Why use services instead of putting logic in components?
   **A**: For code reusability, separation of concerns, easier testing, and data sharing between components.

## 📚 What's Next?

Now that you understand Services and DI, you can:
- Learn about **HttpClient** service for API calls
- Explore **RxJS** and Observables in services
- Study **State Management** patterns (NgRx, Signals)
- Learn about **Service Hierarchies** and providers
- Master **Testing Services** with dependency injection

## 💡 Tips

- Always use services for business logic
- Keep components focused on presentation
- Use descriptive service names (e.g., `AuthService`, `DataService`)
- One service per file
- Add comments to explain complex logic
- Test services independently from components

---

## 🎉 Congratulations!

You've completed Day 7 - Services and Dependency Injection! You now understand one of Angular's most powerful features. Services are the backbone of Angular applications and mastering them will make you a much better Angular developer.

**Next**: Day 8 - Routing and Navigation
