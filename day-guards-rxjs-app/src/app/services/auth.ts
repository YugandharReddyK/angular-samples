import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  permissions: string[];
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private readonly MOCK_USERS: { [key: string]: User } = {
    'admin': {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      role: 'admin',
      permissions: ['read', 'write', 'delete', 'manage-users']
    },
    'user': {
      id: 2,
      username: 'user',
      email: 'user@example.com',
      role: 'user',
      permissions: ['read', 'write']
    },
    'guest': {
      id: 3,
      username: 'guest',
      email: 'guest@example.com',
      role: 'guest',
      permissions: ['read']
    }
  };

  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): Observable<User> {
    return of(this.MOCK_USERS[username.toLowerCase()]).pipe(
      delay(1000),
      map(user => {
        if (!user) {
          throw new Error('Invalid credentials');
        }
        return user;
      }),
      tap(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === role;
  }

  hasPermission(permission: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.permissions.includes(permission) ?? false;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
