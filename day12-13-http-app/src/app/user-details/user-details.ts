import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="component-container">
      <div class="header">
        <h1>👤 User Details - Parameterized Request</h1>
        <p class="description">
          Demonstrates fetching a single resource by ID using route parameters or manual input.
        </p>
      </div>

      <div class="code-explanation">
        <h3>💡 What's happening here:</h3>
        <ul>
          <li>✅ Using route parameters to get user ID</li>
          <li>✅ Making parameterized GET request</li>
          <li>✅ Handling single resource response</li>
          <li>✅ Manual ID input option</li>
        </ul>
      </div>

      <div class="id-selector">
        <label for="userId">Select User ID:</label>
        <input 
          type="number" 
          id="userId" 
          [(ngModel)]="selectedUserId" 
          min="1" 
          max="10"
          (change)="loadUser()"
          placeholder="Enter user ID (1-10)"
        />
        <button (click)="loadUser()" class="btn-load">Load User</button>
      </div>

      @if (loading) {
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading user details...</p>
        </div>
      }

      @if (error) {
        <div class="error-state">
          <span class="error-icon">❌</span>
          <p>{{ error }}</p>
          <button (click)="loadUser()" class="btn-retry">Try Again</button>
        </div>
      }

      @if (user && !loading && !error) {
        <div class="user-detail-card">
          <div class="user-header-section">
            <div class="user-avatar-large">{{ user.name.charAt(0) }}</div>
            <div>
              <h2>{{ user.name }}</h2>
              <p class="username-large">&#64;{{ user.username }}</p>
            </div>
          </div>

          <div class="detail-sections">
            <div class="detail-section">
              <h3>📧 Contact Information</h3>
              <div class="detail-grid">
                <div class="detail-row">
                  <span class="label">Email:</span>
                  <span class="value">{{ user.email }}</span>
                </div>
                @if (user.phone) {
                  <div class="detail-row">
                    <span class="label">Phone:</span>
                    <span class="value">{{ user.phone }}</span>
                  </div>
                }
                @if (user.website) {
                  <div class="detail-row">
                    <span class="label">Website:</span>
                    <span class="value">{{ user.website }}</span>
                  </div>
                }
              </div>
            </div>

            @if (user.address) {
              <div class="detail-section">
                <h3>🏠 Address</h3>
                <div class="detail-grid">
                  <div class="detail-row">
                    <span class="label">Street:</span>
                    <span class="value">{{ user.address.street }}, {{ user.address.suite }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">City:</span>
                    <span class="value">{{ user.address.city }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Zipcode:</span>
                    <span class="value">{{ user.address.zipcode }}</span>
                  </div>
                </div>
              </div>
            }

            @if (user.company) {
              <div class="detail-section">
                <h3>🏢 Company</h3>
                <div class="detail-grid">
                  <div class="detail-row">
                    <span class="label">Name:</span>
                    <span class="value">{{ user.company.name }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Catch Phrase:</span>
                    <span class="value">{{ user.company.catchPhrase }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Business:</span>
                    <span class="value">{{ user.company.bs }}</span>
                  </div>
                </div>
              </div>
            }
          </div>

          <div class="action-buttons">
            <a routerLink="/user-list" class="btn-back">← Back to List</a>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .component-container {
      max-width: 900px;
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

    .id-selector {
      display: flex;
      gap: 1rem;
      align-items: center;
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .id-selector label {
      font-weight: 600;
      color: #333;
    }

    .id-selector input {
      flex: 1;
      padding: 0.75rem;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
    }

    .id-selector input:focus {
      outline: none;
      border-color: #667eea;
    }

    .btn-load {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    .btn-load:hover {
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
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-state {
      text-align: center;
      padding: 3rem 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #ef4444;
    }

    .error-icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 1rem;
    }

    .error-state p {
      color: #ef4444;
      margin-bottom: 1rem;
      font-weight: 500;
    }

    .btn-retry {
      padding: 0.75rem 1.5rem;
      background: #ef4444;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    .user-detail-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .user-header-section {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding-bottom: 2rem;
      border-bottom: 2px solid #f0f0f0;
      margin-bottom: 2rem;
    }

    .user-avatar-large {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: 700;
    }

    .user-header-section h2 {
      margin: 0 0 0.5rem 0;
      color: #333;
      font-size: 2rem;
    }

    .username-large {
      margin: 0;
      color: #999;
      font-size: 1.1rem;
    }

    .detail-sections {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .detail-section h3 {
      margin: 0 0 1rem 0;
      color: #333;
      font-size: 1.2rem;
    }

    .detail-grid {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .detail-row {
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: 1rem;
      padding: 0.75rem;
      background: #f8f9fa;
      border-radius: 6px;
    }

    .label {
      font-weight: 600;
      color: #555;
    }

    .value {
      color: #333;
    }

    .action-buttons {
      margin-top: 2rem;
      padding-top: 2rem;
      border-top: 2px solid #f0f0f0;
    }

    .btn-back {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      transition: opacity 0.2s;
    }

    .btn-back:hover {
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .id-selector {
        flex-direction: column;
        align-items: stretch;
      }

      .detail-row {
        grid-template-columns: 1fr;
      }

      .user-header-section {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class UserDetailsComponent implements OnInit {
  private dataService = inject(DataService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  user: User | null = null;
  selectedUserId: number = 1;
  loading = false;
  error = '';

  ngOnInit() {
    // Check if we have a route parameter
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.selectedUserId = +params['id'];
        this.loadUser();
      }
    });
  }

  loadUser() {
    if (!this.selectedUserId || this.selectedUserId < 1 || this.selectedUserId > 10) {
      this.error = 'Please enter a valid user ID (1-10)';
      return;
    }

    this.loading = true;
    this.error = '';
    this.user = null;

    this.dataService.getUserById(this.selectedUserId).subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
        console.log('User loaded:', this.user);
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
        console.error('Error fetching user:', err);
      }
    });
  }
}
