import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss',
})
export class LoginFormComponent {
  username = '';
  password = '';
  rememberMe = false;
  submitted = false;
  loginSuccess = false;

  onSubmit(form: any) {
    if (form.valid) {
      this.submitted = true;
      // Simulate login
      if (this.username === 'admin' && this.password === 'password') {
        this.loginSuccess = true;
      } else {
        this.loginSuccess = false;
      }
    }
  }
}
