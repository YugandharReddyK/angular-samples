import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface DashboardStats {
  label: string;
  value: number;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard implements OnInit {
  stats: DashboardStats[] = [];
  recentActivities: string[] = [];

  ngOnInit() {
    this.loadStats();
    this.loadRecentActivities();
  }

  loadStats() {
    this.stats = [
      { label: 'Total Users', value: 1234, icon: '👥', color: '#1976d2' },
      { label: 'Active Sessions', value: 89, icon: '🔥', color: '#4caf50' },
      { label: 'Total Orders', value: 567, icon: '📦', color: '#ff9800' },
      { label: 'Revenue', value: 45678, icon: '💰', color: '#9c27b0' }
    ];
  }

  loadRecentActivities() {
    this.recentActivities = [
      'User john@example.com registered',
      'Order #1234 was completed',
      'New product added to catalog',
      'System backup completed',
      'User jane@example.com updated profile'
    ];
  }
}
