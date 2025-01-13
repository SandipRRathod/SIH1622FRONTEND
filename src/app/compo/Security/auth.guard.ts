
//most useful for intire application

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs';
import Swal from 'sweetalert2';

// Defined an authentication guard for user to protect routes from unauthenticated users
export const authGuard: CanActivateFn = (route, state) => {

// Injected the AuthService to check if the user is authenticated
  const authService = inject(AuthService);

  // Injected the Router to navigate to other pages
  const router = inject(Router);

// Checking if the user is authenticated using the AuthService
  return authService.isAuthenticated().pipe(
    tap((isAuthenticated) => { //tap means onclick
      // If the user is not authenticated, show a warning message
      if (!isAuthenticated) {
        Swal.fire({
          title: 'Authentication Required!',
          text: 'You Must Be Logged In As User To Access This Page.',
          icon: 'error',
          confirmButtonText: 'Login',
          timer: 15000, 
          timerProgressBar: true, 
        }).then((result) => {
           // If the user confirms, navigate to the login page
          if (result.isConfirmed) {
            router.navigate(['/login']);
          }
        });
      }
      

    }),
    map((isAuthenticated) => { //map means show the next
    // If the user is authenticated
      if (isAuthenticated) {
        // Check if personal details are filled
      const hasDetails = authService.hasPersonalDetails();
//if filled then redirect to /edit
      // if not filled then only show the /main and has personal details
      if (state.url === '/main' && hasDetails) {
        router.navigate(['/edit']); // Redirect to /edit if details are filled
        return false; // Prevent access to /main

      } 
        return true; // Allow access to the route
      } else {
        return false; // If the user is not authenticated, prevent access
      }
    })
  );
};


export const authGuardAdmin: CanActivateFn = (route, state) => {


  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticatedAdmin().pipe(
    tap((isAuthenticatedAdmin) => {
      if (!isAuthenticatedAdmin) {
        Swal.fire({
          title: 'Authentication Required!',
          text: 'You Must Be Logged In As Admin To Access This Page.',
          icon: 'error',
          confirmButtonText: 'Login',
          timer: 15000, 
          timerProgressBar: true, 
        }).then((result) => {
          if (result.isConfirmed) {
            router.navigate(['/login']);
          }
        });
      }

    }),
    map((isAuthenticatedAdmin) => {
    
      if (isAuthenticatedAdmin) {
        return true;
      } else {
        return false;
      }
    })
  );
};


export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    tap((isAuthenticated) => {
      if (isAuthenticated) {
        Swal.fire({
          title: 'Already Authenticated!',
          text: 'You are already logged in.',
          icon: 'info',
          confirmButtonText: 'OK',
          timer: 3000,
          timerProgressBar: true,
        });
          router.navigate(['/']);
      }
    }),
    map((isAuthenticated) => {
      return !isAuthenticated; // Prevent access if authenticated
    })
  );
};