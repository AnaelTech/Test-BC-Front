import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (!userService.isAdmin()) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
