import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  imports: [FormsModule],
  templateUrl: './template-driven-form.html',
  styleUrl: './template-driven-form.scss',
})
export class TemplateDrivenFormComponent {
  // Model properties bound to form fields
  username = '';
  email = '';
  submitted = false;

  onSubmit(form: any) {
    if (form.valid) {
      this.submitted = true;
      console.log('Form Data:', form.value);
    }
  }

  resetForm(form: any) {
    form.reset();
    this.submitted = false;
    this.username = '';
    this.email = '';
  }
}
