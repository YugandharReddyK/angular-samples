# Day 11: Forms — Reactive Forms

## Key Concepts

### 1. Reactive Forms
- Form logic is defined in the **component (TypeScript)**, not in the template.
- More powerful and scalable than template-driven forms.
- Better for complex validation and dynamic forms.

### 2. ReactiveFormsModule
- Required for reactive forms.
- Import in `app.module.ts`:
  ```typescript
  import { ReactiveFormsModule } from '@angular/forms';

  @NgModule({
    imports: [BrowserModule, ReactiveFormsModule],
    // ...
  })
  export class AppModule { }
  ```

### 3. FormGroup, FormControl, Validators
- **FormControl**: Represents a single input field.
- **FormGroup**: Group of FormControls (represents a form).
- **Validators**: Built-in validation rules.

---

## Sample Code

### Step 1: Create a Reactive Form

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export class AppComponent {
  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form Data:', this.registrationForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
```

### Step 2: Bind Form in Template

```html
<!-- app.component.html -->
<form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
  <label>
    Username:
    <input formControlName="username">
  </label>
  <div *ngIf="registrationForm.get('username')?.invalid && registrationForm.get('username')?.touched">
    <small *ngIf="registrationForm.get('username')?.errors?.['required']">Username is required.</small>
    <small *ngIf="registrationForm.get('username')?.errors?.['minlength']">Min 3 characters.</small>
  </div>
  <br>

  <label>
    Email:
    <input formControlName="email">
  </label>
  <div *ngIf="registrationForm.get('email')?.invalid && registrationForm.get('email')?.touched">
    <small>Valid email is required.</small>
  </div>
  <br>

  <label>
    Password:
    <input type="password" formControlName="password">
  </label>
  <div *ngIf="registrationForm.get('password')?.invalid && registrationForm.get('password')?.touched">
    <small>Password must be at least 6 characters.</small>
  </div>
  <br>

  <button type="submit" [disabled]="registrationForm.invalid">Register</button>
</form>
```

---

## Practice Ideas

- Add a "Confirm Password" field and validate that it matches the password.
- Add a phone number field with a pattern validator.
- Display the entire form value in JSON format below the form.

---

## Challenge

- Create a **profile update form** with:
  - First Name, Last Name (required)
  - Age (required, min: 18, max: 100)
  - Bio (optional, max length: 200)
- Show appropriate error messages for each field.
- Add a "Reset" button to clear the form.

---

## Questions to Ask

- What's the difference between `touched`, `dirty`, and `pristine` form states?
- How can you dynamically add/remove form controls?
- Try creating a custom validator function.

---