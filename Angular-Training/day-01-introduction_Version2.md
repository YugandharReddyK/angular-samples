# Day 1: Introduction to Angular & Setup

## 📚 What is Angular?

**Angular** is a powerful, open-source web application framework developed and maintained by Google. It's used to build dynamic, single-page applications (SPAs) with TypeScript.

### Why Angular?
✅ **Component-Based Architecture** - Build reusable UI components  
✅ **TypeScript** - Type safety and better tooling  
✅ **Two-Way Data Binding** - Automatic sync between model and view  
✅ **Dependency Injection** - Built-in DI system  
✅ **Rich Ecosystem** - CLI, Router, Forms, HTTP client  
✅ **Enterprise-Ready** - Used by Google, Microsoft, Forbes, etc.  

### Key Concepts

#### 1. Single Page Application (SPA)
An SPA loads a single HTML page and dynamically updates content without full page reloads, providing a smooth, app-like experience.

**Traditional Website:**
```
User clicks link → Full page reload → New HTML from server
```

**Angular SPA:**
```
User clicks link → Angular Router → Update view (no reload)
```

#### 2. Component-Based Architecture
Angular apps are built with reusable **components**. Each component has:
- **Template** (HTML) - What to display
- **Class** (TypeScript) - Logic and data
- **Styles** (CSS/SCSS) - How it looks

#### 3. TypeScript
Angular uses TypeScript (JavaScript + Types):
```typescript
// JavaScript
let name = 'John';
name = 123; // No error!

// TypeScript
let name: string = 'John';
name = 123; // ❌ Error: Type 'number' not assignable to 'string'
```

---

## 🛠️ Environment Setup

### Step 1: Install Node.js and npm

**Node.js** is a JavaScript runtime, and **npm** is its package manager.

1. Download from [nodejs.org](https://nodejs.org/)
2. Install LTS version (recommended)
3. Verify installation:

```bash
node --version   # Should show v18.x.x or higher
npm --version    # Should show 9.x.x or higher
```

### Step 2: Install Angular CLI

The **Angular CLI** (Command Line Interface) helps create projects, generate components, and run development servers.

```bash
npm install -g @angular/cli
```

Verify installation:
```bash
ng version
```

You should see:
```
Angular CLI: 17.x.x
Node: 18.x.x
Package Manager: npm 9.x.x
```

---

## 🚀 Create Your First Angular App

### Step 1: Generate New Project

```bash
# Create new Angular app
ng new my-first-app

# You'll be prompted with questions:
? Would you like to add Angular routing? (y/N) y
? Which stylesheet format would you like to use? 
  CSS
❯ SCSS
  Sass
  Less
```

**Recommended answers:**
- Angular routing: **Yes** (y)
- Stylesheet format: **SCSS**

### Step 2: Navigate and Run

```bash
cd my-first-app
ng serve
```

or use the open flag to automatically open in browser:
```bash
ng serve --open
```

**What happens:**
- Compiles TypeScript to JavaScript
- Starts development server on **http://localhost:4200**
- Watches for file changes (auto-reload)

---

## 📁 Project Structure Overview

```
my-first-app/
├── node_modules/          # Dependencies (don't touch!)
├── src/
│   ├── app/              # 🎯 Your application code
│   │   ├── app.component.ts      # Root component class
│   │   ├── app.component.html    # Root component template
│   │   ├── app.component.scss    # Root component styles
│   │   ├── app.component.spec.ts # Unit tests
│   │   └── app.config.ts         # App configuration
│   ├── assets/           # Images, fonts, static files
│   ├── index.html        # Main HTML file
│   ├── main.ts          # Application entry point
│   └── styles.scss      # Global styles
├── angular.json         # Angular CLI configuration
├── package.json         # Project dependencies
└── tsconfig.json        # TypeScript configuration
```

### Key Files Explained:

**`src/main.ts`** - Bootstrap the application
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent);
```

**`src/app/app.component.ts`** - Root component
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',        // HTML tag: <app-root></app-root>
  standalone: true,            // Standalone component (modern)
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-first-app';      // Component property
}
```

**`src/index.html`** - Main HTML
```html
<!doctype html>
<html lang="en">
<body>
  <app-root></app-root>  <!-- Angular app loads here -->
</body>
</html>
```

---

## 💻 Your First Code Changes

### Example 1: Update the Title

**`app.component.ts`**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Welcome to Angular!';
  subtitle = 'Learning Angular is fun!';
  version = '17.0';
}
```

**`app.component.html`**
```html
<div class="container">
  <h1>{{ title }}</h1>
  <h2>{{ subtitle }}</h2>
  <p>Version: {{ version }}</p>
  <button (click)="title = 'Title Changed!'">Change Title</button>
</div>
```

**`app.component.scss`**
```scss
.container {
  text-align: center;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h1 {
  color: #dd0031;
  font-size: 3rem;
}

button {
  background-color: #dd0031;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #c50028;
}
```

### Example 2: Add Interactive Counter

**`app.component.ts`**
```typescript
export class AppComponent {
  title = 'My Angular App';
  counter = 0;

  increment(): void {
    this.counter++;
  }

  decrement(): void {
    this.counter--;
  }

  reset(): void {
    this.counter = 0;
  }
}
```

**`app.component.html`**
```html
<div class="counter-app">
  <h1>{{ title }}</h1>
  
  <div class="counter">
    <h2>Counter: {{ counter }}</h2>
    
    <div class="buttons">
      <button (click)="decrement()">-</button>
      <button (click)="reset()">Reset</button>
      <button (click)="increment()">+</button>
    </div>
  </div>
</div>
```

---

## 🎯 Practice Ideas

### Practice 1: Personal Info Card
Create a component that displays:
- Your name
- Your email
- Your role
- A button that toggles showing/hiding your email

### Practice 2: Simple Calculator
Build a calculator that:
- Has two input fields for numbers
- Buttons for +, -, ×, ÷
- Displays the result

### Practice 3: Todo List (Simple)
Create a basic todo list:
- Input field to add tasks
- List of tasks
- Button to clear all

### Practice 4: Explore Project Structure
- Open each file in `src/app/`
- Modify styles in `app.component.scss`
- Change content in `app.component.html`
- Add new properties in `app.component.ts`

---

## 🔧 Useful Angular CLI Commands

```bash
# Create new project
ng new project-name

# Start development server
ng serve
ng serve --open           # Open in browser
ng serve --port 4300      # Use different port

# Generate components
ng generate component my-component
ng g c my-component       # Short form

# Build for production
ng build
ng build --configuration production

# Run tests
ng test

# Check Angular version
ng version
```

---

## 💡 Key Takeaways

1. **Angular is a framework** for building SPAs with TypeScript
2. **Angular CLI** helps with project setup and generation
3. **Components** are the building blocks of Angular apps
4. **Data binding** (`{{ }}`) connects TypeScript to HTML
5. **Event binding** (`(click)`) responds to user actions
6. **`ng serve`** runs the development server

---

## 🐛 Common Issues & Solutions

**Problem:** `ng: command not found`
```bash
# Solution: Reinstall Angular CLI globally
npm install -g @angular/cli
```

**Problem:** Port 4200 already in use
```bash
# Solution: Use different port
ng serve --port 4300
```

**Problem:** Changes not reflecting
```bash
# Solution: Stop server (Ctrl+C) and restart
ng serve
```

---

## ✅ End of Day 1 Checklist

- [ ] Node.js and npm installed
- [ ] Angular CLI installed
- [ ] First Angular project created
- [ ] Development server running
- [ ] Understand project structure
- [ ] Modified component template
- [ ] Modified component class
- [ ] Modified component styles
- [ ] Built an interactive example (counter)

---

## 📚 Additional Resources

- [Official Angular Docs](https://angular.dev)
- [Angular CLI Documentation](https://angular.dev/cli)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Next:** [Day 2 - Angular Project Structure & Anatomy](./day-02-project-structure_Version2.md)