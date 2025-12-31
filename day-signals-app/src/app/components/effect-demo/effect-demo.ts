import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-effect-demo',
  imports: [CommonModule],
  templateUrl: './effect-demo.html',
  styleUrl: './effect-demo.scss'
})
export class EffectDemo {
  count = signal(0);
  searchTerm = signal('');
  logs = signal<string[]>([]);
  autoSaveEnabled = signal(true);
  formData = signal({ name: '', email: '' });

  constructor() {
    // Effect 1: Log count changes
    effect(() => {
      const currentCount = this.count();
      this.addLog(`Count changed to: ${currentCount}`);
      console.log('Count is now:', currentCount);
    });

    // Effect 2: Simulate auto-save
    effect(() => {
      const data = this.formData();
      if (this.autoSaveEnabled() && (data.name || data.email)) {
        this.addLog(`Auto-saved: ${JSON.stringify(data)}`);
        console.log('Auto-saving form data:', data);
      }
    });

    // Effect 3: Search term logging
    effect(() => {
      const term = this.searchTerm();
      if (term) {
        this.addLog(`Searching for: "${term}"`);
      }
    });
  }

  private addLog(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.update(logs => [...logs, `[${timestamp}] ${message}`].slice(-10));
  }

  increment() {
    this.count.update(c => c + 1);
  }

  decrement() {
    this.count.update(c => c - 1);
  }

  updateSearch(term: string) {
    this.searchTerm.set(term);
  }

  updateFormName(name: string) {
    this.formData.update(data => ({ ...data, name }));
  }

  updateFormEmail(email: string) {
    this.formData.update(data => ({ ...data, email }));
  }

  toggleAutoSave() {
    this.autoSaveEnabled.update(enabled => !enabled);
  }

  clearLogs() {
    this.logs.set([]);
  }
}
