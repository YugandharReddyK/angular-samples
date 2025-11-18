import { Component } from '@angular/core';
import { NgFor, NgStyle } from '@angular/common';

@Component({
  selector: 'app-status-dashboard',
  imports: [NgFor, NgStyle],
  templateUrl: './status-dashboard.html',
  styleUrl: './status-dashboard.scss',
})
export class StatusDashboardComponent {
  // Server status data
  servers = [
    { name: 'Server 1', status: 'online', uptime: 99 },
    { name: 'Server 2', status: 'online', uptime: 87 },
    { name: 'Server 3', status: 'offline', uptime: 0 },
    { name: 'Server 4', status: 'warning', uptime: 65 }
  ];
  
  // Get color based on status
  getStatusColor(status: string): string {
    if (status === 'online') return '#10b981';
    if (status === 'offline') return '#ef4444';
    return '#f59e0b';
  }
}
