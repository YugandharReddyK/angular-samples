import { Component, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-heavy-chart',
  imports: [DecimalPipe],
  templateUrl: './heavy-chart.html',
  styleUrl: './heavy-chart.scss'
})
export class HeavyChart implements OnInit {
  data = signal<number[]>([]);
  loadTime = signal<number>(0);
  
  ngOnInit(): void {
    const start = performance.now();
    
    // Simulate heavy computation
    const chartData: number[] = [];
    for (let i = 0; i < 100; i++) {
      chartData.push(Math.random() * 100);
    }
    
    this.data.set(chartData);
    this.loadTime.set(performance.now() - start);
    
    console.log(`📊 Heavy Chart loaded in ${this.loadTime()}ms`);
  }
  
  get maxValue(): number {
    return Math.max(...this.data());
  }
  
  getBarHeight(value: number): number {
    return (value / this.maxValue) * 100;
  }
}
