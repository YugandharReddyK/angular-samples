import { Injectable } from '@angular/core';

// SERVICE: Provides logging functionality
// 'providedIn: root' means available everywhere in the app
@Injectable({
  providedIn: 'root',
})
export class Logger {
  private logs: string[] = [];
  
  // Log a message
  log(message: string): void {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `[${timestamp}] ${message}`;
    this.logs.push(logEntry);
    console.log(logEntry);
  }
  
  // Get all logs
  getLogs(): string[] {
    return this.logs;
  }
  
  // Clear all logs
  clearLogs(): void {
    this.logs = [];
    console.clear();
  }
}
