import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [NgFor, NgClass],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoListComponent {
  // Simple todo array
  todos = [
    { id: 1, title: 'Learn Angular Directives', completed: true },
    { id: 2, title: 'Practice *ngFor', completed: true },
    { id: 3, title: 'Master ngClass', completed: false },
    { id: 4, title: 'Build a project', completed: false }
  ];
  
  // Toggle todo completion
  toggleTodo(todo: any): void {
    todo.completed = !todo.completed;
  }
}
