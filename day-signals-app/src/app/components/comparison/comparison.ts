import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-comparison',
  imports: [CommonModule],
  templateUrl: './comparison.html',
  styleUrl: './comparison.scss'
})
export class Comparison {
  // ========== SIGNALS APPROACH ==========
  signalCount = signal(0);
  signalName = signal('Angular');
  
  signalDoubled = computed(() => this.signalCount() * 2);
  signalGreeting = computed(() => `Hello, ${this.signalName()}!`);

  incrementSignal() {
    this.signalCount.update(c => c + 1);
  }

  updateSignalName(name: string) {
    this.signalName.set(name);
  }

  // ========== BEHAVIORSUBJECT APPROACH ==========
  behaviorCount$ = new BehaviorSubject<number>(0);
  behaviorName$ = new BehaviorSubject<string>('Angular');

  behaviorDoubled$ = this.behaviorCount$.pipe(
    map(count => count * 2)
  );

  behaviorGreeting$ = this.behaviorName$.pipe(
    map(name => `Hello, ${name}!`)
  );

  incrementBehavior() {
    this.behaviorCount$.next(this.behaviorCount$.value + 1);
  }

  updateBehaviorName(name: string) {
    this.behaviorName$.next(name);
  }

  // Performance metrics
  signalOperations = signal(0);
  behaviorOperations = signal(0);

  performSignalOperations() {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      this.signalCount.set(i);
    }
    const end = performance.now();
    this.signalOperations.set(end - start);
  }

  performBehaviorOperations() {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      this.behaviorCount$.next(i);
    }
    const end = performance.now();
    this.behaviorOperations.set(end - start);
  }
}
