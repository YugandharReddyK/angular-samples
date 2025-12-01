import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-create-user',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="component-container">
      <div class="header">
        <h1>➕ Create User - POST Request</h1>
        <p class="description">
          Demonstrates sending data to an API using POST method. Note: This is a fake API, so the user won't actually be created on the server.
        </p>
      </div>

      <div class="code-explanation">
        <h3>💡 What's happening here:</h3>
        <ul>
          <li>✅ Using <code>HttpClient.post()</code> to send data</li>
          <li>✅ Sending JSON payload in request body</li>
          <li>✅ Handling success response</li>
          <li>✅ Form data binding with <code>ngModel</code></li>
        </ul>
      </div>

      <div class="form-container">
        <form (ngSubmit)="createUser()" #userForm="ngForm">
          <div class="form-group">
            <label for="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              [(ngModel)]="newUser.name"
              required
              placeholder="John Doe"
            />
          </div>

          <div class="form-group">
            <label for="username">Username *</label>
            <input
              type="text"
              id="username"
              name="username"
              [(ngModel)]="newUser.username"
              required
              placeholder="johndoe"
            />
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="newUser.email"
              required
              placeholder="john@example.com"
            />
          </div>

          <div class="form-group">
            <label for="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              [(ngModel)]="newUser.phone"
              placeholder="+1-234-567-8900"
            />
          </div>

          <div class="form-group">
            <label for="website">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              [(ngModel)]="newUser.website"
              placeholder="https://example.com"
            />
          </div>

          <div class="form-actions">
            <button 
              type="submit" 
              class="btn-submit"
              [disabled]="!userForm.valid || loading"
            >
              @if (loading) {
                <span class="spinner-small"></span>
                Creating...
              } @else {
                Create User
              }
            </button>
            <button 
              type="button" 
              class="btn-reset"
              (click)="resetForm()"
              [disabled]="loading"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      @if (successMessage) {
        <div class="success-message">
          <span class="success-icon">✅</span>
          <div>
            <h3>User Created Successfully!</h3>
            <p>{{ successMessage }}</p>
          </div>
        </div>
      }

      @if (errorMessage) {
        <div class="error-message">
          <span class="error-icon">❌</span>
          <div>
            <h3>Error Creating User</h3>
            <p>{{ errorMessage }}</p>
          </div>
        </div>
      }

      @if (createdUser) {
        <div class="response-card">
          <h3>📋 Server Response</h3>
          <pre>{{ createdUser | json }}</pre>
        </div>
      }
    </div>
  `,
  styles: [`
    .component-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .header {
      margin-bottom: 2rem;
    }

    .header h1 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 2rem;
    }

    .description {
      color: #666;
      margin: 0;
      font-size: 1.1rem;
    }

    .code-explanation {
      background: #f8f9fa;
      border-left: 4px solid #667eea;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }

    .code-explanation h3 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .code-explanation ul {
      margin: 0;
      padding-left: 1.5rem;
    }

    .code-explanation li {
      color: #555;
      margin-bottom: 0.5rem;
    }

    .code-explanation code {
      background: white;
      padding: 2px 6px;
      border-radius: 3px;
      color: #667eea;
      font-weight: 600;
    }

    .form-container {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #333;
    }

    .form-group input {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    .form-group input:focus {
      outline: none;
      border-color: #667eea;
    }

    .form-group input.ng-invalid.ng-touched {
      border-color: #ef4444;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .btn-submit, .btn-reset {
      flex: 1;
      padding: 0.875rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .btn-submit {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-submit:hover:not(:disabled) {
      opacity: 0.9;
      transform: translateY(-2px);
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-reset {
      background: #f0f0f0;
      color: #333;
    }

    .btn-reset:hover:not(:disabled) {
      background: #e0e0e0;
    }

    .spinner-small {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .success-message {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      background: #d1fae5;
      border-left: 4px solid #10b981;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }

    .success-icon {
      font-size: 2rem;
    }

    .success-message h3 {
      margin: 0 0 0.5rem 0;
      color: #065f46;
    }

    .success-message p {
      margin: 0;
      color: #047857;
    }

    .error-message {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      background: #fee2e2;
      border-left: 4px solid #ef4444;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }

    .error-icon {
      font-size: 2rem;
    }

    .error-message h3 {
      margin: 0 0 0.5rem 0;
      color: #991b1b;
    }

    .error-message p {
      margin: 0;
      color: #dc2626;
    }

    .response-card {
      background: #1e293b;
      color: #e2e8f0;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .response-card h3 {
      margin: 0 0 1rem 0;
      color: #f1f5f9;
    }

    .response-card pre {
      margin: 0;
      white-space: pre-wrap;
      word-wrap: break-word;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.6;
    }
  `]
})
export class CreateUserComponent {
  private dataService = inject(DataService);

  newUser: Partial<User> = {
    name: '',
    username: '',
    email: '',
    phone: '',
    website: ''
  };

  loading = false;
  successMessage = '';
  errorMessage = '';
  createdUser: User | null = null;

  createUser() {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.createdUser = null;

    this.dataService.createUser(this.newUser).subscribe({
      next: (response) => {
        this.createdUser = response;
        this.successMessage = `User "${response.name}" created with ID: ${response.id}`;
        this.loading = false;
        console.log('User created:', response);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          this.resetForm();
        }, 3000);
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.loading = false;
        console.error('Error creating user:', error);
      }
    });
  }

  resetForm() {
    this.newUser = {
      name: '',
      username: '',
      email: '',
      phone: '',
      website: ''
    };
    this.successMessage = '';
    this.errorMessage = '';
    this.createdUser = null;
  }
}
