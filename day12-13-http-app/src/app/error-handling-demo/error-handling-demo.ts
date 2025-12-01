import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-error-handling-demo',
  imports: [CommonModule],
  template: `
    <div class="component-container">
      <div class="header">
        <h1>❌ Error Handling - Graceful Failures</h1>
        <p class="description">
          Demonstrate comprehensive error handling with user-friendly messages and retry functionality.
        </p>
      </div>

      <div class="code-explanation">
        <h3>💡 Error Handling Best Practices:</h3>
        <ul>
          <li>✅ Always provide error handling in subscriptions</li>
          <li>✅ Display user-friendly error messages</li>
          <li>✅ Offer retry functionality</li>
          <li>✅ Log errors for debugging</li>
          <li>✅ Handle different error types (network, server, etc.)</li>
        </ul>
      </div>

      <div class="demo-controls">
        <button (click)="loadValidData()" [disabled]="loading" class="btn-success">
          ✅ Load Valid Data
        </button>
        <button (click)="loadInvalidData()" [disabled]="loading" class="btn-error">
          ❌ Trigger Error
        </button>
      </div>

      @if (loading) {
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading data...</p>
        </div>
      }

      @if (error && !loading) {
        <div class="error-card">
          <div class="error-header">
            <span class="error-icon">⚠️</span>
            <h3>Something Went Wrong</h3>
          </div>
          <div class="error-body">
            <p class="error-message">{{ error }}</p>
            <div class="error-details">
              <strong>What you can do:</strong>
              <ul>
                <li>Check your internet connection</li>
                <li>Try again in a few moments</li>
                <li>Contact support if the problem persists</li>
              </ul>
            </div>
          </div>
          <div class="error-actions">
            <button (click)="retry()" class="btn-retry">
              🔄 Try Again
            </button>
            <button (click)="clearError()" class="btn-dismiss">
              Dismiss
            </button>
          </div>
        </div>
      }

      @if (users.length > 0 && !loading && !error) {
        <div class="success-card">
          <div class="success-header">
            <span class="success-icon">✅</span>
            <h3>Data Loaded Successfully</h3>
          </div>
          <p>Retrieved {{ users.length }} users from the API</p>
          
          <div class="user-grid">
            @for (user of users; track user.id) {
              <div class="user-card">
                <div class="user-avatar">{{ user.name.charAt(0) }}</div>
                <div class="user-info">
                  <h4>{{ user.name }}</h4>
                  <p>{{ user.email }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      }

      <div class="code-sample">
        <h3>📝 Error Handling Code Pattern</h3>
        <pre><code>this.service.getData().subscribe({{'{'}
  next: (data) => {{'{'}
    this.data = data;
    this.loading = false;
  {'}'},
  error: (err) => {{'{'}
    this.error = err.message;
    this.loading = false;
    console.error('Error:', err);
  {'}'}
{'}'});</code></pre>
      </div>
    </div>
  `,
  styles: [`
    .component-container {
      max-width: 1200px;
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
      border-left: 4px solid #ef4444;
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

    .demo-controls {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .demo-controls button {
      flex: 1;
      min-width: 200px;
      padding: 1rem 2rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .demo-controls button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-success {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }

    .btn-success:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
    }

    .btn-error {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
    }

    .btn-error:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
    }

    .loading-state {
      text-align: center;
      padding: 4rem 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .spinner {
      width: 50px;
      height: 50px;
      margin: 0 auto 1rem;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2);
      border-left: 6px solid #ef4444;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .error-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background: #fef2f2;
      border-bottom: 1px solid #fee2e2;
    }

    .error-icon {
      font-size: 2rem;
    }

    .error-header h3 {
      margin: 0;
      color: #991b1b;
      font-size: 1.3rem;
    }

    .error-body {
      padding: 1.5rem;
    }

    .error-message {
      color: #dc2626;
      font-weight: 500;
      margin: 0 0 1.5rem 0;
      font-size: 1.05rem;
    }

    .error-details {
      background: #fef2f2;
      padding: 1rem;
      border-radius: 8px;
      color: #7f1d1d;
    }

    .error-details strong {
      display: block;
      margin-bottom: 0.5rem;
    }

    .error-details ul {
      margin: 0.5rem 0 0 0;
      padding-left: 1.5rem;
    }

    .error-details li {
      margin-bottom: 0.5rem;
    }

    .error-actions {
      display: flex;
      gap: 1rem;
      padding: 1.5rem;
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
    }

    .btn-retry, .btn-dismiss {
      flex: 1;
      padding: 0.75rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-retry {
      background: #ef4444;
      color: white;
    }

    .btn-retry:hover {
      background: #dc2626;
    }

    .btn-dismiss {
      background: white;
      color: #666;
      border: 2px solid #e5e7eb;
    }

    .btn-dismiss:hover {
      background: #f9fafb;
    }

    .success-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-left: 6px solid #10b981;
    }

    .success-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .success-icon {
      font-size: 2rem;
    }

    .success-header h3 {
      margin: 0;
      color: #065f46;
    }

    .success-card > p {
      color: #666;
      margin-bottom: 1.5rem;
    }

    .user-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }

    .user-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f9fafb;
      border-radius: 8px;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }

    .user-info h4 {
      margin: 0 0 0.25rem 0;
      color: #333;
      font-size: 0.95rem;
    }

    .user-info p {
      margin: 0;
      color: #666;
      font-size: 0.85rem;
    }

    .code-sample {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-top: 2rem;
    }

    .code-sample h3 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .code-sample pre {
      background: #1e293b;
      color: #e2e8f0;
      padding: 1.5rem;
      border-radius: 8px;
      overflow-x: auto;
      margin: 0;
    }

    .code-sample code {
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.6;
    }
  `]
})
export class ErrorHandlingDemoComponent {
  private dataService = inject(DataService);
  
  users: User[] = [];
  loading = false;
  error = '';
  lastAction: 'valid' | 'invalid' = 'valid';

  loadValidData() {
    this.lastAction = 'valid';
    this.loading = true;
    this.error = '';
    this.users = [];

    this.dataService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
        console.error('Error loading users:', err);
      }
    });
  }

  loadInvalidData() {
    this.lastAction = 'invalid';
    this.loading = true;
    this.error = '';
    this.users = [];

    this.dataService.getUsersWithError().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
        console.error('Error loading users:', err);
      }
    });
  }

  retry() {
    if (this.lastAction === 'valid') {
      this.loadValidData();
    } else {
      this.loadInvalidData();
    }
  }

  clearError() {
    this.error = '';
  }
}
