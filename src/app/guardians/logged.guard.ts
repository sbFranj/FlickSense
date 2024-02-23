import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs';

export const loggedGuard: CanMatchFn = (route, segments) => {
  const userService = inject(UserService)
  const router = inject(Router)

 return userService.validateToken()
 .pipe(
  tap(valid =>  !valid? router.navigate(["/auth/login"]) : false)
 )
};
