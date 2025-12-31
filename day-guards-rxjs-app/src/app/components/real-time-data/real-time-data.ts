import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataStream, StockData, SensorData, LogEvent, CombinedData } from '../../services/data-stream';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-real-time-data',
  imports: [CommonModule],
  templateUrl: './real-time-data.html',
  styleUrl: './real-time-data.scss',
})
export class RealTimeData {
  stockData$: Observable<StockData[]>;
  sensorData$: Observable<SensorData>;
  eventLog$: Observable<LogEvent[]>;
  combinedData$: Observable<CombinedData>;

  constructor(dataStream: DataStream) {
    this.stockData$ = dataStream.stockData$;
    this.sensorData$ = dataStream.sensorData$;
    this.eventLog$ = dataStream.eventLog$;
    this.combinedData$ = dataStream.combinedData$;
  }
}
