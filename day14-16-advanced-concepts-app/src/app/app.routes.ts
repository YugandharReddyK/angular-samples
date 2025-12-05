import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { PipesDemo } from './components/pipes-demo/pipes-demo';
import { LifecycleParent } from './components/lifecycle-parent/lifecycle-parent';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'pipes', component: PipesDemo },
  { path: 'lifecycle', component: LifecycleParent },
  { 
    path: 'admin', 
    loadChildren: () => import('./modules/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  { 
    path: 'user', 
    loadChildren: () => import('./modules/user/user.routes').then(m => m.USER_ROUTES)
  },
  { path: '**', redirectTo: '' }
];
