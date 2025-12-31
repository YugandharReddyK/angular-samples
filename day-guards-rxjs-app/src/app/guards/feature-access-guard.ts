import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const featureAccessGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const requiredPermission = route.data['permission'] as string;

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  if (authService.hasPermission(requiredPermission)) {
    return true;
  }

  alert(`Access denied: '${requiredPermission}' permission required`);
  router.navigate(['/dashboard']);
  return false;
};
