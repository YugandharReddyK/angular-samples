import { Component, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { TodoState, FilterType } from '../../services/todo-state';
import { UserState } from '../../services/user-state';

@Component({
  selector: 'app-signal-state',
  imports: [TitleCasePipe],
  templateUrl: './signal-state.html',
  styleUrl: './signal-state.scss'
})
export class SignalState {
  newTodoText = signal('');
  selectedPriority = signal<'low' | 'medium' | 'high'>('medium');
  
  constructor(
    public todoState: TodoState,
    public userState: UserState
  ) {}
  
  addTodo(): void {
    const text = this.newTodoText().trim();
    if (text) {
      this.todoState.addTodo(text, this.selectedPriority());
      this.newTodoText.set('');
    }
  }
  
  setFilter(filter: FilterType): void {
    this.todoState.setFilter(filter);
  }
  
  get filters(): FilterType[] {
    return ['all', 'active', 'completed'];
  }
  
  get priorities(): Array<'low' | 'medium' | 'high'> {
    return ['low', 'medium', 'high'];
  }
  
  getPriorityClass(priority: string): string {
    return `priority-${priority}`;
  }
}
