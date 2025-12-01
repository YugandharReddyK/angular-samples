import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Day 12 & 13: HTTP Client & Async Data';
  
  menuItems = [
    { path: '/home', label: 'Home', icon: '🏠', category: '' },
    
    // Day 12: HTTP Client Basics
    { path: '/user-list', label: 'User List (Basic)', icon: '📋', category: 'Day 12' },
    { path: '/user-details', label: 'User Details', icon: '👤', category: 'Day 12' },
    { path: '/post-list', label: 'Post List', icon: '📝', category: 'Day 12' },
    { path: '/create-user', label: 'Create User', icon: '➕', category: 'Day 12' },
    
    // Day 13: Async Data & Error Handling
    { path: '/async-users', label: 'Async Pipe Demo', icon: '⚡', category: 'Day 13' },
    { path: '/loading-demo', label: 'Loading States', icon: '⏳', category: 'Day 13' },
    { path: '/error-demo', label: 'Error Handling', icon: '❌', category: 'Day 13' },
    { path: '/post-viewer', label: 'Post Viewer + Search', icon: '🔍', category: 'Day 13' }
  ];

  getItemsByCategory(category: string) {
    return this.menuItems.filter(item => item.category === category);
  }
}
