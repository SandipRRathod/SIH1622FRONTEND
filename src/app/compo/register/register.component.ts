import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { CertificateService } from '../Mservice/certificate.service';
import { AuthService } from '../Security/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, MatLabel, MatInput, MatFormField, RouterLink,
    MatError, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form = new FormControl('', [Validators.required]);

  data = {
    userEmailOrPhone: '',
    userPassword: '',
  }

  errorMessage: string | null = null;



  constructor(private c: CertificateService, private route: Router, private authService: AuthService,private snackBar: MatSnackBar,private appCompo:AppComponent) { }

  validateInput(): string {
    const input = this.data.userEmailOrPhone.trim();
    this.errorMessage = null;

    if (this.isPhoneNumber(input)) {
      if (input.length !== 10) {
        this.errorMessage = 'Mobile number must be exactly 10 digits.';
        return this.errorMessage;
      }
    } else if (this.isEmail(input)) {
      if (!this.isValidEmail(input)) {
        this.errorMessage = 'Please enter a valid email address.';
        return this.errorMessage;
      }
    } else {
      this.errorMessage = 'Please enter a valid phone number or email address.';
      return this.errorMessage;
    }
    return "InValid";
  }

  isPhoneNumber(input: string): boolean {
    return /^\d+$/.test(input); // Check for digits only
  }

  isEmail(input: string): boolean {
    return /@/.test(input); // Check for '@' symbol
  }

  isValidEmail(email: string): boolean {
    const emailRegex =
      /^[a-zA-Z]+[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/; // Basic email regex
    return emailRegex.test(email);
  }

  register() {
    const validationMessage = this.validateInput();
  
    // Input Validation
    if (["Mobile number must be exactly 10 digits.", 
         "Please enter a valid email address.", 
         "Please enter a valid phone number or email address."].includes(validationMessage)) {
      Swal.fire({
              title: 'Validation Error',
              text: validationMessage,
              icon: 'warning',
              confirmButtonText: 'OK'
            });
      return;
    }
  
    // Password Validation
  if (!this.data.userPassword || this.data.userPassword.trim() === '') {
    Swal.fire({
            title: 'Validation Error',
            text: "Please Enter Password..!",
            icon: 'warning',
            confirmButtonText: 'OK'
          });
    return;
  }
  
    // Form Validation
    if (this.form.invalid) {
    
      this.snackBar.open('Fill Up Required Details Please', "X", {
        duration: 7000,               // Adjust duration as needed
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: [`snackbar`]
      });
      return;
    }

    this.appCompo.isLoading=true;
  
    // Proceed with Registration
    this.c.cardentials(this.data).subscribe(
      (response) => {
        this.appCompo.isLoading=false;
        console.log('Registered Successfully');
        const token = response;
  
        if (token) {
          localStorage.setItem('Id', this.data.userEmailOrPhone);
          this.authService.login(token);
          this.snackBar.open('Registered Successfully', "X", {
            duration: 7000,               // Adjust duration as needed
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: [`snackbar`]
          });
          this.route.navigate(['/main']);
        } else {
          this.snackBar.open('Some Error Has Occurred. Please Re-Register.', "X", {
            duration: 7000,               // Adjust duration as needed
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: [`snackbar`]
          });
        }
      },
      (error) => {
        this.appCompo.isLoading=false;
        // Handle backend error response
        const errorMessage = error?.error || error?.error?.message || error?.message || 'An error occurred during registration';

        Swal.fire({
                  title: 'Login Failed',
                  text: `${errorMessage} for User`,
                  icon: 'error',
                  confirmButtonText: 'OK'
                });

        this.route.navigate(['/login']);
      }
    );
  }
  
}

