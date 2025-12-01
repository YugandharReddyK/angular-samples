import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../services/data.service';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterLink],
  template: `
    <div class="component-container">
      <div class="header">
        <h1>📋 User List - Basic Subscription</h1>
        <p class="description">
          This component demonstrates the basic pattern of subscribing to an HTTP GET request.
        </p>
      </div>

      <div class="code-explanation">
        <h3>💡 What's happening here:</h3>
        <ul>
          <li>✅ Using <code>HttpClient</code> to make GET request</li>
          <li>✅ Subscribing to the Observable in <code>ngOnInit()</code></li>
          <li>✅ Storing data in component property</li>
          <li>✅ Displaying data with <code>*ngFor</code></li>
        </ul>
      </div>

      @if (users.length > 0) {
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
                @if (user.phone) {
                  <div class="detail-item">
                    <span class="icon">📱</span>
                    <span>{{ user.phone }}</span>
                  </div>
                }
                @if (user.website) {
                  <div class="detail-item">
                    <span class="icon">🌐</span>
                    <span>{{ user.website }}</span>
                  </div>
                }
                @if (user.company) {
                  <div class="detail-item">
                    <span class="icon">🏢</span>
                    <span>{{ user.company.name }}</span>
                  </div>
                }
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
        <div class="empty-state">
          <span class="empty-icon">📭</span>
          <p>No users loaded yet...</p>
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
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

    .detail-item .icon {
      font-size: 1rem;
    }

    .user-actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-view {
      flex: 1;
      padding: 0.75rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: #999;
    }

    .empty-icon {
      font-size: 4rem;
      display: block;
      margin-bottom: 1rem;
    }
  `]
})
export class UserListComponent implements OnInit {
  private dataService = inject(DataService);
  users: User[] = [];

  ngOnInit() {
    // Basic subscription pattern
    this.dataService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log('Users loaded:', this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }
}
