# Day 10: Forms — Template-Driven

## Key Concepts

### 1. Template-Driven Forms
- Form logic is written in the template (HTML), not mostly in TypeScript.
- Uses `[(ngModel)]` for two-way binding.
- Simple and easy for small forms.

### 2. FormsModule
- Needed for template-driven forms.
- Import it in your `app.module.ts`:
  ```typescript
  import { FormsModule } from '@angular/forms';

  @NgModule({
    imports: [BrowserModule, FormsModule],
    // ...
  })
  export class AppModule { }
  ```

---

## Sample Code

### Step 1: Basic Form

```html
<!-- app.component.html -->
<form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">
  <label>
    Username:
    <input name="username" [(ngModel)]="username" required>
  </label>
  <br>
  <label>
    Password:
    <input type="password" name="password" [(ngModel)]="password" required>
  </label>
  <br>
  <button type="submit" [disabled]="!loginForm.form.valid">Login</button>
</form>

<p *ngIf="submitted">Welcome, {{ username }}!</p>
```

```typescript
// app.component.ts
export class AppComponent {
  username = '';
  password = '';
  submitted = false;

  onSubmit(form: any) {
    this.submitted = true;
    console.log('Form data:', form.value);
  }
}
```

---

## Step 2: Validation

- Use `required` in the template.
- Show error messages with `ngModel`’s `invalid` and `touched` properties.

```html
<input name="username" [(ngModel)]="username" required #un="ngModel">
<div *ngIf="un.invalid && un.touched">Username is required.</div>
```

---

## Practice Ideas

- Add an email field and validate it (use `type="email"`).
- Add a checkbox for "Remember Me".
- Show a summary of the form data below the form on submit.

---

## Challenge

- Create a "Contact Us" form with name, email, message fields.
- Validate that all fields are required and email is in the proper format.
- Show a thank you message and reset the form after submission.

---

## Questions to Ask

- What happens if you try to submit an invalid form?
- How can you disable the submit button until the form is valid?
- Try adding more validation (e.g., minimum password length).

---