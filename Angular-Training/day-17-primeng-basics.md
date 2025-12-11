# Day 17: Introduction to PrimeNG

## 📚 What is PrimeNG?

PrimeNG is a rich set of open-source UI components for Angular. It provides 80+ production-ready components that save development time and provide a consistent, professional look.

### Why Use a Component Library?

**Without Component Library:**
- Write hundreds of lines of HTML, CSS, and TypeScript
- Handle accessibility manually
- Test across browsers
- Maintain responsive behavior
- Handle edge cases
- Manage animations and transitions

**With PrimeNG:**
- Use pre-built, tested components
- Built-in accessibility (ARIA)
- Responsive by default
- Consistent design language
- Active maintenance and updates
- Extensive documentation

---

## 🎯 Key Benefits

### 1. **Development Speed**
- 10x faster development
- Focus on business logic, not UI code
- Rapid prototyping

### 2. **Professional Design**
- Consistent look and feel
- Multiple themes available
- Customizable styling

### 3. **Rich Features**
- Advanced data tables with sorting, filtering, pagination
- Complex forms with validation
- Charts and visualizations
- File uploads with progress
- Dialogs, menus, and overlays

### 4. **Production Ready**
- Battle-tested in thousands of applications
- Regular updates and bug fixes
- Comprehensive documentation
- Active community support

### 5. **Accessibility**
- WCAG compliant
- Keyboard navigation
- Screen reader support
- ARIA attributes

---

## 🚀 Installation & Setup

### Step 1: Install PrimeNG
```bash
npm install primeng primeicons
```

### Step 2: Install PrimeNG Theme
```bash
npm install primeflex
```

### Step 3: Import Styles
In `angular.json`:
```json
"styles": [
  "node_modules/primeng/resources/themes/lara-light-blue/theme.css",
  "node_modules/primeng/resources/primeng.min.css",
  "node_modules/primeicons/primeicons.css",
  "node_modules/primeflex/primeflex.css",
  "src/styles.scss"
]
```

### Step 4: Import Components
In your component:
```typescript
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-example',
  imports: [ButtonModule, InputTextModule],
  // ...
})
```

---

## 🎨 Available Themes

PrimeNG comes with multiple free themes:
- **lara-light-blue** (Modern, recommended)
- **lara-dark-blue** (Dark mode)
- **md-light-indigo** (Material Design)
- **bootstrap4-light-blue** (Bootstrap style)
- **saga-blue** (Classic)

Premium themes available at [PrimeNG Store](https://www.primefaces.org/store/)

---

## 📦 Component Categories

### Form Components
- InputText, InputNumber, InputMask
- Dropdown, MultiSelect, AutoComplete
- Calendar, DatePicker
- Checkbox, RadioButton, ToggleButton
- Slider, Rating, Knob
- FileUpload, ColorPicker

### Data Components
- Table (DataTable) - Advanced features
- DataView, DataScroller
- Tree, TreeTable
- PickList, OrderList

### Panel Components
- Panel, Fieldset
- Card, Toolbar
- TabView, Accordion
- Splitter, ScrollPanel

### Overlay Components
- Dialog, Sidebar
- ConfirmDialog, Toast
- Tooltip, OverlayPanel
- Menu, ContextMenu

### Button Components
- Button, SplitButton
- SpeedDial, ToggleButton

### Chart & Media
- Chart (Chart.js integration)
- Image, Galleria, Carousel

### Messages
- Toast, Messages
- ConfirmDialog, ConfirmPopup

### Menu
- Menu, Menubar, TieredMenu
- Breadcrumb, Steps, TabMenu
- PanelMenu, SlideMenu

---

## 💡 Basic Usage Examples

### Button
```html
<p-button label="Click Me" icon="pi pi-check"></p-button>
<p-button label="Secondary" severity="secondary"></p-button>
<p-button label="Success" severity="success" [raised]="true"></p-button>
```

### Input Text
```html
<input pInputText placeholder="Enter text" [(ngModel)]="value" />
```

### Dropdown
```typescript
export class MyComponent {
  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'London', code: 'LDN' },
    { name: 'Tokyo', code: 'TYO' }
  ];
  selectedCity: any;
}
```
```html
<p-dropdown 
  [options]="cities" 
  [(ngModel)]="selectedCity" 
  optionLabel="name"
  placeholder="Select a City">
</p-dropdown>
```

### Table
```typescript
export class MyComponent {
  products = [
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
    { id: 2, name: 'Mouse', price: 29, category: 'Electronics' }
  ];
}
```
```html
<p-table [value]="products">
  <ng-template pTemplate="header">
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Category</th>
    </tr>
  </ng-template>
  <ng-template pTemplate="body" let-product>
    <tr>
      <td>{{ product.name }}</td>
      <td>{{ product.price | currency }}</td>
      <td>{{ product.category }}</td>
    </tr>
  </ng-template>
</p-table>
```

### Dialog
```typescript
export class MyComponent {
  visible: boolean = false;
  
  showDialog() {
    this.visible = true;
  }
}
```
```html
<p-button label="Show" (onClick)="showDialog()"></p-button>

<p-dialog header="Dialog Title" [(visible)]="visible">
  <p>Dialog content goes here...</p>
</p-dialog>
```

---

## 🎯 Best Practices

### 1. Import Only What You Need
```typescript
// ✅ Good - Import specific modules
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

// ❌ Avoid - Importing everything
import * as PrimeNG from 'primeng';
```

### 2. Use Standalone Components
```typescript
@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [ButtonModule, TableModule], // Import directly
})
```

### 3. Consistent Styling
- Use PrimeFlex utility classes for layout
- Stick to one theme throughout the app
- Customize theme variables if needed

### 4. Leverage Built-in Features
- Use table's built-in sorting, filtering, pagination
- Use form validation with PrimeNG validators
- Use toast for global notifications

---

## 🔧 Customization

### Custom Theme Colors
Create `src/custom-theme.scss`:
```scss
// Override PrimeNG variables
$primaryColor: #1976d2;
$primaryDarkColor: #1565c0;

@import 'primeng/resources/themes/lara-light-blue/theme.css';
```

### Custom Component Styling
```scss
::ng-deep {
  .p-button {
    border-radius: 20px !important;
  }
  
  .p-datatable .p-datatable-thead > tr > th {
    background-color: #1976d2;
    color: white;
  }
}
```

---

## 📊 Comparison: Vanilla vs PrimeNG

### Data Table Example

**Without PrimeNG:** ~200 lines of code
- HTML table structure
- CSS for styling, hover effects
- TypeScript for sorting logic
- TypeScript for filtering
- TypeScript for pagination
- Responsive handling
- Accessibility attributes

**With PrimeNG:** ~15 lines of code
```html
<p-table 
  [value]="products" 
  [paginator]="true" 
  [rows]="10"
  [sortMode]="'multiple'"
  [filterDelay]="0">
  <!-- Column definitions -->
</p-table>
```

All features included automatically! ✨

---

## 🎓 Learning Path

### Day 17 Goals:
1. ✅ Understand why component libraries matter
2. ✅ Install and configure PrimeNG
3. ✅ Use 15+ common components
4. ✅ Build forms with PrimeNG
5. ✅ Create advanced data tables
6. ✅ Build a dashboard

### Practice Exercises:
1. Replace existing form with PrimeNG components
2. Convert custom table to p-table
3. Add dialog for create/edit operations
4. Implement toast notifications
5. Create a responsive dashboard layout

---

## 📚 Resources

- **Official Docs**: https://primeng.org/
- **Showcase**: https://primeng.org/showcase
- **GitHub**: https://github.com/primefaces/primeng
- **Forum**: https://forum.primefaces.org/
- **Discord**: PrimeNG Community

---

## 🎯 Key Takeaways

1. **Save Time**: PrimeNG reduces development time significantly
2. **Professional**: Production-ready, tested components
3. **Flexible**: Highly customizable to match your brand
4. **Comprehensive**: 80+ components cover most use cases
5. **Free**: Open-source with active community

**Bottom Line**: Focus on business logic, let PrimeNG handle the UI! 🚀

---

## 🔜 Next Steps

After mastering PrimeNG basics:
- Learn advanced table features (lazy loading, virtual scrolling)
- Explore chart components for data visualization
- Study responsive layouts with PrimeFlex
- Create custom themes
- Integrate with reactive forms
- Use with state management (Day 18+)
