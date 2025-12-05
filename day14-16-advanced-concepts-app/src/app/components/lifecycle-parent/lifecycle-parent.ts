import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LifecycleChild } from '../lifecycle-child/lifecycle-child';

@Component({
  selector: 'app-lifecycle-parent',
  imports: [CommonModule, FormsModule, LifecycleChild],
  templateUrl: './lifecycle-parent.html',
  styleUrl: './lifecycle-parent.scss',
})
export class LifecycleParent implements OnInit {
  showChild = true;
  childMessage = 'Hello from Parent';
  counter = 0;
  logs: string[] = [];

  ngOnInit() {
    this.addLog('Parent', 'ngOnInit');
  }

  toggleChild() {
    this.showChild = !this.showChild;
  }

  updateMessage() {
    this.childMessage = `Updated message ${++this.counter}`;
  }

  onChildEvent(data: string) {
    this.addLog('Parent', `Received from child: ${data}`);
  }

  addLog(source: string, message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.logs.push(`[${timestamp}] ${source}: ${message}`);
  }

  clearLogs() {
    this.logs = [];
  }
}
