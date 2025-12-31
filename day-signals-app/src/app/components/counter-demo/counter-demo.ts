import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter-demo',
  imports: [CommonModule],
  templateUrl: './counter-demo.html',
  styleUrl: './counter-demo.scss'
})
export class CounterDemo {
  count = signal(0);
  step = signal(1);
  history = signal<number[]>([0]);

  doubled = computed(() => this.count() * 2);
  isEven = computed(() => this.count() % 2 === 0);
  isPositive = computed(() => this.count() > 0);
  summary = computed(() => {
    const c = this.count();
    const type = this.isEven() ? 'even' : 'odd';
    const sign = this.isPositive() ? 'positive' : c < 0 ? 'negative' : 'zero';
    return `${c} is ${type} and ${sign}`;
  });

  increment() {
    this.count.update(c => c + this.step());
    this.addToHistory();
  }

  decrement() {
    this.count.update(c => c - this.step());
    this.addToHistory();
  }

  reset() {
    this.count.set(0);
    this.history.set([0]);
  }

  setStep(step: number) {
    this.step.set(step);
  }

  private addToHistory() {
    this.history.update(h => [...h, this.count()].slice(-10));
  }
}
