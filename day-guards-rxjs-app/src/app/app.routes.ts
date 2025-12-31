import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { unsavedChangesGuard } from './guards/unsaved-changes-guard';
import { featureAccessGuard } from './guards/feature-access-guard';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Profile } from './components/profile/profile';
import { Admin } from './components/admin/admin';
import { RxjsOperators } from './components/rxjs-operators/rxjs-operators';
import { SearchDemo } from './components/search-demo/search-demo';
import { RealTimeData } from './components/real-time-data/real-time-data';
import { FormValidator } from './components/form-validator/form-validator';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { 
    path: 'dashboard', 
    component: Dashboard,
    canActivate: [authGuard]
  },
  { 
    path: 'profile', 
    component: Profile,
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard]
  },
  { 
    path: 'admin', 
    component: Admin,
    canActivate: [authGuard, adminGuard]
  },
  { 
    path: 'rxjs-operators', 
    component: RxjsOperators,
    canActivate: [authGuard]
  },
  { 
    path: 'search-demo', 
    component: SearchDemo,
    canActivate: [authGuard]
  },
  { 
    path: 'real-time-data', 
    component: RealTimeData,
    canActivate: [authGuard, featureAccessGuard],
    data: { permission: 'read' }
  },
  { 
    path: 'form-validator', 
    component: FormValidator,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' }
];
