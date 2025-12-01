import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Post } from '../models/post.interface';

@Component({
  selector: 'app-post-viewer',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="component-container">
      <div class="header">
        <h1>🔍 Post Viewer - Complete Example</h1>
        <p class="description">
          A comprehensive example combining loading states, error handling, and client-side filtering.
        </p>
      </div>

      <div class="code-explanation">
        <h3>💡 This example demonstrates:</h3>
        <ul>
          <li>✅ Loading state with skeleton loader</li>
          <li>✅ Error handling with retry</li>
          <li>✅ Client-side search/filtering</li>
          <li>✅ Real-time filter updates</li>
          <li>✅ Empty state handling</li>
        </ul>
      </div>

      <div class="controls-bar">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (ngModelChange)="filterPosts()"
            placeholder="Search posts by title..."
            [disabled]="loading"
          />
          @if (searchTerm) {
            <button class="clear-btn" (click)="clearSearch()">✕</button>
          }
        </div>
        <button (click)="reload()" [disabled]="loading" class="btn-reload">
          🔄 Reload
        </button>
      </div>

      <div class="stats-bar">
        @if (!loading && !error) {
          <div class="stat">
            <span class="stat-label">Total Posts:</span>
            <span class="stat-value">{{ allPosts.length }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Showing:</span>
            <span class="stat-value">{{ filteredPosts.length }}</span>
          </div>
          @if (searchTerm) {
            <div class="stat highlight">
              <span class="stat-label">Filtered by:</span>
              <span class="stat-value">"{{ searchTerm }}"</span>
            </div>
          }
        }
      </div>

      @if (loading) {
        <div class="skeleton-grid">
          @for (item of [1,2,3,4,5,6,7,8]; track item) {
            <div class="skeleton-card">
              <div class="skeleton-header">
                <div class="skeleton-text skeleton-text-sm"></div>
                <div class="skeleton-text skeleton-text-xs"></div>
              </div>
              <div class="skeleton-body">
                <div class="skeleton-text skeleton-text-lg"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text"></div>
                <div class="skeleton-text skeleton-text-short"></div>
              </div>
            </div>
          }
        </div>
      }

      @if (error && !loading) {
        <div class="error-state">
          <span class="error-icon">❌</span>
          <h3>Failed to Load Posts</h3>
          <p>{{ error }}</p>
          <button (click)="reload()" class="btn-retry">Try Again</button>
        </div>
      }

      @if (!loading && !error && filteredPosts.length === 0 && searchTerm) {
        <div class="empty-state">
          <span class="empty-icon">🔍</span>
          <h3>No Results Found</h3>
          <p>No posts match your search term "{{ searchTerm }}"</p>
          <button (click)="clearSearch()" class="btn-clear">Clear Search</button>
        </div>
      }

      @if (!loading && !error && filteredPosts.length > 0) {
        <div class="post-grid">
          @for (post of filteredPosts; track post.id) {
            <div class="post-card">
              <div class="post-header">
                <span class="post-id">#{{ post.id }}</span>
                <span class="post-user">User {{ post.userId }}</span>
              </div>
              <h3 class="post-title" [innerHTML]="highlightSearch(post.title)"></h3>
              <p class="post-body">{{ post.body }}</p>
              <div class="post-footer">
                <span class="post-meta">{{ post.body.length }} characters</span>
              </div>
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
      border-left: 4px solid #8b5cf6;
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

    .controls-bar {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
    }

    .search-box {
      flex: 1;
      min-width: 300px;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: white;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .search-icon {
      font-size: 1.2rem;
      color: #999;
    }

    .search-box input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 1rem;
      color: #333;
    }

    .search-box input::placeholder {
      color: #999;
    }

    .clear-btn {
      background: #ef4444;
      color: white;
      border: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      transition: background 0.2s;
    }

    .clear-btn:hover {
      background: #dc2626;
    }

    .btn-reload {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-reload:hover:not(:disabled) {
      opacity: 0.9;
      transform: translateY(-2px);
    }

    .btn-reload:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .stats-bar {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 2rem;
    }

    .stat {
      background: white;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .stat.highlight {
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: white;
    }

    .stat-label {
      font-size: 0.9rem;
      color: inherit;
      opacity: 0.8;
    }

    .stat-value {
      font-weight: 700;
      font-size: 1.1rem;
    }

    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .skeleton-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .skeleton-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #f0f0f0;
    }

    .skeleton-body {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .skeleton-text {
      height: 12px;
      background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 4px;
    }

    .skeleton-text-xs {
      width: 30%;
    }

    .skeleton-text-sm {
      width: 20%;
    }

    .skeleton-text-lg {
      height: 16px;
      width: 80%;
    }

    .skeleton-text-short {
      width: 60%;
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    .error-state {
      text-align: center;
      padding: 4rem 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-left: 6px solid #ef4444;
    }

    .error-icon {
      font-size: 4rem;
      display: block;
      margin-bottom: 1rem;
    }

    .error-state h3 {
      margin: 0 0 0.5rem 0;
      color: #991b1b;
    }

    .error-state p {
      color: #dc2626;
      margin-bottom: 1.5rem;
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

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .empty-icon {
      font-size: 4rem;
      display: block;
      margin-bottom: 1rem;
    }

    .empty-state h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .empty-state p {
      color: #666;
      margin-bottom: 1.5rem;
    }

    .btn-clear {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
    }

    .post-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .post-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
      animation: fadeIn 0.3s ease-out;
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

    .post-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .post-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid #f0f0f0;
    }

    .post-id {
      font-size: 0.85rem;
      font-weight: 700;
      color: #8b5cf6;
    }

    .post-user {
      font-size: 0.85rem;
      color: #999;
      background: #f0f0f0;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
    }

    .post-title {
      margin: 0 0 1rem 0;
      color: #333;
      font-size: 1.1rem;
      font-weight: 600;
      line-height: 1.4;
      text-transform: capitalize;
    }

    .post-title ::ng-deep mark {
      background: #fef3c7;
      color: #92400e;
      padding: 2px 4px;
      border-radius: 3px;
    }

    .post-body {
      margin: 0 0 1rem 0;
      color: #666;
      line-height: 1.6;
      font-size: 0.95rem;
    }

    .post-footer {
      padding-top: 1rem;
      border-top: 1px solid #f0f0f0;
    }

    .post-meta {
      font-size: 0.85rem;
      color: #999;
    }

    @media (max-width: 768px) {
      .controls-bar {
        flex-direction: column;
      }

      .search-box {
        min-width: 100%;
      }

      .post-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PostViewerComponent implements OnInit {
  private dataService = inject(DataService);
  
  allPosts: Post[] = [];
  filteredPosts: Post[] = [];
  searchTerm = '';
  loading = false;
  error = '';

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.error = '';

    this.dataService.getPosts().subscribe({
      next: (data) => {
        this.allPosts = data;
        this.filteredPosts = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
        console.error('Error loading posts:', err);
      }
    });
  }

  filterPosts() {
    if (!this.searchTerm.trim()) {
      this.filteredPosts = this.allPosts;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredPosts = this.allPosts.filter(post =>
      post.title.toLowerCase().includes(term) ||
      post.body.toLowerCase().includes(term)
    );
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterPosts();
  }

  reload() {
    this.searchTerm = '';
    this.loadPosts();
  }

  highlightSearch(text: string): string {
    if (!this.searchTerm.trim()) {
      return text;
    }

    const regex = new RegExp(`(${this.searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
}
