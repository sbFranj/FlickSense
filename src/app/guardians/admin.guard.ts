import { CanMatchFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const adminGuard: CanMatchFn = (route, segments) => {
  const userService = inject(UserService)
  const router = inject(Router)

  return userService.role()=="admin"? true : router.navigateByUrl("/movies");
};
