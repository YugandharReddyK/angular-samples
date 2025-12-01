import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-async-user-list',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="component-container">
      <div class="header">
        <h1>⚡ Async Pipe Demo - Clean Subscriptions</h1>
        <p class="description">
          Using the async pipe eliminates manual subscription management and prevents memory leaks.
        </p>
      </div>

      <div class="code-explanation">
        <h3>💡 Benefits of Async Pipe:</h3>
        <ul>
          <li>✅ Automatically subscribes to Observable</li>
          <li>✅ Automatically unsubscribes when component is destroyed</li>
          <li>✅ Cleaner code - no manual subscription management</li>
          <li>✅ No memory leaks</li>
          <li>✅ Handles loading state automatically</li>
        </ul>
      </div>

      <div class="comparison-box">
        <h3>📝 Code Comparison</h3>
        <div class="comparison-grid">
          <div class="comparison-item">
            <h4>❌ Manual Subscription</h4>
            <pre><code>users: User[] = [];

ngOnInit() {{'{'}
  this.service.getUsers()
    .subscribe(data => {{'{'}
      this.users = data;
    {'}'});
{'}'}</code></pre>
          </div>
          <div class="comparison-item">
            <h4>✅ Async Pipe</h4>
            <pre><code>users$: Observable&lt;User[]&gt;;

ngOnInit() {{'{'}
  this.users$ = 
    this.service.getUsers();
{'}'}

// Template: users$ | async</code></pre>
          </div>
        </div>
      </div>

      @if (users$ | async; as users) {
        <div class="user-grid">
          @for (user of users; track user.id) {
            <div class="user-card">
              <div class="user-header">
                <div class="user-avatar">{{ user.name.charAt(0) }}</div>
                <div class="user-info">
                  <h3>{{ user.name }}</h3>
                  <p class="username">&#64;{{ user.username }}</p>
                </div>
              </div>
              <div class="user-details">
                <div class="detail-item">
                  <span class="icon">📧</span>
                  <span>{{ user.email }}</span>
                </div>
              </div>
              <div class="user-actions">
                <a [routerLink]="['/user-details', user.id]" class="btn-view">
                  View Details →
                </a>
              </div>
            </div>
          }
        </div>
      } @else {
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading users with async pipe...</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .component-container {
      max-width: 1400px;
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
      border-left: 4px solid #10b981;
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

    .comparison-box {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .comparison-box h3 {
      margin: 0 0 1.5rem 0;
      color: #333;
    }

    .comparison-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .comparison-item h4 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .comparison-item pre {
      background: #1e293b;
      color: #e2e8f0;
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
      font-size: 0.85rem;
      line-height: 1.6;
    }

    .comparison-item code {
      font-family: 'Courier New', monospace;
    }

    .user-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .user-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .user-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .user-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid #eee;
    }

    .user-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .user-info h3 {
      margin: 0 0 0.25rem 0;
      color: #333;
      font-size: 1.1rem;
    }

    .username {
      margin: 0;
      color: #999;
      font-size: 0.9rem;
    }

    .user-details {
      margin-bottom: 1rem;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0;
      color: #555;
      font-size: 0.9rem;
    }

    .user-actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-view {
      flex: 1;
      padding: 0.75rem;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      text-align: center;
      font-weight: 500;
      transition: opacity 0.2s;
    }

    .btn-view:hover {
      opacity: 0.9;
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
      border-top: 4px solid #10b981;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class AsyncUserListComponent {
  private dataService = inject(DataService);
  
  // Notice: Observable type with $ convention
  users$: Observable<User[]>;

  constructor() {
    // Simple assignment - no manual subscription!
    this.users$ = this.dataService.getUsers();
  }
}
