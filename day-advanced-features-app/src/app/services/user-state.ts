import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserState {
  private users = signal<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', active: true },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'user', active: false },
    { id: 4, name: 'Alice Johnson', email: 'alice@example.com', role: 'guest', active: true },
  ]);
  
  allUsers = this.users.asReadonly();
  
  activeUsers = computed(() => 
    this.users().filter(u => u.active)
  );
  
  adminUsers = computed(() =>
    this.users().filter(u => u.role === 'admin')
  );
  
  userCount = computed(() => this.users().length);
  activeCount = computed(() => this.activeUsers().length);
  
  addUser(user: Omit<User, 'id'>): void {
    const newUser: User = {
      ...user,
      id: Date.now()
    };
    this.users.update(users => [...users, newUser]);
  }
  
  toggleActive(id: number): void {
    this.users.update(users =>
      users.map(user =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }
  
  deleteUser(id: number): void {
    this.users.update(users => users.filter(u => u.id !== id));
  }
}
