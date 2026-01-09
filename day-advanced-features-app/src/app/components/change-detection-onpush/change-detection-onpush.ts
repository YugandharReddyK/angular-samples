import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';

interface User {
  name: string;
  age: number;
}

@Component({
  selector: 'app-change-detection-onpush',
  imports: [DecimalPipe],
  templateUrl: './change-detection-onpush.html',
  styleUrl: './change-detection-onpush.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectionOnpush {
  @Input() user!: User;
  checksCount = 0;

  ngDoCheck(): void {
    this.checksCount++;
  }
  
  // Only called when component is actually checked (less frequent!)
  get random(): number {
    console.log('⚡ OnPush: random() called');
    return Math.random();
  }
}
