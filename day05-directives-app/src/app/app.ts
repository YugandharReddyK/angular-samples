import { Component } from '@angular/core';
import { NgIf, NgFor, NgClass, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list';
import { TodoListComponent } from './todo-list/todo-list';
import { StatusDashboardComponent } from './status-dashboard/status-dashboard';

@Component({
  selector: 'app-root',
  imports: [NgIf, NgFor, NgClass, NgStyle, FormsModule, ProductListComponent, TodoListComponent, StatusDashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Day 5: Angular Directives';
  
  // *ngIf examples
  showMessage = true;
  isLoggedIn = false;
  userRole = 'admin'; // admin, user, guest
  
  // *ngFor examples
  fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Grapes'];
  users = [
    { id: 1, name: 'John Doe', role: 'Admin', active: true },
    { id: 2, name: 'Jane Smith', role: 'User', active: true },
    { id: 3, name: 'Bob Johnson', role: 'User', active: false },
    { id: 4, name: 'Alice Williams', role: 'Manager', active: true }
  ];
  
  // ngClass examples
  isActive = true;
  isHighlighted = false;
  currentStatus = 'success'; // success, warning, error
  
  // ngStyle examples
  fontSize = 16;
  textColor = '#333';
  backgroundColor = '#f0f4f8';
  
  toggleMessage(): void {
    this.showMessage = !this.showMessage;
  }
  
  toggleLogin(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }
  
  toggleActive(): void {
    this.isActive = !this.isActive;
  }
  
  toggleHighlight(): void {
    this.isHighlighted = !this.isHighlighted;
  }
  
  changeStatus(status: string): void {
    this.currentStatus = status;
  }
}
