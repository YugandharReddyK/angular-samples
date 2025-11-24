import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Day 10 & 11: Angular Forms';
  
  menuItems = [
    { path: '/home', label: 'Home', icon: '🏠', category: '' },
    
    // Day 10: Template-Driven Forms
    { path: '/template-driven', label: 'Basic Template Form', icon: '📝', category: 'Template-Driven' },
    { path: '/login', label: 'Login Form', icon: '🔐', category: 'Template-Driven' },
    { path: '/contact', label: 'Contact Form', icon: '📧', category: 'Template-Driven' },
    
    // Day 11: Reactive Forms
    { path: '/reactive', label: 'Basic Reactive Form', icon: '⚛️', category: 'Reactive' },
    { path: '/registration', label: 'Registration Form', icon: '📋', category: 'Reactive' },
    { path: '/profile', label: 'Profile Form', icon: '👤', category: 'Reactive' }
  ];

  getItemsByCategory(category: string) {
    return this.menuItems.filter(item => item.category === category);
  }
}
