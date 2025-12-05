import { Routes } from '@angular/router';
import { UserProfile } from './user-profile/user-profile';
import { UserOrders } from './user-orders/user-orders';

export const USER_ROUTES: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: UserProfile },
  { path: 'orders', component: UserOrders }
];
