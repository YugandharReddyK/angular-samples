import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Comparison } from './components/comparison/comparison';
import { ComponentGallery } from './components/component-gallery/component-gallery';
import { FormsDemo } from './components/forms-demo/forms-demo';
import { TableDemo } from './components/table-demo/table-demo';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'comparison', component: Comparison },
  { path: 'components', component: ComponentGallery },
  { path: 'forms', component: FormsDemo },
  { path: 'table', component: TableDemo },
  { path: 'dashboard', component: Dashboard },
  { path: '**', redirectTo: '' }
];
