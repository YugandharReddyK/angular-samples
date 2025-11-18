import { Injectable } from '@angular/core';

// SERVICE: Manages shared data across components
@Injectable({
  providedIn: 'root',
})
export class Data {
  // Shared user data
  private users = [
    { id: 1, name: 'John Doe', role: 'Admin' },
    { id: 2, name: 'Jane Smith', role: 'User' },
    { id: 3, name: 'Bob Johnson', role: 'User' }
  ];
  
  private message = 'Hello from Data Service!';
  
  // Get all users
  getUsers(): any[] {
    return this.users;
  }
  
  // Add a new user
  addUser(user: any): void {
    user.id = this.users.length + 1;
    this.users.push(user);
  }
  
  // Get message
  getMessage(): string {
    return this.message;
  }
  
  // Set message
  setMessage(msg: string): void {
    this.message = msg;
  }
}
