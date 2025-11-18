import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, NgIf],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserFormComponent {
  name = '';
  email = '';
  age: number | null = null;
  submittedData: any = null;
  
  submitForm(): void {
    this.submittedData = {
      name: this.name,
      email: this.email,
      age: this.age
    };
  }
  
  clearForm(): void {
    this.name = '';
    this.email = '';
    this.age = null;
    this.submittedData = null;
  }
}
