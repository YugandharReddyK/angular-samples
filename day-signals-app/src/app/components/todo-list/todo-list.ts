import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss'
})
export class TodoList {
  todos = signal<Todo[]>([
    { id: 1, text: 'Learn Angular Signals', completed: true, createdAt: new Date() },
    { id: 2, text: 'Build a demo app', completed: false, createdAt: new Date() },
    { id: 3, text: 'Master computed signals', completed: false, createdAt: new Date() }
  ]);

  filter = signal<'all' | 'active' | 'completed'>('all');
  newTodoText = signal('');
  private nextId = 4;

  // Computed signals
  filteredTodos = computed(() => {
    const todos = this.todos();
    const filterType = this.filter();

    if (filterType === 'active') {
      return todos.filter(t => !t.completed);
    }
    if (filterType === 'completed') {
      return todos.filter(t => t.completed);
    }
    return todos;
  });

  totalCount = computed(() => this.todos().length);
  activeCount = computed(() => this.todos().filter(t => !t.completed).length);
  completedCount = computed(() => this.todos().filter(t => t.completed).length);
  allCompleted = computed(() => this.todos().length > 0 && this.todos().every(t => t.completed));

  // Methods
  addTodo() {
    const text = this.newTodoText().trim();
    if (text) {
      const newTodo: Todo = {
        id: this.nextId++,
        text,
        completed: false,
        createdAt: new Date()
      };
      this.todos.update(todos => [...todos, newTodo]);
      this.newTodoText.set('');
    }
  }

  toggleTodo(id: number) {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  deleteTodo(id: number) {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.filter.set(filter);
  }

  updateNewTodoText(text: string) {
    this.newTodoText.set(text);
  }

  clearCompleted() {
    this.todos.update(todos => todos.filter(t => !t.completed));
  }

  toggleAll() {
    const allComplete = this.allCompleted();
    this.todos.update(todos =>
      todos.map(todo => ({ ...todo, completed: !allComplete }))
    );
  }
}
