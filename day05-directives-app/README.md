# Day 5: Angular Directives - Sample App

## 🎯 What You'll Learn

This app teaches you the **4 essential Angular directives**:

1. **`*ngIf`** - Show/hide elements based on conditions
2. **`*ngFor`** - Loop through arrays and display lists
3. **`[ngClass]`** - Add/remove CSS classes dynamically
4. **`[ngStyle]`** - Apply inline styles dynamically

## 📚 Simple Examples

### 1. *ngIf (Conditional Rendering)
```html
<!-- Show element only if condition is true -->
<p *ngIf="showMessage">This appears when showMessage is true</p>

<!-- Show one element or another -->
<div *ngIf="isLoggedIn; else loggedOut">Welcome!</div>
<ng-template #loggedOut>Please login</ng-template>
```

### 2. *ngFor (Looping)
```html
<!-- Loop through array -->
<li *ngFor="let item of items">{{ item }}</li>

<!-- Loop with index -->
<li *ngFor="let item of items; let i = index">
  {{ i + 1 }}. {{ item }}
</li>
```

### 3. ngClass (Dynamic Classes)
```html
<!-- Single class -->
<div [ngClass]="{ 'active': isActive }">Content</div>

<!-- Multiple classes -->
<div [ngClass]="{ 'active': isActive, 'highlighted': isHighlighted }">
  Content
</div>
```

### 4. ngStyle (Dynamic Styles)
```html
<!-- Single style -->
<p [ngStyle]="{ 'font-size.px': fontSize }">Text</p>

<!-- Multiple styles -->
<div [ngStyle]="{ 'color': textColor, 'background-color': bgColor }">
  Content
</div>
```

## 🚀 How to Run

```bash
npm install
ng serve
# Open http://localhost:4200
```

## 🎮 What to Try

1. **Toggle buttons** - See *ngIf show/hide elements
2. **View product list** - See *ngFor repeat items
3. **Click status buttons** - See ngClass change classes
4. **Adjust sliders** - See ngStyle change styles in real-time
5. **Click todos** - See ngClass add/remove 'completed' class

## 📝 Key Files

- **`src/app/app.html`** - All 4 directives with examples
- **`src/app/product-list/`** - *ngFor demo with products
- **`src/app/todo-list/`** - ngClass demo with todos
- **`src/app/status-dashboard/`** - ngStyle demo with servers

## 💡 Beginner Tips

### *ngIf Tips
- Use `*ngIf` to show/hide entire elements
- Use `*ngIf="condition; else templateName"` for if-else
- The asterisk (*) is required!

### *ngFor Tips
- Always include `let item of items`
- Use `let i = index` to get the position number
- Use `trackBy` for better performance with large lists

### ngClass Tips
- Use object syntax: `{ 'className': condition }`
- Multiple classes: `{ 'class1': true, 'class2': false }`
- Classes must exist in your CSS file

### ngStyle Tips
- Use object syntax: `{ 'property': value }`
- Add units: `'font-size.px': 16` or `'width.%': 50`
- Camelcase CSS properties: `backgroundColor` not `background-color`

## ⚠️ Common Mistakes

1. **Forgetting the asterisk** - It's `*ngIf` not `ngIf`
2. **Forgetting square brackets** - It's `[ngClass]` not `ngClass`
3. **Wrong syntax** - `*ngFor="let item of items"` not `in items`

## 🎓 Practice Exercises

1. Create a list of students and use *ngFor to display them
2. Add a button that uses *ngIf to show/hide a message
3. Create a traffic light that changes colors with ngClass
4. Build a font-size adjuster using ngStyle and a slider
5. Make a filterable product list (combine *ngFor with *ngIf)

## 📖 Related Training Document

See: **`day-05-directives_Version2.md`** in Angular-Training folder

## 🔗 What's Next?

**Day 6:** @Input & @Output - Learn parent-child component communication!
