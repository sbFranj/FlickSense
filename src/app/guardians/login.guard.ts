import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';


export const loginGuard: CanMatchFn = (route, segments) => {
  const userService = inject(UserService)
  const router = inject(Router)

 return userService.email()? router.navigateByUrl("/movies"):true
};
