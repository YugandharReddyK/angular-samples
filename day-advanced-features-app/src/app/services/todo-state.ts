import { Injectable, signal, computed, effect } from '@angular/core';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}

export type FilterType = 'all' | 'active' | 'completed';

@Injectable({
  providedIn: 'root',
})
export class TodoState {
  // Private writable signals
  private todos = signal<Todo[]>([]);
  private filter = signal<FilterType>('all');
  
  // Public readonly signals
  allTodos = this.todos.asReadonly();
  currentFilter = this.filter.asReadonly();
  
  // Computed signals (derived state)
  filteredTodos = computed(() => {
    const filter = this.filter();
    const todos = this.todos();
    
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  });
  
  activeTodos = computed(() => 
    this.todos().filter(todo => !todo.completed)
  );
  
  completedTodos = computed(() =>
    this.todos().filter(todo => todo.completed)
  );
  
  activeCount = computed(() => this.activeTodos().length);
  completedCount = computed(() => this.completedTodos().length);
  totalCount = computed(() => this.todos().length);
  
  highPriorityCount = computed(() =>
    this.todos().filter(t => t.priority === 'high' && !t.completed).length
  );
  
  // Effect for auto-save to localStorage
  constructor() {
    effect(() => {
      const todos = this.todos();
      localStorage.setItem('todos', JSON.stringify(todos));
    });
    
    this.loadFromStorage();
  }
  
  // Actions (methods that modify state)
  addTodo(text: string, priority: 'low' | 'medium' | 'high' = 'medium'): void {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date(),
      priority
    };
    
    this.todos.update(todos => [...todos, newTodo]);
  }
  
  toggleTodo(id: number): void {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }
  
  deleteTodo(id: number): void {
    this.todos.update(todos => todos.filter(todo => todo.id !== id));
  }
  
  updateTodo(id: number, text: string): void {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, text } : todo
      )
    );
  }
  
  updatePriority(id: number, priority: 'low' | 'medium' | 'high'): void {
    this.todos.update(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, priority } : todo
      )
    );
  }
  
  setFilter(filter: FilterType): void {
    this.filter.set(filter);
  }
  
  clearCompleted(): void {
    this.todos.update(todos => todos.filter(todo => !todo.completed));
  }
  
  toggleAll(): void {
    const allCompleted = this.todos().every(t => t.completed);
    this.todos.update(todos =>
      todos.map(todo => ({ ...todo, completed: !allCompleted }))
    );
  }
  
  private loadFromStorage(): void {
    const saved = localStorage.getItem('todos');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const todos = parsed.map((t: any) => ({
          ...t,
          createdAt: new Date(t.createdAt)
        }));
        this.todos.set(todos);
      } catch (e) {
        console.error('Failed to load todos from storage', e);
      }
    }
  }
  
  clearAll(): void {
    this.todos.set([]);
  }
}
