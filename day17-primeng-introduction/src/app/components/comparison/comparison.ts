import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  status: string;
}

@Component({
  selector: 'app-comparison',
  imports: [CommonModule, FormsModule, TableModule, ButtonModule, InputTextModule, TagModule],
  templateUrl: './comparison.html',
  styleUrl: './comparison.scss',
})
export class Comparison {
  products: Product[] = [
    { id: 1, name: 'Laptop Pro 15', category: 'Electronics', price: 1299, stock: 45, rating: 4.8, status: 'In Stock' },
    { id: 2, name: 'Wireless Mouse', category: 'Electronics', price: 29, stock: 120, rating: 4.5, status: 'In Stock' },
    { id: 3, name: 'Mechanical Keyboard', category: 'Electronics', price: 159, stock: 8, rating: 4.9, status: 'Low Stock' },
    { id: 4, name: 'USB-C Hub', category: 'Accessories', price: 49, stock: 0, rating: 4.2, status: 'Out of Stock' },
    { id: 5, name: 'Monitor 27"', category: 'Electronics', price: 349, stock: 32, rating: 4.7, status: 'In Stock' },
    { id: 6, name: 'Desk Lamp LED', category: 'Office', price: 45, stock: 67, rating: 4.4, status: 'In Stock' },
    { id: 7, name: 'Webcam HD', category: 'Electronics', price: 79, stock: 15, rating: 4.3, status: 'In Stock' },
    { id: 8, name: 'Headphones Pro', category: 'Electronics', price: 199, stock: 3, rating: 4.9, status: 'Low Stock' }
  ];

  // For vanilla table
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  searchText: string = '';

  get filteredProducts() {
    let filtered = this.products;
    
    if (this.searchText) {
      const search = this.searchText.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search) ||
        p.status.toLowerCase().includes(search)
      );
    }
    
    if (this.sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[this.sortColumn as keyof Product];
        const bVal = b[this.sortColumn as keyof Product];
        const comparison = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }
    
    return filtered;
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'In Stock': return 'status-in-stock';
      case 'Low Stock': return 'status-low-stock';
      case 'Out of Stock': return 'status-out-stock';
      default: return '';
    }
  }

  getStatusSeverity(status: string): 'success' | 'warn' | 'danger' {
    switch (status) {
      case 'In Stock': return 'success';
      case 'Low Stock': return 'warn';
      case 'Out of Stock': return 'danger';
      default: return 'success';
    }
  }
}
