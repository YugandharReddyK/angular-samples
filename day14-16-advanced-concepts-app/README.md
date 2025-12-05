# Angular Training Days 14-16: Advanced Concepts Application

A comprehensive training application demonstrating **Pipes**, **Lifecycle Hooks**, and **Lazy Loading Modules** in Angular.

## 📚 What's Covered

### Day 14: Pipes
- **Built-in Pipes**: Date, Currency, Number, Percent, Text Case, JSON, Slice
- **Custom Pipes**: Filter, Phone Formatter, Highlight Search
- **Pipe Chaining**: Multiple transformations
- **Interactive Examples**: Real-time data transformation demos

### Day 15: Lifecycle Hooks
- **All Lifecycle Hooks**: ngOnInit, ngOnChanges, ngOnDestroy, ngDoCheck, AfterViewInit, etc.
- **Parent-Child Communication**: @Input/@Output with lifecycle tracking
- **Real-time Logging**: See exactly when each hook fires
- **Interactive Demo**: Toggle child components to observe destruction

### Day 16: Modules & Lazy Loading
- **Feature Modules**: Admin and User modules
- **Lazy Loading**: Routes loaded on-demand for better performance
- **Module Organization**: Proper separation of concerns
- **Route Configuration**: Child routes within lazy-loaded modules

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Angular CLI (v20.3.10)

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
# Start the dev server
ng serve
```

Navigate to `http://localhost:4200/` to view the application.

## 🗂️ Project Structure

```
src/app/
├── components/
│   ├── home/                    # Landing page with overview
│   ├── pipes-demo/              # Day 14: Pipes demonstrations
│   ├── lifecycle-parent/        # Day 15: Parent component
│   └── lifecycle-child/         # Day 15: Child component
├── modules/
│   ├── admin/                   # Day 16: Admin module (lazy-loaded)
│   │   ├── admin-dashboard/
│   │   ├── admin-users/
│   │   ├── admin-settings/
│   │   └── admin.routes.ts
│   └── user/                    # Day 16: User module (lazy-loaded)
│       ├── user-profile/
│       ├── user-orders/
│       └── user.routes.ts
└── pipes/
    ├── filter-pipe.ts           # Custom filter pipe
    ├── phone-pipe.ts            # Phone number formatter
    └── highlight-pipe.ts        # Text highlighter
```

## 🎯 Features Demonstrated

### Custom Pipes
- **FilterPipe**: Search/filter arrays dynamically
- **PhonePipe**: Format phone numbers (123) 456-7890
- **HighlightPipe**: Highlight search terms in text

### Lifecycle Tracking
- Real-time logging of all lifecycle events
- Parent-child interaction with @Input/@Output
- Change detection visualization
- Component destruction cleanup

### Lazy Loading Benefits
- Admin module loaded only when accessed
- User module loaded only when accessed
- Smaller initial bundle size
- Faster application startup

## 📖 Learning Objectives

After working with this application, you will understand:

1. **Pipes**
   - How to use Angular's built-in pipes
   - Creating custom pipes for specific needs
   - Chaining multiple pipes
   - Pure vs impure pipes

2. **Lifecycle Hooks**
   - When each hook is called
   - How to clean up resources
   - Parent-child lifecycle coordination
   - Performance implications

3. **Lazy Loading**
   - Code splitting strategies
   - Route configuration for lazy loading
   - Module organization best practices
   - Performance optimization

## 💻 Technologies Used

- **Angular 20.3.10**
- **TypeScript 5.7.2**
- **SCSS** for styling
- **Standalone Components** (Modern Angular approach)
- **RouterModule** for navigation

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
