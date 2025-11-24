import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Day 8 & 9: Routing & Route Parameters';
  
  // Sidebar menu items
  menuItems = [
    { path: '/home', label: 'Home', icon: '🏠' },
    { path: '/products', label: 'Products', icon: '📦' },
    { path: '/users', label: 'Users', icon: '👥' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/contact', label: 'Contact', icon: '📧' }
  ];
}
