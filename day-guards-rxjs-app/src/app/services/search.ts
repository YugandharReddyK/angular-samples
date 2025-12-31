import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, catchError, tap, delay } from 'rxjs/operators';

export interface SearchResult {
  id: number;
  title: string;
  description: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class Search {
  private searchTerms = new Subject<string>();
  private loadingSubject = new Subject<boolean>();
  
  loading$ = this.loadingSubject.asObservable();

  private mockData: SearchResult[] = [
    { id: 1, title: 'Angular Guards', description: 'Protecting routes with guards', category: 'Security' },
    { id: 2, title: 'RxJS Operators', description: 'Advanced reactive programming', category: 'RxJS' },
    { id: 3, title: 'debounceTime', description: 'Delay emissions by time', category: 'RxJS' },
    { id: 4, title: 'switchMap', description: 'Switch to new observable', category: 'RxJS' },
    { id: 5, title: 'combineLatest', description: 'Combine multiple streams', category: 'RxJS' },
    { id: 6, title: 'CanActivate', description: 'Route activation guard', category: 'Guards' },
    { id: 7, title: 'CanDeactivate', description: 'Route deactivation guard', category: 'Guards' },
    { id: 8, title: 'Authentication', description: 'User authentication flow', category: 'Security' },
    { id: 9, title: 'Authorization', description: 'Role-based access control', category: 'Security' },
    { id: 10, title: 'shareReplay', description: 'Share and replay values', category: 'RxJS' },
  ];

  results$: Observable<SearchResult[]> = this.searchTerms.pipe(
    tap(() => this.loadingSubject.next(true)),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => this.searchData(term)),
    tap(() => this.loadingSubject.next(false)),
    catchError(error => {
      console.error('Search error:', error);
      this.loadingSubject.next(false);
      return of([]);
    })
  );

  search(term: string): void {
    this.searchTerms.next(term);
  }

  private searchData(term: string): Observable<SearchResult[]> {
    if (!term.trim()) {
      return of([]);
    }

    return of(this.mockData).pipe(
      delay(500), // Simulate API delay
      map(data => data.filter(item =>
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.description.toLowerCase().includes(term.toLowerCase()) ||
        item.category.toLowerCase().includes(term.toLowerCase())
      ))
    );
  }
}
