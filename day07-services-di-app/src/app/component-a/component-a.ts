import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Logger } from '../services/logger';
import { Data } from '../services/data';

@Component({
  selector: 'app-component-a',
  imports: [NgFor, FormsModule],
  templateUrl: './component-a.html',
  styleUrl: './component-a.scss',
})
export class ComponentAComponent {
  users: any[] = [];
  message = '';
  
  // INJECT services - same instance as used in App component!
  constructor(
    private logger: Logger,
    private dataService: Data
  ) {
    this.logger.log('Component A Initialized');
    this.loadData();
  }
  
  loadData(): void {
    this.users = this.dataService.getUsers();
    this.message = this.dataService.getMessage();
  }
  
  updateMessage(newMessage: string): void {
    this.dataService.setMessage(newMessage);
    this.message = newMessage;
    this.logger.log('Message updated in Component A');
  }
}
