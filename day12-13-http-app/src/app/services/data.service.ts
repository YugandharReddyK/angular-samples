import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user.interface';
import { Post } from '../models/post.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  // USER METHODS
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // POST METHODS
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`).pipe(
      catchError(this.handleError)
    );
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getPostsByUserId(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts?userId=${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  createPost(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, post).pipe(
      catchError(this.handleError)
    );
  }

  // ERROR HANDLING
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Backend error
      switch (error.status) {
        case 0:
          errorMessage = 'Network error: Unable to connect to the server';
          break;
        case 400:
          errorMessage = 'Bad Request: Invalid data provided';
          break;
        case 404:
          errorMessage = 'Not Found: The requested resource does not exist';
          break;
        case 500:
          errorMessage = 'Server Error: Something went wrong on the server';
          break;
        default:
          errorMessage = `Server returned code ${error.status}: ${error.message}`;
      }
    }
    
    console.error('HTTP Error:', error);
    return throwError(() => new Error(errorMessage));
  }

  // UTILITY METHOD - Simulates slow API for loading demo
  getUsersWithDelay(delayMs: number = 2000): Observable<User[]> {
    return new Observable(observer => {
      setTimeout(() => {
        this.getUsers().subscribe({
          next: (users) => {
            observer.next(users);
            observer.complete();
          },
          error: (error) => observer.error(error)
        });
      }, delayMs);
    });
  }

  // UTILITY METHOD - Simulates API error for error handling demo
  getUsersWithError(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/invalid-endpoint`).pipe(
      catchError(this.handleError)
    );
  }
}
