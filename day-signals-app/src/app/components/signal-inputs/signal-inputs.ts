import { Component, input, output, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  template: `
    <div class="user-card">
      <h3>{{ name() }}</h3>
      <p>Email: {{ email() }}</p>
      <p>Role: {{ role() }}</p>
      <p>Active: {{ isActive() ? 'Yes' : 'No' }}</p>
      <button (click)="onEdit()">Edit User</button>
    </div>
  `,
  styles: [`
    .user-card {
      border: 2px solid #667eea;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      background: white;
    }
    h3 { margin: 0 0 0.5rem; color: #667eea; }
    p { margin: 0.25rem 0; color: #4a5568; }
    button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class UserCard {
  // Signal inputs - read-only from parent
  name = input.required<string>();
  email = input<string>('no-email@example.com');
  role = input<string>('user');
  isActive = input<boolean>(true);

  // Signal output - emit events to parent
  userEdit = output<string>();

  onEdit() {
    this.userEdit.emit(this.name());
  }
}

@Component({
  selector: 'app-counter',
  template: `
    <div class="counter">
      <button (click)="decrement()">-</button>
      <span>{{ value() }}</span>
      <button (click)="increment()">+</button>
    </div>
  `,
  styles: [`
    .counter {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: white;
      padding: 1rem;
      border-radius: 8px;
      border: 2px solid #667eea;
    }
    button {
      width: 40px;
      height: 40px;
      font-size: 1.5rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    span {
      font-size: 1.5rem;
      font-weight: bold;
      min-width: 50px;
      text-align: center;
    }
  `]
})
export class Counter {
  // Two-way binding with model()
  value = model<number>(0);

  increment() {
    this.value.update(v => v + 1);
  }

  decrement() {
    this.value.update(v => v - 1);
  }
}

@Component({
  selector: 'app-signal-inputs',
  imports: [CommonModule, UserCard, Counter],
  templateUrl: './signal-inputs.html',
  styleUrl: './signal-inputs.scss'
})
export class SignalInputs {
  // Parent signals
  users = signal([
    { name: 'Alice Johnson', email: 'alice@example.com', role: 'admin', isActive: true },
    { name: 'Bob Smith', email: 'bob@example.com', role: 'user', isActive: true },
    { name: 'Carol White', email: 'carol@example.com', role: 'guest', isActive: false }
  ]);

  counterValue = signal(10);
  editLog = signal<string[]>([]);

  onUserEdit(userName: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.editLog.update(logs => [...logs, `[${timestamp}] Edited: ${userName}`].slice(-5));
  }
}
