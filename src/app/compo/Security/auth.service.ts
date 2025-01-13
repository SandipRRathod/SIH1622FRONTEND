
//most useful for entire application

// Purpose:
// The AuthService class manages authentication and authorization logic for both regular users and admin users. It handles login, logout, token storage, authentication state, and role-based management.

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

// Properties:

//isAuthenticatedSubject: Tracks the authentication state of a regular user. Defaults to false.
  isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  //isAuthenticatedSubjectAdmin: Tracks the authentication state of an admin user. Defaults to false.
  isAuthenticatedSubjectAdmin = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private route: Router) {
    // Initialize the authentication state on load

    const token = this.getToken();
    const tokenAdmin = this.getTokenAdmin();

    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
    if (tokenAdmin) {
      this.isAuthenticatedSubjectAdmin.next(true);
    }

    
  }

//Checks if the code is running in a browser environment and localStorage is available.
  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }



// Stores the provided user token in local storage.
// Updates isAuthenticatedSubject to true, indicating the user is authenticated.

  login(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('authToken', token);
      this.isAuthenticatedSubject.next(true);
    }
  }

//same as login 
  loginAdmin(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('authTokenAdmin', token);
      this.isAuthenticatedSubjectAdmin.next(true);
    }
  }

  //Handles registration by storing the token in local storage and marking the user as authenticated.
  register(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('authToken', token);
      this.isAuthenticatedSubject.next(true);
    }
  }

//Checks if the user has provided personal details by verifying the presence of data in local storage.
  hasPersonalDetails(): boolean {
    if (localStorage.getItem('data')!==null) {
     return true ;
    } 
    return false;
  }

  
//Clears all tokens and related data from local storage.
// Resets authentication states for both user and admin.
// Displays a logout success message and redirects to the login page.

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('data')
      localStorage.removeItem('authTokenAdmin');
      localStorage.removeItem('Id')
      this.isAuthenticatedSubject.next(false);
      this.isAuthenticatedSubjectAdmin.next(false);
    }
    Swal.fire("Logged Out", "You have been successfully logged out.", "success");
    this.route.navigate(['/login']);
  }


  getToken(): any {
    if (this.isBrowser()) {
      return localStorage.getItem('authToken');
    }
  }

  // Retrieves the respective tokens from local storage for user or admin.

  getTokenAdmin(): any {
    if (this.isBrowser()) {
      return localStorage.getItem('authTokenAdmin');
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

//   Returns an observable of the current authentication state for user or admin.
// Useful for components or guards to reactively determine if a user/admin is logged in.

  isAuthenticatedAdmin(): Observable<boolean> {
    return this.isAuthenticatedSubjectAdmin.asObservable();
  }



}


// in short Summary:
// The AuthService class:

// Manages login, logout, and registration for both users and admins.
// Stores and retrieves tokens from local storage.
// Tracks authentication state using observables.
// Provides utility methods to check for personal details and browser environment.
// Facilitates smooth role-based authentication for applications with user and admin roles.