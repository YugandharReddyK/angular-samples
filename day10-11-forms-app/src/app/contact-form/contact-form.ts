import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactFormComponent {
  name = '';
  email = '';
  subject = '';
  message = '';
  submitted = false;

  onSubmit(form: any) {
    if (form.valid) {
      this.submitted = true;
      console.log('Contact Form:', form.value);
    }
  }

  resetForm(form: any) {
    form.reset();
    this.submitted = false;
  }
}
