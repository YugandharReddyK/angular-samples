import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ChangeDetectionDemo } from './components/change-detection-demo/change-detection-demo';
import { DeferrableViews } from './components/deferrable-views/deferrable-views';
import { SignalState } from './components/signal-state/signal-state';
import { DynamicComponents } from './components/dynamic-components/dynamic-components';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'change-detection', component: ChangeDetectionDemo },
  { path: 'deferrable-views', component: DeferrableViews },
  { path: 'signal-state', component: SignalState },
  { path: 'dynamic-components', component: DynamicComponents },
  { path: '**', redirectTo: '' }
];
