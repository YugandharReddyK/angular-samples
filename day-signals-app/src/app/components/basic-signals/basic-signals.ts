import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basic-signals',
  imports: [CommonModule],
  templateUrl: './basic-signals.html',
  styleUrl: './basic-signals.scss'
})
export class BasicSignals {
  // Basic signal
  count = signal(0);
  message = signal('Hello, Signals!');
  isActive = signal(false);
  items = signal<string[]>(['Apple', 'Banana', 'Orange']);

  // Methods to update signals
  increment() {
    this.count.update(value => value + 1);
  }

  decrement() {
    this.count.update(value => value - 1);
  }

  reset() {
    this.count.set(0);
  }

  updateMessage(newMessage: string) {
    this.message.set(newMessage);
  }

  toggleActive() {
    this.isActive.update(value => !value);
  }

  addItem(item: string) {
    if (item.trim()) {
      this.items.update(current => [...current, item.trim()]);
    }
  }

  removeItem(index: number) {
    this.items.update(current => current.filter((_, i) => i !== index));
  }
}
