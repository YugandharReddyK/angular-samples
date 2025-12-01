import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="home-container">
      <div class="hero">
        <h1>🌐 HTTP Client & Async Data Handling</h1>
        <p class="subtitle">Learn how to work with APIs, handle async data, and manage errors in Angular</p>
      </div>

      <div class="sections">
        <div class="section-card">
          <div class="section-header">
            <span class="section-icon">📡</span>
            <h2>Day 12: HTTP Client Basics</h2>
          </div>
          <p>Learn how to make HTTP requests and communicate with APIs.</p>
          <ul class="topics">
            <li>✅ Making GET requests</li>
            <li>✅ Fetching data by ID</li>
            <li>✅ Displaying API data</li>
            <li>✅ Making POST requests</li>
            <li>✅ Working with Observables</li>
          </ul>
          <div class="links">
            <a routerLink="/user-list" class="link-button">User List Demo →</a>
            <a routerLink="/create-user" class="link-button">Create User Demo →</a>
          </div>
        </div>

        <div class="section-card">
          <div class="section-header">
            <span class="section-icon">⚡</span>
            <h2>Day 13: Async & Error Handling</h2>
          </div>
          <p>Master async pipes, loading states, and error handling techniques.</p>
          <ul class="topics">
            <li>✅ Using async pipe</li>
            <li>✅ Managing loading states</li>
            <li>✅ Handling HTTP errors</li>
            <li>✅ Implementing retry logic</li>
            <li>✅ Client-side filtering</li>
          </ul>
          <div class="links">
            <a routerLink="/async-users" class="link-button">Async Pipe Demo →</a>
            <a routerLink="/error-demo" class="link-button">Error Handling →</a>
          </div>
        </div>
      </div>

      <div class="info-box">
        <h3>📚 About This Application</h3>
        <p>
          This application demonstrates real-world HTTP client usage with the 
          <strong>JSONPlaceholder API</strong> - a free fake REST API for testing and prototyping.
        </p>
        <p>
          Explore each section to see different patterns for making HTTP requests, 
          managing async data, and handling errors gracefully.
        </p>
      </div>

      <div class="quick-links">
        <h3>🚀 Quick Start</h3>
        <div class="quick-link-grid">
          <a routerLink="/user-list" class="quick-link">
            <span>📋</span>
            <span>User List</span>
          </a>
          <a routerLink="/user-details" class="quick-link">
            <span>👤</span>
            <span>User Details</span>
          </a>
          <a routerLink="/post-list" class="quick-link">
            <span>📝</span>
            <span>Post List</span>
          </a>
          <a routerLink="/create-user" class="quick-link">
            <span>➕</span>
            <span>Create User</span>
          </a>
          <a routerLink="/async-users" class="quick-link">
            <span>⚡</span>
            <span>Async Pipe</span>
          </a>
          <a routerLink="/loading-demo" class="quick-link">
            <span>⏳</span>
            <span>Loading States</span>
          </a>
          <a routerLink="/error-demo" class="quick-link">
            <span>❌</span>
            <span>Error Handling</span>
          </a>
          <a routerLink="/post-viewer" class="quick-link">
            <span>🔍</span>
            <span>Post Viewer</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .hero {
      text-align: center;
      margin-bottom: 3rem;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: white;
    }

    .hero h1 {
      margin: 0 0 1rem 0;
      font-size: 2.5rem;
      font-weight: 700;
    }

    .subtitle {
      margin: 0;
      font-size: 1.2rem;
      opacity: 0.95;
    }

    .sections {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .section-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .section-icon {
      font-size: 2.5rem;
    }

    .section-card h2 {
      margin: 0;
      color: #333;
      font-size: 1.5rem;
    }

    .section-card p {
      color: #666;
      margin-bottom: 1.5rem;
    }

    .topics {
      list-style: none;
      padding: 0;
      margin-bottom: 1.5rem;
    }

    .topics li {
      padding: 0.5rem 0;
      color: #555;
    }

    .links {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .link-button {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 500;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .link-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .info-box {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .info-box h3 {
      margin: 0 0 1rem 0;
      color: #333;
    }

    .info-box p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 0.5rem;
    }

    .quick-links {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .quick-links h3 {
      margin: 0 0 1.5rem 0;
      color: #333;
    }

    .quick-link-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 1rem;
    }

    .quick-link {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1.5rem 1rem;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border-radius: 8px;
      text-decoration: none;
      color: #333;
      transition: all 0.2s;
      font-weight: 500;
    }

    .quick-link span:first-child {
      font-size: 2rem;
    }

    .quick-link:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
      .hero h1 {
        font-size: 1.8rem;
      }

      .sections {
        grid-template-columns: 1fr;
      }

      .quick-link-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      }
    }
  `]
})
export class HomeComponent {}
