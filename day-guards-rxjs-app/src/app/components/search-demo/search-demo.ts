import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Search, SearchResult } from '../../services/search';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-demo',
  imports: [CommonModule],
  templateUrl: './search-demo.html',
  styleUrl: './search-demo.scss',
})
export class SearchDemo {
  results$: Observable<SearchResult[]>;
  loading$: Observable<boolean>;

  constructor(public searchService: Search) {
    this.results$ = searchService.results$;
    this.loading$ = searchService.loading$;
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchService.search(target.value);
  }
}
