import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from '../../services/users.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

/**
 * User resolver
 *
 * @param route
 * @param state
 */
export const userResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(UsersService);
  const router = inject(Router);

  return userService.getUserById(route.paramMap.get('id')!).pipe(
    // Error here means the requested user is not available
    catchError((error) => {
      // Log the error
      console.error(error);

      // Get the parent url
      const parentUrl = state.url.split('/').slice(0, -1).join('/');

      // Navigate to there
      router.navigateByUrl(parentUrl);

      // Throw an error
      return throwError(() => new Error(error));
    })
  );
};
