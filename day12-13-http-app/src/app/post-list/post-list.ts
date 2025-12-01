import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { Post } from '../models/post.interface';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule],
  template: `
    <div class="component-container">
      <div class="header">
        <h1>📝 Post List - Displaying API Data</h1>
        <p class="description">
          Fetches and displays posts from JSONPlaceholder API.
        </p>
      </div>

      <div class="code-explanation">
        <h3>💡 What's happening here:</h3>
        <ul>
          <li>✅ Making GET request for posts collection</li>
          <li>✅ Displaying list data with <code>*ngFor</code></li>
          <li>✅ Handling large datasets</li>
          <li>✅ Card-based UI layout</li>
        </ul>
      </div>

      <div class="stats">
        <div class="stat-card">
          <span class="stat-number">{{ posts.length }}</span>
          <span class="stat-label">Total Posts</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ getUniqueUserCount() }}</span>
          <span class="stat-label">Unique Authors</span>
        </div>
      </div>

      @if (posts.length > 0) {
        <div class="post-list">
          @for (post of posts; track post.id) {
            <div class="post-card">
              <div class="post-header">
                <span class="post-id">#{{ post.id }}</span>
                <span class="post-user">User {{ post.userId }}</span>
              </div>
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-body">{{ post.body }}</p>
            </div>
          }
        </div>
      } @else {
        <div class="empty-state">
          <span class="empty-icon">📭</span>
          <p>No posts loaded yet...</p>
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

    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .stat-label {
      color: #666;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .post-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }

    .post-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, box-shadow 0.2s;
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
      color: #667eea;
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

    .post-body {
      margin: 0;
      color: #666;
      line-height: 1.6;
      font-size: 0.95rem;
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

    @media (max-width: 768px) {
      .post-list {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PostListComponent implements OnInit {
  private dataService = inject(DataService);
  posts: Post[] = [];

  ngOnInit() {
    this.dataService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        console.log('Posts loaded:', this.posts.length);
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }

  getUniqueUserCount(): number {
    return new Set(this.posts.map(p => p.userId)).size;
  }
}
