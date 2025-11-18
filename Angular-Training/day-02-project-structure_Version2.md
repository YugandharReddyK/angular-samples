# Day 2: Angular Project Structure & Anatomy 📁

## 🎯 Learning Objectives

By the end of Day 2, you will:
- Understand Angular project folder structure
- Know the purpose of each key file and directory
- Understand how Angular bootstraps an application
- Differentiate between NgModules and Standalone components
- Configure Angular project settings
- Navigate the project confidently

---

## 🗂️ Angular Project Structure

When you create an Angular project with `ng new my-app`, you get this structure:

```
my-app/
├── node_modules/          # Dependencies (auto-generated, don't edit)
├── src/                   # Source code (your work goes here)
│   ├── app/              # Application code
│   │   ├── app.component.ts        # Root component class
│   │   ├── app.component.html      # Root component template
│   │   ├── app.component.css       # Root component styles
│   │   ├── app.component.spec.ts   # Root component tests
│   │   ├── app.config.ts           # App configuration (standalone)
│   │   └── app.routes.ts           # Routing configuration
│   ├── assets/           # Static files (images, fonts, etc.)
│   ├── index.html        # Main HTML file
│   ├── main.ts           # Application entry point
│   └── styles.css        # Global styles
├── angular.json          # Angular CLI configuration
├── package.json          # npm dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

---

## 📂 Folder and File Details

### **Root Level Files**

| File | Purpose | When to Edit |
|------|---------|--------------|
| `package.json` | Lists dependencies, npm scripts | Adding new packages |
| `angular.json` | Angular CLI configuration, build options | Changing build settings, adding assets |
| `tsconfig.json` | TypeScript compiler settings | Advanced TypeScript config |
| `tsconfig.app.json` | App-specific TypeScript config | App compilation settings |
| `.editorconfig` | Code editor settings (indentation, etc.) | Rarely |
| `.gitignore` | Files to exclude from git | Adding files to ignore |

### **src/ Folder (Your Code)**

| Path | Purpose | Frequency of Use |
|------|---------|------------------|
| `src/main.ts` | Bootstraps the application | Rarely (initial setup) |
| `src/index.html` | Main HTML, loads Angular app | Rarely (metadata, scripts) |
| `src/styles.css` | Global application styles | Often (global CSS) |
| `src/app/` | All application components, services | **Always** |
| `src/assets/` | Images, fonts, static files | Often |
| `src/environments/` | Environment-specific config (older projects) | Sometimes |

### **src/app/ Folder (Application)**

| File | Purpose |
|------|---------|
| `app.component.ts` | Root component TypeScript class |
| `app.component.html` | Root component template |
| `app.component.css/scss` | Root component styles |
| `app.component.spec.ts` | Unit tests for root component |
| `app.config.ts` | Application configuration (standalone apps) |
| `app.routes.ts` | Application routing |

---

## 🚀 How Angular Bootstraps

### **Step-by-Step Bootstrap Process**

```
1. Browser loads index.html
   ↓
2. index.html contains <app-root></app-root>
   ↓
3. main.ts runs (entry point)
   ↓
4. main.ts bootstraps AppComponent
   ↓
5. Angular renders AppComponent into <app-root>
   ↓
6. Application is running!
```

### **1. index.html** (The Starting Point)

```html
<!-- src/index.html -->
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MyApp</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <!-- Angular will inject the app here -->
  <app-root></app-root>
</body>
</html>
```

**Key Points:**
- `<app-root>` is a placeholder for the Angular app
- Angular CLI automatically injects compiled JavaScript bundles
- You rarely need to edit this file

### **2. main.ts** (Application Entry Point)

**Modern Standalone Approach (Angular 14+):**
```typescript
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

**Explanation:**
- `bootstrapApplication()` starts the app with a standalone component
- `appConfig` contains providers (services, routes, etc.)
- `AppComponent` is the root component

**Traditional NgModule Approach (older projects):**
```typescript
// src/main.ts (NgModule version)
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

### **3. app.config.ts** (Application Configuration)

```typescript
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),        // Routing
    provideHttpClient(),          // HTTP client
    // Add other providers here
  ]
};
```

---

## 🧩 Understanding NgModules vs Standalone

### **NgModule Approach (Traditional)**

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [    // Components, directives, pipes
    AppComponent,
    HeaderComponent
  ],
  imports: [         // Other modules
    BrowserModule
  ],
  providers: [],     // Services
  bootstrap: [AppComponent]  // Root component
})
export class AppModule { }
```

### **Standalone Approach (Modern - Recommended)**

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent],  // Direct imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
}
```

**Benefits of Standalone:**
- ✅ Simpler, less boilerplate
- ✅ Better tree-shaking (smaller bundles)
- ✅ Easier lazy loading
- ✅ Clearer dependencies

---

## ⚙️ Configuration Files Explained

### **package.json**

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",           // npm start → runs dev server
    "build": "ng build",           // npm run build → production build
    "test": "ng test"              // npm test → run unit tests
  },
  "dependencies": {
    "@angular/core": "^17.0.0",    // Angular framework
    "@angular/common": "^17.0.0",
    "@angular/router": "^17.0.0",
    "rxjs": "~7.8.0",              // Reactive programming
    "tslib": "^2.3.0",
    "zone.js": "~0.14.2"           // Change detection
  },
  "devDependencies": {
    "@angular/cli": "^17.0.0",     // Angular CLI
    "typescript": "~5.2.2"         // TypeScript compiler
  }
}
```

### **angular.json** (Key Sections)

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist/my-app",           // Build output folder
            "index": "src/index.html",
            "main": "src/main.ts",                 // Entry point
            "styles": [
              "src/styles.css"                     // Global styles
            ],
            "scripts": [],                         // Global scripts
            "assets": [
              "src/favicon.ico",
              "src/assets"                         // Copy these to dist/
            ]
          }
        },
        "serve": {
          "options": {
            "port": 4200                           // Dev server port
          }
        }
      }
    }
  }
}
```

### **tsconfig.json** (TypeScript Settings)

```json
{
  "compilerOptions": {
    "target": "ES2022",                    // JavaScript version
    "module": "ES2022",
    "lib": ["ES2022", "dom"],
    "strict": true,                        // Strict type checking
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

## 🎯 Practical Examples

### Example 1: Adding Global Styles

```css
/* src/styles.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

a {
  text-decoration: none;
  color: #007bff;
}

button {
  cursor: pointer;
}
```

### Example 2: Adding Assets

```
src/
└── assets/
    ├── images/
    │   ├── logo.png
    │   └── background.jpg
    ├── fonts/
    │   └── custom-font.woff2
    └── data/
        └── products.json
```

**Using assets in components:**
```html
<!-- Access assets -->
<img src="assets/images/logo.png" alt="Logo">
<div class="banner" style="background-image: url('assets/images/background.jpg')"></div>
```

### Example 3: Environment Configuration

Create environment files for different builds:

```typescript
// src/environments/environment.ts (Development)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};

// src/environments/environment.prod.ts (Production)
export const environment = {
  production: true,
  apiUrl: 'https://api.myapp.com'
};
```

**Using in components:**
```typescript
import { environment } from '../environments/environment';

@Component({...})
export class AppComponent {
  apiUrl = environment.apiUrl;
  
  ngOnInit() {
    console.log('API URL:', this.apiUrl);
    // Development: http://localhost:3000/api
    // Production: https://api.myapp.com
  }
}
```

---

## 📚 File Naming Conventions

| Type | Naming Pattern | Example |
|------|----------------|---------|
| Component | `name.component.ts` | `user-card.component.ts` |
| Service | `name.service.ts` | `auth.service.ts` |
| Module | `name.module.ts` | `shared.module.ts` |
| Directive | `name.directive.ts` | `highlight.directive.ts` |
| Pipe | `name.pipe.ts` | `date-format.pipe.ts` |
| Model/Interface | `name.model.ts` | `user.model.ts` |
| Guard | `name.guard.ts` | `auth.guard.ts` |
| Interceptor | `name.interceptor.ts` | `token.interceptor.ts` |

## Sample Exploration


---

## 🎯 Practice Ideas

### Practice 1: Explore Your Project
1. Open each file in `src/app/` and add a comment explaining its purpose
2. Find the line in `main.ts` that starts the application
3. Locate where `<app-root>` is defined in `index.html`
4. Change the app title in `app.component.ts` and see it update

### Practice 2: Customize Global Styles
```css
/* src/styles.css */
:root {
  --primary-color: #3f51b5;
  --secondary-color: #ff4081;
  --background-color: #fafafa;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: var(--background-color);
}

h1, h2, h3 {
  color: var(--primary-color);
}
```

### Practice 3: Add Custom Assets
1. Create `src/assets/images/` folder
2. Add a logo image
3. Display it in `app.component.html`:
   ```html
   <img src="assets/images/logo.png" alt="My App Logo" width="150">
   ```

### Practice 4: Modify package.json Scripts
```json
{
  "scripts": {
    "start": "ng serve --port 4300",
    "build:prod": "ng build --configuration production",
    "serve:prod": "ng serve --configuration production"
  }
}
```

### Practice 5: Create a Welcome Component
```bash
ng generate component welcome
```

Then use it in `app.component.html`:
```html
<app-welcome></app-welcome>
```

---

## 💡 Best Practices

### 1. Organize by Feature

```
src/app/
├── core/              # Singleton services, guards
│   ├── services/
│   ├── guards/
│   └── interceptors/
├── shared/            # Reusable components, pipes, directives
│   ├── components/
│   ├── pipes/
│   └── directives/
├── features/          # Feature modules
│   ├── auth/
│   ├── dashboard/
│   └── products/
└── app.component.ts
```

### 2. Use Barrel Exports

```typescript
// shared/components/index.ts
export * from './button/button.component';
export * from './card/card.component';
export * from './modal/modal.component';

// Then import like this:
import { ButtonComponent, CardComponent } from './shared/components';
```

### 3. Keep index.html Minimal

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>My App</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
  <!-- Angular injects scripts automatically -->
</body>
</html>
```

### 4. Configure angular.json for Production

```json
{
  "configurations": {
    "production": {
      "optimization": true,
      "outputHashing": "all",
      "sourceMap": false,
      "extractCss": true,
      "namedChunks": false,
      "aot": true,
      "buildOptimizer": true
    }
  }
}
```

---

## 🐛 Common Mistakes

### 1. Editing node_modules/
```
❌ Never edit files in node_modules/
✅ Use npm install to manage dependencies
```

### 2. Putting Code Outside src/app/
```
❌ src/my-component.ts
✅ src/app/my-component/my-component.component.ts
```

### 3. Forgetting to Import Components
```typescript
// ❌ Using component without importing
template: `<app-header></app-header>`
imports: []  // Missing HeaderComponent!

// ✅ Correct
imports: [HeaderComponent]
```

### 4. Mixing Standalone and NgModule
```typescript
// ❌ Don't do this
@Component({
  standalone: true,
  // ...
})
export class MyComponent { }

@NgModule({
  declarations: [MyComponent]  // Standalone can't be declared!
})
```

---

## 🔍 Debugging Tips

### 1. Check Browser Console
```typescript
// Add logging in main.ts
bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log('App bootstrapped successfully!'))
  .catch((err) => console.error('Bootstrap error:', err));
```

### 2. Verify File Paths
```
Common errors:
- templateUrl: './header.component.html'  ✅ (relative path)
- templateUrl: 'header.component.html'    ❌ (missing ./)
```

### 3. Check angular.json
```bash
# If assets aren't loading:
# Ensure they're listed in angular.json
"assets": [
  "src/favicon.ico",
  "src/assets"
]
```

---

## ✅ End of Day 2 Checklist

- [ ] Understand project folder structure
- [ ] Know the purpose of `main.ts`, `index.html`, `angular.json`, `package.json`
- [ ] Understand how Angular bootstraps the application
- [ ] Differentiate between NgModule and Standalone components
- [ ] Add global styles successfully
- [ ] Use assets (images, fonts) in your app
- [ ] Create and use a new component
- [ ] Modify `package.json` scripts
- [ ] Organize code by feature/folder structure

---

## 📚 Additional Resources

- [Angular Workspace Configuration](https://angular.dev/reference/configs/workspace-config)
- [File Structure Best Practices](https://angular.dev/style-guide#application-structure-and-ngmodules)
- [Angular CLI Reference](https://angular.dev/cli)

---

**Next:** [Day 3 - Components Deep Dive](./day-03-components_Version2.md)

## Practice Ideas

- Edit the `AppComponent` to show your name and favorite color.
- Add a comment to each major file explaining its purpose.
- Find where the app starts (main.ts).

## Challenge

- Create a new file `welcome.component.ts` and `welcome.component.html` in `src/app/`.  
  (Don’t worry about registering it yet.)
