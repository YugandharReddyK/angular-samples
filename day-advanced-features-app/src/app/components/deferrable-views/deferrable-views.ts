import { Component, signal } from '@angular/core';
import { HeavyChart } from '../heavy-chart/heavy-chart';

@Component({
  selector: 'app-deferrable-views',
  imports: [HeavyChart],
  templateUrl: './deferrable-views.html',
  styleUrl: './deferrable-views.scss'
})
export class DeferrableViews {
  showChart = signal(false);
  
  loadChartManually(): void {
    this.showChart.set(true);
  }
}
