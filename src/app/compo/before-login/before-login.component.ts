import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../Security/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-before-login',
  standalone: true,
  imports: [RouterLink,NgIf],
  templateUrl: './before-login.component.html',
  styleUrl: './before-login.component.css'
})
export class BeforeLoginComponent {

constructor(private authService:AuthService){}

//getter for signup button
 get isPresent(): boolean {
  return (
    this.authService.isAuthenticatedSubject.getValue()
  );  
}
}
