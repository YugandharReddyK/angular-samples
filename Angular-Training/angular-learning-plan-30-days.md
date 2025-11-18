# 30-Day Comprehensive Angular Learning Plan

**Audience:** Team with basic programming knowledge, starting Angular from scratch  
**Session Length:** 30 minutes instruction + self-practice and examples  
**Goal:** Build a solid foundation AND master modern Angular concepts for real-world applications

---

## 📚 **Phase 1: Fundamentals (Days 1-10)**

### Day 1: Introduction to Angular & Setup
- What is Angular? Why use it? SPA concepts.
- Install Node.js, Angular CLI.
- Create your first Angular app (`ng new my-app`).
- **Practice:** Explore project structure, modify app title.

---

### Day 2: Angular Project Structure & Anatomy
- Overview: src/, app/, assets/, environments/.
- What are modules, components?
- **Practice:** Navigate files, run app, edit configurations.

---

### Day 3: Components Deep Dive
- Create, use, and organize components.
- @Component decorator, selectors, templates.
- **Practice:** Build a header, footer, and main content components.

---

### Day 4: Templates, Data Binding, and Interpolation
- Interpolation (`{{ }}`), property binding, event binding, two-way binding.
- **Practice:** Create an interactive counter, dynamic form inputs.

---

### Day 5: Directives (ngIf, ngFor, ngClass, ngStyle)
- Structural vs attribute directives.
- **Practice:** Display product list, conditional rendering, dynamic styling.

---

### Day 6: Input & Output Properties (Parent-Child Communication)
- @Input, @Output, EventEmitter.
- **Practice:** Build product card component with parent-child data flow.

---

### Day 7: Services & Dependency Injection
- What are services? Why DI?
- Create a service, inject into a component.
- **Practice:** Create data service, logger service, cart service.

---

### Day 8: Routing & Navigation (Part 1)
- Angular Router basics, configure routes.
- **Practice:** Set up Home, About, Contact pages with navigation.

---

### Day 9: Routing & Navigation (Part 2)
- Route parameters, query params, child routes.
- **Practice:** Create product details page with route parameters.

---

### Day 10: Forms – Template-Driven
- ngModel, form controls, validation, form states.
- **Practice:** Build login form with validation messages.

---

## 🚀 **Phase 2: Intermediate Concepts (Days 11-20)**

### Day 11: Forms – Reactive Forms
- FormGroup, FormControl, FormBuilder, Validators.
- **Practice:** Build registration form with custom validators.

---

### Day 12: HTTP Client & API Calls
- Using HttpClient, GET/POST/PUT/DELETE requests.
- **Practice:** Fetch data from JSONPlaceholder API.

---

### Day 13: RxJS Basics & Observables
- What are Observables? Subjects, BehaviorSubject.
- Basic operators: map, filter, tap, catchError.
- **Practice:** Create search functionality with debounce.

---

### Day 14: Async Data Handling & Error Management
- Async pipe, loading states, error handling.
- **Practice:** Build user list with loading spinner and error messages.

---

### Day 15: Pipes (Built-in & Custom)
- Built-in pipes: date, currency, uppercase, lowercase.
- Create custom pipes for filtering and transformation.
- **Practice:** Create filter pipe, phone number formatter.

---

### Day 16: Lifecycle Hooks
- ngOnInit, ngOnChanges, ngOnDestroy, ngAfterViewInit.
- **Practice:** Log lifecycle events, cleanup subscriptions.

---

### Day 17: Content Projection & ng-template
- ng-content, ng-template, ng-container.
- **Practice:** Build reusable card component with content projection.

---

### Day 18: Angular Modules & Lazy Loading
- Feature modules, shared modules, core modules.
- Lazy loading routes for better performance.
- **Practice:** Create admin module with lazy loading.

---

### Day 19: Component Styling & Encapsulation
- Component styles, view encapsulation modes.
- Angular Material or custom styling.
- **Practice:** Style components with different encapsulation modes.

---

### Day 20: Route Guards & Interceptors
- AuthGuard, CanActivate, CanDeactivate.
- HTTP Interceptors for authentication, logging.
- **Practice:** Implement login guard and token interceptor.

---

## 🔥 **Phase 3: Advanced & Modern Angular (Days 21-28)**

### Day 21: Standalone Components (Modern Angular)
- What are standalone components?
- Migration from modules to standalone.
- **Practice:** Convert existing app to standalone components.

---

### Day 22: Signals - Modern Reactivity (Angular 16+)
- What are Signals? signal(), computed(), effect().
- Signals vs Observables.
- **Practice:** Build reactive counter and shopping cart with Signals.

---

### Day 23: Advanced RxJS Operators
- switchMap, mergeMap, concatMap, forkJoin, combineLatest.
- **Practice:** Implement dependent API calls, parallel requests.

---

### Day 24: Change Detection Strategies
- Default vs OnPush change detection.
- Performance optimization techniques.
- **Practice:** Optimize component rendering with OnPush.

---

### Day 25: Deferrable Views (@defer, @placeholder, @loading)
- Lazy loading templates with @defer.
- Improve initial load performance.
- **Practice:** Implement deferred loading for heavy components.

---

### Day 26: State Management with Signals
- Component state, shared state with services.
- Signal-based state management patterns.
- **Practice:** Build centralized state management for e-commerce app.

---

### Day 27: Advanced Testing
- Unit testing with Jasmine/Karma.
- Component testing, service testing, async testing.
- E2E testing basics (Cypress or Playwright).
- **Practice:** Write comprehensive tests for components and services.

---

### Day 28: Dynamic Components & ViewContainerRef
- Programmatically create and destroy components.
- Component factory, ViewContainerRef.
- **Practice:** Build dynamic modal system, dynamic form builder.

---

## 🎯 **Phase 4: Real-World Application (Days 29-30)**

### Day 29: Performance Optimization & Best Practices
- TrackBy functions, lazy loading images.
- Code splitting, bundle optimization.
- Security best practices (XSS, CSRF).
- **Practice:** Audit and optimize existing application.

---

### Day 30: Final Project - E-Commerce Application
Build a complete e-commerce application with:
- Product listing with filters (Signals)
- Shopping cart (State management)
- User authentication (Guards & Interceptors)
- Checkout form (Reactive Forms)
- Admin panel (Lazy loaded module)
- API integration (HTTP Client + RxJS)
- **Practice:** Deploy to production, code review, presentation.

---

## 📋 **Daily Practice Guidelines**

### After Each Session:
1. ✅ Complete the practice exercise
2. ✅ Build a real-world example
3. ✅ Refactor previous code using new concepts
4. ✅ Code review with peers
5. ✅ Document learnings and questions

### Weekly Checkpoints:
- **End of Week 1:** Build a simple blog app
- **End of Week 2:** Build a task management app with API
- **End of Week 3:** Build a dashboard with authentication
- **End of Week 4:** Complete e-commerce project

---

## 🛠️ **Real-World Project Ideas**

Throughout the training, work on these incremental projects:

1. **Days 1-10:** Personal Portfolio Website
2. **Days 11-20:** Task/Todo Management App with API
3. **Days 21-28:** Social Media Dashboard (Posts, Comments, Likes)
4. **Days 29-30:** Full E-Commerce Platform

---

## 📖 **Additional Resources**

- [Angular Official Documentation](https://angular.dev)
- [RxJS Documentation](https://rxjs.dev)
- [Angular Update Guide](https://update.angular.io)
- [Angular Blog](https://blog.angular.dev)

---

**Tips for Success:**
- ⏰ Adjust pacing based on team progress
- 💬 Encourage questions and discussions
- 👥 Pair programming for complex topics
- 🔄 Regular code reviews
- 🎯 Focus on practical, real-world scenarios
- 🚀 Keep up with latest Angular features

---

**Next Steps After 30 Days:**
- NgRx for enterprise state management
- Server-Side Rendering (SSR) with Angular Universal
- Micro-frontends architecture
- Advanced TypeScript patterns
- CI/CD pipelines for Angular apps
