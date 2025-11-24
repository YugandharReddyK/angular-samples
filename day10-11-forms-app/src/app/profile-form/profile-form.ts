import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-form',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.scss',
})
export class ProfileFormComponent {
  submitted = false;

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(100)]),
    bio: new FormControl('', [Validators.maxLength(200)])
  });

  onSubmit() {
    if (this.profileForm.valid) {
      this.submitted = true;
      console.log('Profile:', this.profileForm.value);
    } else {
      Object.keys(this.profileForm.controls).forEach(key => {
        this.profileForm.get(key)?.markAsTouched();
      });
    }
  }

  resetForm() {
    this.profileForm.reset();
    this.submitted = false;
  }

  get firstName() { return this.profileForm.get('firstName'); }
  get lastName() { return this.profileForm.get('lastName'); }
  get age() { return this.profileForm.get('age'); }
  get bio() { return this.profileForm.get('bio'); }
}
