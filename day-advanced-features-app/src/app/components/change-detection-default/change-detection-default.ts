import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';

interface User {
  name: string;
  age: number;
}

@Component({
  selector: 'app-change-detection-default',
  imports: [DecimalPipe],
  templateUrl: './change-detection-default.html',
  styleUrl: './change-detection-default.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChangeDetectionDefault {
  @Input() user!: User;
  checksCount = 0;

  ngDoCheck(): void {
    this.checksCount++;
  }
  
  // This getter is called on EVERY change detection cycle
  get random(): number {
    console.log('🔄 Default: random() called');
    return Math.random();
  }
}
