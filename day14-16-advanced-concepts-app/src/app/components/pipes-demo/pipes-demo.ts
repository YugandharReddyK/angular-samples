import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../pipes/filter-pipe';
import { PhonePipe } from '../../pipes/phone-pipe';
import { HighlightPipe } from '../../pipes/highlight-pipe';

@Component({
  selector: 'app-pipes-demo',
  imports: [CommonModule, FormsModule, FilterPipe, PhonePipe, HighlightPipe],
  templateUrl: './pipes-demo.html',
  styleUrl: './pipes-demo.scss',
})
export class PipesDemo {
  // Built-in Pipes Demo Data
  today = new Date();
  name = 'angular developer';
  price = 1234.567;
  rating = 0.856;
  largeNumber = 123456789;
  user = { 
    name: 'John Doe', 
    age: 30, 
    email: 'john@example.com',
    role: 'Developer'
  };
  
  // Custom Pipes Demo Data
  products = [
    { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
    { id: 2, name: 'Mouse', price: 29.99, category: 'Electronics' },
    { id: 3, name: 'Keyboard', price: 79.99, category: 'Electronics' },
    { id: 4, name: 'Desk Chair', price: 199.99, category: 'Furniture' },
    { id: 5, name: 'Monitor', price: 299.99, category: 'Electronics' },
    { id: 6, name: 'Desk Lamp', price: 39.99, category: 'Furniture' }
  ];
  
  searchText = '';
  phoneNumber = '5551234567';
  highlightSearch = '';
  sampleText = 'Angular is a powerful framework for building web applications. It provides great features like components, services, and pipes.';
}
