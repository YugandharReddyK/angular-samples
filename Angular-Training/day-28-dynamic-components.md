# Day 28: Dynamic Components & ViewContainerRef

## 📚 Key Concepts

### 1. What are Dynamic Components?
**Dynamic components** are components that are created and rendered programmatically at runtime, rather than being declared in templates.

### Use Cases:
- **Modals/Dialogs** - Open dialogs dynamically
- **Toast Notifications** - Show messages on the fly
- **Dynamic Forms** - Build forms from configuration
- **Tab Content** - Load tab content dynamically
- **Dashboard Widgets** - Add/remove widgets

### 2. ViewContainerRef
**ViewContainerRef** represents a container where one or more views can be attached. It's the key to creating components dynamically.

---

## 🚀 Basic Dynamic Component Creation

### Step 1: Create Components to Load Dynamically

```typescript
// alert.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert" [class]="type">
      <strong>{{ title }}</strong>
      <p>{{ message }}</p>
    </div>
  `,
  styles: [`
    .alert {
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }
    .success { background: #d4edda; color: #155724; }
    .error { background: #f8d7da; color: #721c24; }
    .warning { background: #fff3cd; color: #856404; }
    .info { background: #d1ecf1; color: #0c5460; }
  `]
})
export class AlertComponent {
  @Input() title = '';
  @Input() message = '';
  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'info';
}
```

### Step 2: Create Container with ViewContainerRef

```typescript
// dynamic-container.component.ts
import { 
  Component, 
  ViewChild, 
  ViewContainerRef, 
  ComponentRef,
  Type
} from '@angular/core';
import { AlertComponent } from './alert.component';

@Component({
  selector: 'app-dynamic-container',
  standalone: true,
  template: `
    <div class="container">
      <h2>Dynamic Components</h2>
      
      <div class="buttons">
        <button (click)="showSuccess()">Show Success</button>
        <button (click)="showError()">Show Error</button>
        <button (click)="showWarning()">Show Warning</button>
        <button (click)="clearAll()">Clear All</button>
      </div>
      
      <!-- Container where components will be inserted -->
      <div #dynamicContainer></div>
    </div>
  `,
  styles: [`
    .container { padding: 2rem; }
    .buttons { margin-bottom: 1rem; }
    button { margin-right: 0.5rem; padding: 0.5rem 1rem; }
  `]
})
export class DynamicContainerComponent {
  @ViewChild('dynamicContainer', { read: ViewContainerRef })
  container!: ViewContainerRef;

  private componentRefs: ComponentRef<AlertComponent>[] = [];

  showSuccess(): void {
    this.createAlert('Success!', 'Operation completed successfully.', 'success');
  }

  showError(): void {
    this.createAlert('Error!', 'Something went wrong.', 'error');
  }

  showWarning(): void {
    this.createAlert('Warning!', 'Please check your input.', 'warning');
  }

  private createAlert(
    title: string, 
    message: string, 
    type: 'success' | 'error' | 'warning' | 'info'
  ): void {
    // Create component
    const componentRef = this.container.createComponent(AlertComponent);
    
    // Set inputs
    componentRef.instance.title = title;
    componentRef.instance.message = message;
    componentRef.instance.type = type;
    
    // Store reference
    this.componentRefs.push(componentRef);
  }

  clearAll(): void {
    // Destroy all components
    this.container.clear();
    this.componentRefs = [];
  }

  ngOnDestroy(): void {
    // Clean up on component destroy
    this.clearAll();
  }
}
```

---

## 🎭 Dynamic Modal System

```typescript
// modal.service.ts
import { 
  Injectable, 
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  ComponentRef
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalRefs: ComponentRef<any>[] = [];

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  open<T>(component: any, inputs?: Partial<T>): ComponentRef<T> {
    // Create component
    const componentRef = createComponent(component, {
      environmentInjector: this.injector
    });

    // Set inputs if provided
    if (inputs) {
      Object.assign(componentRef.instance, inputs);
    }

    // Attach to application
    this.appRef.attachView(componentRef.hostView);

    // Add to DOM
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Store reference
    this.modalRefs.push(componentRef);

    return componentRef;
  }

  close(componentRef: ComponentRef<any>): void {
    // Remove from DOM
    const index = this.modalRefs.indexOf(componentRef);
    if (index > -1) {
      this.modalRefs.splice(index, 1);
    }

    // Detach and destroy
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }

  closeAll(): void {
    this.modalRefs.forEach(ref => {
      this.appRef.detachView(ref.hostView);
      ref.destroy();
    });
    this.modalRefs = [];
  }
}
```

```typescript
// confirm-modal.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" (click)="onCancel()">
      <div class="modal" (click)="$event.stopPropagation()">
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
        
        <div class="buttons">
          <button class="cancel" (click)="onCancel()">Cancel</button>
          <button class="confirm" (click)="onConfirm()">Confirm</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      min-width: 400px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .buttons {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
      margin-top: 1.5rem;
    }
    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .cancel { background: #6c757d; color: white; }
    .confirm { background: #007bff; color: white; }
  `]
})
export class ConfirmModalComponent {
  title = 'Confirm';
  message = 'Are you sure?';

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmed.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
```

### Using the Modal Service

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { ModalService } from './modal.service';
import { ConfirmModalComponent } from './confirm-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="app">
      <h1>Dynamic Modal Example</h1>
      <button (click)="openConfirmModal()">Delete Item</button>
    </div>
  `
})
export class AppComponent {
  constructor(private modalService: ModalService) {}

  openConfirmModal(): void {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item? This action cannot be undone.'
    });

    // Subscribe to events
    modalRef.instance.confirmed.subscribe(() => {
      console.log('Item deleted!');
      this.modalService.close(modalRef);
    });

    modalRef.instance.cancelled.subscribe(() => {
      console.log('Deletion cancelled');
      this.modalService.close(modalRef);
    });
  }
}
```

---

## 📝 Dynamic Form Builder

```typescript
// dynamic-form.component.ts
import { Component, Input, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface FieldConfig {
  type: 'text' | 'email' | 'number' | 'select' | 'checkbox';
  name: string;
  label: string;
  value?: any;
  options?: { label: string; value: any }[];
  required?: boolean;
}

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div *ngFor="let field of fields" class="field">
        <label>{{ field.label }}</label>
        
        @switch (field.type) {
          @case ('text') {
            <input type="text" [formControlName]="field.name">
          }
          @case ('email') {
            <input type="email" [formControlName]="field.name">
          }
          @case ('number') {
            <input type="number" [formControlName]="field.name">
          }
          @case ('select') {
            <select [formControlName]="field.name">
              <option *ngFor="let option of field.options" [value]="option.value">
                {{ option.label }}
              </option>
            </select>
          }
          @case ('checkbox') {
            <input type="checkbox" [formControlName]="field.name">
          }
        }
        
        @if (form.get(field.name)?.invalid && form.get(field.name)?.touched) {
          <small class="error">This field is required</small>
        }
      </div>
      
      <button type="submit" [disabled]="form.invalid">Submit</button>
    </form>
  `,
  styles: [`
    .field {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 0.25rem;
    }
    input, select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .error {
      color: red;
      font-size: 0.875rem;
    }
    button {
      padding: 0.75rem 1.5rem;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class DynamicFormComponent implements OnInit {
  @Input() fields: FieldConfig[] = [];
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    const group: any = {};
    
    this.fields.forEach(field => {
      const validators = field.required ? [Validators.required] : [];
      group[field.name] = [field.value || '', validators];
    });

    this.form = this.fb.group(group);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }
}
```

### Using Dynamic Form

```typescript
// user-form.component.ts
import { Component } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <div class="container">
      <h2>User Registration</h2>
      <app-dynamic-form [fields]="formFields"></app-dynamic-form>
    </div>
  `
})
export class UserFormComponent {
  formFields = [
    {
      type: 'text' as const,
      name: 'firstName',
      label: 'First Name',
      required: true
    },
    {
      type: 'text' as const,
      name: 'lastName',
      label: 'Last Name',
      required: true
    },
    {
      type: 'email' as const,
      name: 'email',
      label: 'Email',
      required: true
    },
    {
      type: 'select' as const,
      name: 'country',
      label: 'Country',
      required: true,
      options: [
        { label: 'USA', value: 'us' },
        { label: 'Canada', value: 'ca' },
        { label: 'UK', value: 'uk' }
      ]
    },
    {
      type: 'checkbox' as const,
      name: 'subscribe',
      label: 'Subscribe to newsletter'
    }
  ];
}
```

---

## 🎯 Practice Ideas

### Practice 1: Toast Notification System
Create a service to show toast notifications:
- Success, error, warning, info types
- Auto-dismiss after timeout
- Stack multiple toasts
- Close button

### Practice 2: Dynamic Tab System
Build tab component that:
- Loads tab content dynamically
- Supports lazy loading
- Can add/remove tabs at runtime
- Preserves tab state

### Practice 3: Widget Dashboard
Create dashboard where users can:
- Add/remove widgets
- Drag and drop widgets (bonus)
- Each widget is a dynamic component
- Save layout to localStorage

### Practice 4: Dynamic Wizard
Build multi-step wizard:
- Steps defined by configuration
- Each step is a dynamic component
- Navigation between steps
- Form validation

---

## 💡 Best Practices

1. **Clean up component references**
   ```typescript
   ngOnDestroy(): void {
     this.componentRefs.forEach(ref => ref.destroy());
   }
   ```

2. **Use ComponentRef for control**
   ```typescript
   const componentRef = this.container.createComponent(MyComponent);
   // Access instance
   componentRef.instance.someProperty = value;
   // Destroy when done
   componentRef.destroy();
   ```

3. **Inject services into dynamic components**
   ```typescript
   const componentRef = createComponent(MyComponent, {
     environmentInjector: this.injector
   });
   ```

4. **Handle outputs properly**
   ```typescript
   componentRef.instance.someEvent.subscribe(data => {
     // Handle event
   });
   ```

---

## ✅ Checklist

- [ ] Understand ViewContainerRef
- [ ] Create components dynamically
- [ ] Pass inputs to dynamic components
- [ ] Subscribe to outputs from dynamic components
- [ ] Implement modal service
- [ ] Build toast notification system
- [ ] Create dynamic form builder
- [ ] Clean up component references
- [ ] Use ApplicationRef for app-level components

---

## 📚 Additional Resources

- [Dynamic Component Loader](https://angular.dev/guide/dynamic-component-loader)
- [ViewContainerRef API](https://angular.dev/api/core/ViewContainerRef)
