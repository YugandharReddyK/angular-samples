import { Component } from '@angular/core';
import { Logger } from '../services/logger';
import { Data } from '../services/data';

@Component({
  selector: 'app-component-b',
  imports: [],
  templateUrl: './component-b.html',
  styleUrl: './component-b.scss',
})
export class ComponentBComponent {
  message = '';
  
  // INJECT same services - Angular provides the SAME instance!
  constructor(
    private logger: Logger,
    private dataService: Data
  ) {
    this.logger.log('Component B Initialized');
    this.message = this.dataService.getMessage();
  }
  
  // Get message (shared with Component A)
  getSharedMessage(): string {
    return this.dataService.getMessage();
  }
}
