import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-loading-demo',
  imports: [CommonModule],
  template: `
    <div class="component-container">
      <div class="header">
        <h1>⏳ Loading States - User Experience</h1>
        <p class="description">
          Always provide visual feedback during async operations to improve user experience.
        </p>
      </div>

      <div class="code-explanation">
        <h3>💡 Loading State Best Practices:</h3>
        <ul>
          <li>✅ Show loading indicator immediately when request starts</li>
          <li>✅ Hide loading indicator when data arrives or error occurs</li>
          <li>✅ Use skeleton loaders for better perceived performance</li>
          <li>✅ Disable actions during loading to prevent duplicate requests</li>
        </ul>
      </div>

      <div class="controls">
        <button (click)="loadUsers()" [disabled]="loading" class="btn-load">
          @if (loading) {
            <span class="spinner-small"></span>
            Loading...
          } @else {
            🔄 Reload Users (2s delay)
          }
        </button>
      </div>

      @if (loading) {
        <div class="skeleton-container">
          <h3>Skeleton Loader:</h3>
          <div class="skeleton-grid">
            @for (item of [1,2,3,4,5,6]; track item) {
              <div class="skeleton-card">
                <div class="skeleton-header">
                  <div class="skeleton-avatar"></div>
                  <div class="skeleton-text-group">
                    <div class="skeleton-text skeleton-text-lg"></div>
                    <div class="skeleton-text skeleton-text-sm"></div>
                  </div>
                </div>
                <div class="skeleton-body">
                  <div class="skeleton-text"></div>
                  <div class="skeleton-text"></div>
                  <div class="skeleton-text skeleton-text-short"></div>
                </div>
              </div>
            }
          </div>
        </div>
      }

      @if (!loading && users.length > 0) {
        <div class="success-banner">
          <span>✅</span>
          <span>Loaded {{ users.length }} users successfully!</span>
        </div>

        <div class="user-grid">
          @for (user of users; track user.id) {
            <div class="user-card fade-in">
              <div class="user-header">
                <div class="user-avatar">{{ user.name.charAt(0) }}</div>
                <div>
                  <h3>{{ user.name }}</h3>
                  <p class="username">&#64;{{ user.username }}</p>
                </div>
              </div>
              <div class="user-email">{{ user.email }}</div>
            </div>
          }
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
      border-left: 4px solid #f59e0b;
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

    .controls {
      margin-bottom: 2rem;
    }

    .btn-load {
      padding: 1rem 2rem;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-load:hover:not(:disabled) {
      opacity: 0.9;
      transform: translateY(-2px);
    }

    .btn-load:disabled {
      opacity: 0.6;
      cursor: not-allowed;
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

    .skeleton-container {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .skeleton-container h3 {
      margin: 0 0 1.5rem 0;
      color: #333;
    }

    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .skeleton-card {
      background: #f9fafb;
      border-radius: 12px;
      padding: 1.5rem;
    }

    .skeleton-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .skeleton-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    .skeleton-text-group {
      flex: 1;
    }

    .skeleton-text {
      height: 12px;
      background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }

    .skeleton-text-lg {
      height: 16px;
      width: 70%;
    }

    .skeleton-text-sm {
      width: 50%;
    }

    .skeleton-text-short {
      width: 40%;
    }

    .skeleton-body {
      padding-top: 1rem;
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    .success-banner {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: #d1fae5;
      color: #065f46;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      font-weight: 500;
      animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
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
    }

    .fade-in {
      animation: fadeIn 0.5s ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .user-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .user-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .user-header h3 {
      margin: 0 0 0.25rem 0;
      color: #333;
      font-size: 1.1rem;
    }

    .username {
      margin: 0;
      color: #999;
      font-size: 0.9rem;
    }

    .user-email {
      color: #666;
      font-size: 0.9rem;
    }
  `]
})
export class LoadingDemoComponent implements OnInit {
  private dataService = inject(DataService);
  
  users: User[] = [];
  loading = false;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.users = [];

    // Using the simulated delay method to demonstrate loading state
    this.dataService.getUsersWithDelay(2000).subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    });
  }
}
