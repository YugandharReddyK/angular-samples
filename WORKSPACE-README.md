# Angular Sample Applications 🚀

Complete collection of Angular training applications demonstrating concepts from fundamentals to advanced patterns.

## 🎯 Currently Running Applications

### **Signals Demo App** - http://localhost:4200
Modern reactive state management with Angular Signals API.

**Features:**
- signal(), computed(), effect() demonstrations
- input(), output(), model() for component communication
- Performance comparison: Signals vs RxJS
- 9 interactive demos (Counter, Todo List, Shopping Cart, etc.)

**Key Learning:**
- ✅ Simpler syntax than observables
- ✅ Automatic dependency tracking
- ✅ 50-70% better performance
- ✅ No manual subscriptions needed

### **Guards & RxJS App** - http://localhost:4201
Advanced routing guards and RxJS patterns.

**Features:**
- 4 functional guards (Auth, Admin, Unsaved Changes, Feature Access)
- Advanced RxJS: debounceTime, switchMap, combineLatest, scan, shareReplay
- Real-time data streams
- Reactive state management

**Key Learning:**
- ✅ Route protection strategies
- ✅ Complex async workflows
- ✅ RxJS operator composition
- ✅ Stream-based state management

## 📚 Training Applications

### Fundamentals (Days 3-8)
| App | Topic | Key Concepts |
|-----|-------|--------------|
| `day03-components-app/` | Components | Templates, TypeScript, Component lifecycle |
| `day04-data-binding-app/` | Data Binding | Interpolation, Property, Event, Two-way binding |
| `day05-directives-app/` | Directives | ngIf, ngFor, ngSwitch, ngClass, ngStyle |
| `day06-input-output-app/` | Communication | @Input, @Output, EventEmitter |
| `day07-services-di-app/` | Services | Dependency Injection, Singleton pattern |
| `day08-routing-app/` | Routing | Navigation, Route params, Lazy loading |

### Intermediate (Days 10-13)
| App | Topic | Key Concepts |
|-----|-------|--------------|
| `day10-11-forms-app/` | Forms | Template-driven, Reactive forms, Validation |
| `day12-13-http-app/` | HTTP | REST APIs, Error handling, Loading states |

### Advanced
| App | Topic | Key Concepts |
|-----|-------|--------------|
| `day-signals-app/` | Signals | signal(), computed(), effect(), Modern state |
| `day-guards-rxjs-app/` | Guards & RxJS | Route guards, Advanced operators, Streams |

## 🚀 Quick Start

### Run Any Application
```bash
cd <app-directory>
npm install
npm start
# Opens at http://localhost:4200
```

### Run Multiple Apps
```bash
# Terminal 1: Signals App
cd day-signals-app
npm start

# Terminal 2: Guards & RxJS App
cd day-guards-rxjs-app
npm start -- --port 4201
```

## 📖 Learning Path

### Week 1: Foundations
1. **Day 3-4**: Components & Data Binding
2. **Day 5-6**: Directives & Component Communication
3. **Day 7-8**: Services & Routing

**Practice**: Run each day's app and explore the code

### Week 2: Forms & HTTP
1. **Day 10-11**: Forms (Template-driven & Reactive)
2. **Day 12-13**: HTTP Client & API Integration

**Practice**: Build a simple CRUD application

### Week 3: Advanced Concepts
1. **Guards & RxJS App**: Route protection and reactive patterns
2. **Signals App**: Modern state management

**Practice**: Refactor previous apps using Signals

## 🎯 Key Concepts

### Signals vs RxJS - When to Use Each

#### Use **Signals** For:
```typescript
// Component state
count = signal(0);
increment() {
  this.count.update(c => c + 1);
}

// Computed values
doubled = computed(() => this.count() * 2);

// Effects
effect(() => {
  console.log('Count:', this.count());
});
```

**Best For:**
- UI state (counters, toggles, form values)
- Derived values (calculations, filters)
- Synchronous updates
- Simple reactive needs

#### Use **RxJS** For:
```typescript
// HTTP requests
users$ = this.http.get<User[]>('/api/users');

// Complex async workflows
searchResults$ = this.searchTerm$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.api.search(term))
);

// Combine multiple sources
vm$ = combineLatest([users$, settings$]).pipe(
  map(([users, settings]) => ({ users, settings }))
);
```

**Best For:**
- HTTP requests
- WebSocket streams
- Complex async operations
- Advanced operators needed (debounce, retry, etc.)

#### **Best Practice: Use Both!**
```typescript
// HTTP with RxJS, state with Signals
users$ = this.http.get<User[]>('/api/users');
users = toSignal(this.users$, { initialValue: [] });

selectedUser = signal<User | null>(null);
userDetails = computed(() => {
  const user = this.selectedUser();
  return user ? `${user.name} (${user.email})` : 'None';
});
```

### Route Guards (Modern Functional Approach)

```typescript
// Functional guard (Angular 16+)
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAuthenticated()) {
    return true;
  }
  
  return router.parseUrl('/login');
};

// Apply to routes
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard]
  }
];
```

**Guard Types in Guards & RxJS App:**
- **AuthGuard**: Check authentication status
- **AdminGuard**: Verify user roles
- **UnsavedChangesGuard**: Prevent navigation with unsaved changes
- **FeatureAccessGuard**: Feature-based permissions

## 📊 Application Details

### Signals Demo App (localhost:4200)

**9 Interactive Demos:**
1. **Home**: Overview and quick start guide
2. **Basic Signals**: signal(), set(), update()
3. **Computed Signals**: computed() for derived values
4. **Effect Demo**: effect() for side effects
5. **Signal Inputs**: input(), output(), model()
6. **Comparison**: Signals vs RxJS with benchmarks
7. **Counter Demo**: Complete signal implementation
8. **Todo List**: CRUD with signals
9. **Shopping Cart**: E-commerce state management

**Bundle Size:** ~266 KB (with all features)

**Tech Stack:**
- Angular 20.3.10
- TypeScript 5.7.2
- SCSS styling
- Standalone components

### Guards & RxJS App (localhost:4201)

**8 Route Demos:**
1. **Home**: Navigation overview
2. **Public**: Accessible to all
3. **Protected**: Requires authentication (AuthGuard)
4. **Admin**: Requires admin role (AdminGuard)
5. **Form**: Unsaved changes warning (UnsavedChangesGuard)
6. **Feature**: Permission-based (FeatureAccessGuard)
7. **Data Streams**: Real-time reactive data
8. **Search**: Debounced search with RxJS

**Bundle Size:** ~157 KB

**Tech Stack:**
- Angular 20.3.10
- RxJS 7.8.0
- Functional guards
- SCSS styling

## 🎓 Learning Resources

### Documentation
- Training Materials: `/Angular-Training/` directory
- 30-Day Learning Plan: `/Angular-Training/angular-learning-plan-30-days.md`
- Individual Topics: `/Angular-Training/day-XX-*.md`

### Key Topics
- Day 22: Signals (`/Angular-Training/day-22-signals.md`)
- Day 23: Advanced RxJS (`/Angular-Training/day-23-advanced-rxjs.md`)
- Day 20: Guards & Interceptors (`/Angular-Training/day-20-guards-interceptors.md`)

### External Resources
- [Angular.dev](https://angular.dev) - Official documentation
- [Signals Guide](https://angular.dev/guide/signals)
- [RxJS Operators](https://rxjs.dev/guide/operators)
- [Route Guards](https://angular.dev/guide/routing/common-router-tasks)

## 💡 Best Practices Demonstrated

### 1. Standalone Components
All apps use standalone components (no NgModule):
```typescript
@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `<h1>{{ count() }}</h1>`
})
export class CounterComponent {
  count = signal(0);
}
```

### 2. Type Safety
Full TypeScript support:
```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

users = signal<User[]>([]);
selectedUser = signal<User | null>(null);
```

### 3. SCSS Styling
Component-scoped styles:
```scss
// Counter-specific styles
.counter-display {
  h1 {
    font-size: 4rem;
    color: var(--primary-color);
  }
}
```

### 4. Functional Guards
Modern guard pattern:
```typescript
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isAuthenticated();
};
```

## 🔧 Development Tools

### Required
- Node.js 18+
- npm 9+
- Angular CLI: `npm install -g @angular/cli`

### Recommended
- VS Code with Angular Language Service
- Angular DevTools (Chrome extension)
- Augury (deprecated, use DevTools instead)

### Useful Commands
```bash
# Generate component
ng generate component my-component

# Generate service
ng generate service my-service

# Build for production
ng build --configuration production

# Run tests
ng test

# Lint code
ng lint
```

## 🎯 Next Steps

### If You're New to Angular:
1. Start with `day03-components-app/`
2. Work through Days 3-8 apps sequentially
3. Practice with Forms and HTTP apps
4. Explore Signals app when comfortable with basics

### If You Know Angular Basics:
1. Jump to **Signals App** (localhost:4200)
2. Study **Guards & RxJS App** (localhost:4201)
3. Read Days 22-30 documentation
4. Build your own project using Signals

### If You're Building Production Apps:
1. Study both advanced apps thoroughly
2. Review performance optimization patterns
3. Learn testing strategies (Day 27)
4. Understand deployment (Day 30)

## 📈 Progress Tracking

- ✅ **Foundations** (Days 1-8): Complete
- ✅ **Forms & HTTP** (Days 10-13): Complete
- ✅ **Guards & RxJS**: Complete (localhost:4201)
- ✅ **Signals**: Complete (localhost:4200)
- ⏳ **Remaining Topics**: Documentation available (Days 14-30)

## 🤝 Contributing

Feel free to:
- Add more example applications
- Improve existing app documentation
- Add tests to sample apps
- Create additional learning materials
- Share feedback and improvements

---

**🎉 Happy Learning!**

**Remember:** Modern Angular = Signals + Standalone Components + Type Safety

Built with ❤️ for Angular developers

**Active Apps:**
- Signals Demo: http://localhost:4200
- Guards & RxJS: http://localhost:4201
