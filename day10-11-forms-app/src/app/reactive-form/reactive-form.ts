import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.scss',
})
export class ReactiveFormComponent {
  submitted = false;

  // Define form structure programmatically
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  onSubmit() {
    if (this.userForm.valid) {
      this.submitted = true;
      console.log('Form Value:', this.userForm.value);
    } else {
      // Mark all fields as touched to show errors
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key)?.markAsTouched();
      });
    }
  }

  resetForm() {
    this.userForm.reset();
    this.submitted = false;
  }

  // Helper method to get form control
  get username() {
    return this.userForm.get('username');
  }

  get email() {
    return this.userForm.get('email');
  }
}
