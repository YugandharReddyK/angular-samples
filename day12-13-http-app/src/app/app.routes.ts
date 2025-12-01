import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then(m => m.HomeComponent)
  },
  // Day 12: HTTP Client Basics
  {
    path: 'user-list',
    loadComponent: () => import('./user-list/user-list').then(m => m.UserListComponent)
  },
  {
    path: 'user-details',
    loadComponent: () => import('./user-details/user-details').then(m => m.UserDetailsComponent)
  },
  {
    path: 'user-details/:id',
    loadComponent: () => import('./user-details/user-details').then(m => m.UserDetailsComponent)
  },
  {
    path: 'post-list',
    loadComponent: () => import('./post-list/post-list').then(m => m.PostListComponent)
  },
  {
    path: 'create-user',
    loadComponent: () => import('./create-user/create-user').then(m => m.CreateUserComponent)
  },
  // Day 13: Async Data & Error Handling
  {
    path: 'async-users',
    loadComponent: () => import('./async-user-list/async-user-list').then(m => m.AsyncUserListComponent)
  },
  {
    path: 'loading-demo',
    loadComponent: () => import('./loading-demo/loading-demo').then(m => m.LoadingDemoComponent)
  },
  {
    path: 'error-demo',
    loadComponent: () => import('./error-handling-demo/error-handling-demo').then(m => m.ErrorHandlingDemoComponent)
  },
  {
    path: 'post-viewer',
    loadComponent: () => import('./post-viewer/post-viewer').then(m => m.PostViewerComponent)
  }
];
