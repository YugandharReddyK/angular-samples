# Day 3: Components Deep Dive - Sample App

## 🎯 Learning Objectives

This app demonstrates **Angular component fundamentals** covered on Day 3 of the training:

- Creating multiple components using Angular CLI
- Understanding component structure (template, styles, class, metadata)
- Using components inside other components
- Component organization and reusability
- Component selectors and how to use them

## 📚 Concepts Covered

### 1. **Component Creation**
- Generated components using `ng generate component` (or `ng g c`)
- Each component has 4 files: `.ts`, `.html`, `.scss`, `.spec.ts`

### 2. **Components in This App**

| Component | Purpose | Location |
|-----------|---------|----------|
| **App** | Root component | `src/app/` |
| **Header** | Navigation bar | `src/app/header/` |
| **Footer** | Footer information | `src/app/footer/` |
| **Card** | Reusable card UI | `src/app/card/` |
| **ProductList** | Display product items | `src/app/product-list/` |

### 3. **Key Takeaways**
- Components are the building blocks of Angular apps
- Components can be reused multiple times (see 3 Card components)
- Components must be imported in the parent component to be used
- Each component is self-contained with its own template and styles

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Run development server
ng serve

# Open browser
# Navigate to http://localhost:4200
```

## 📝 Files to Examine

Start by examining these files in order:

1. **`src/app/app.ts`** - See how components are imported
2. **`src/app/app.html`** - See how components are used with selectors
3. **`src/app/header/header.ts`** - Examine a component class
4. **`src/app/header/header.html`** - See component template
5. **`src/app/card/`** - Notice how this component is reused 3 times!

## 🔍 Things to Try

1. **Create a new component**
   ```bash
   ng generate component sidebar
   ```

2. **Use your new component** in `app.html`:
   ```html
   <app-sidebar></app-sidebar>
   ```

3. **Modify component content** - Change text in any component and see it update

4. **Add more cards** - Add another `<app-card>` in `app.html`

5. **Style components** - Modify `.scss` files to change colors and layout

## 🎓 Practice Exercises

1. Create a new "Sidebar" component with navigation links
2. Create a "UserCard" component that displays user information
3. Try creating an inline template (template directly in `.ts` file)
4. Create a component with inline styles instead of a separate `.scss` file
5. Organize components into folders by feature

## 📖 Related Training Document

Refer to: **`day-03-components_Version2.md`** in the Angular-Training folder

## ⚠️ Important Notes

- This app focuses **ONLY on components** - no data binding yet!
- Components have hardcoded data (we'll learn data binding on Day 4)
- No services or dependency injection (that's Day 7)
- No parent-child communication yet (that's Day 6)

## 🔗 What's Next?

**Day 4:** Data Binding - Learn how to make components dynamic with interpolation, property binding, event binding, and two-way binding!
