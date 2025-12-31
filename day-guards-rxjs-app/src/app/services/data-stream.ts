import { Injectable } from '@angular/core';
import { Observable, interval, BehaviorSubject, combineLatest, merge } from 'rxjs';
import { map, shareReplay, scan, startWith, take, switchMap, debounceTime, distinctUntilChanged, catchError, retry, tap } from 'rxjs/operators';

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  timestamp: Date;
}

export interface SensorData {
  temperature: number;
  humidity: number;
  pressure: number;
  timestamp: Date;
}

export interface LogEvent {
  timestamp: Date;
  message: string;
}

export interface CombinedData {
  latestStock: StockData | null;
  sensors: SensorData;
  eventCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataStream {
  // Real-time stock prices
  private stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'];
  
  stockData$: Observable<StockData[]> = interval(2000).pipe(
    map(() => this.stockSymbols.map(symbol => ({
      symbol,
      price: 100 + Math.random() * 100,
      change: (Math.random() - 0.5) * 5,
      timestamp: new Date()
    }))),
    shareReplay(1)
  );

  // Real-time sensor data
  sensorData$: Observable<SensorData> = interval(1000).pipe(
    map(() => ({
      temperature: 20 + Math.random() * 10,
      humidity: 40 + Math.random() * 20,
      pressure: 1000 + Math.random() * 50,
      timestamp: new Date()
    })),
    shareReplay(1)
  );

  // Event stream with scan for accumulation
  private eventCounter = 0;
  
  eventLog$: Observable<LogEvent[]> = interval(3000).pipe(
    map(() => ({
      timestamp: new Date(),
      message: `Event #${++this.eventCounter}: System update`
    })),
    scan((acc, event) => [...acc, event].slice(-10), [] as LogEvent[]),
    startWith([])
  );

  // Combined data stream
  combinedData$: Observable<CombinedData> = combineLatest([
    this.stockData$,
    this.sensorData$,
    this.eventLog$
  ]).pipe(
    map(([stocks, sensors, events]) => ({
      latestStock: stocks[0] || null,
      sensors,
      eventCount: events.length
    })),
    shareReplay(1)
  );
}
