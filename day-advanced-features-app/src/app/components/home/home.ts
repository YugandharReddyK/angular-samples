import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  title = signal('Advanced Angular Features');
  
  features = [
    {
      title: 'Change Detection',
      icon: '🔄',
      description: 'Master Default and OnPush strategies for optimal performance',
      route: '/change-detection'
    },
    {
      title: 'Deferrable Views',
      icon: '⚡',
      description: 'Lazy load components with @defer for faster initial loads',
      route: '/deferrable-views'
    },
    {
      title: 'Signal State Management',
      icon: '📊',
      description: 'Build reactive state with Signals - no external libraries needed',
      route: '/signal-state'
    },
    {
      title: 'Dynamic Components',
      icon: '🎨',
      description: 'Create and render components programmatically at runtime',
      route: '/dynamic-components'
    }
  ];
}
