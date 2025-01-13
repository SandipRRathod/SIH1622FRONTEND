import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { CertificateService } from '../Mservice/certificate.service';
import { AuthService } from '../Security/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, MatLabel, MatInput, MatFormField, RouterLink, HttpClientModule, MatError, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent {


  //usertype for login dynamicaly
  userType: string = '';


  data = {
    userEmailOrPhone: '',
    userPassword: '',
  };

  errorMessage: string | null = null;

  constructor(
    private certificateService: CertificateService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private appCompo:AppComponent
  ) { }

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
    return "Ok";
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

  login() {

    

    const validationMessage = this.validateInput();


     // Check if UserType is Selected
     if (!this.userType) {
      Swal.fire({
        title: 'User Type Not Selected',
        text: 'Please ensure to select UserType before login.',
        icon: 'warning',
        confirmButtonText: 'OK'
      }).then(a => {
        if (a.isConfirmed) {
          return;
        }
      });
    }

    // Validate Input
    if (this.isInvalidInput(validationMessage)) {
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

    // Proceed with Login Based on UserType
    if (this.userType === 'Admin') {
      this.loginAdmin();
    } else if (this.userType === 'User') {
      this.loginUser();
    }
  }

  // Helper method to check invalid input
  private isInvalidInput(validationMessage: string): boolean {
    const invalidMessages = [
      "Mobile number must be exactly 10 digits.",
      "Please enter a valid email address.",
      "Please enter a valid phone number or email address."
    ];
    return invalidMessages.includes(validationMessage);
  }

  // Admin Login
  private loginAdmin() {
    this.appCompo.isLoading=true;
    this.certificateService.loginAdmin(this.data).subscribe(
      (response) => {
        this.appCompo.isLoading=false;
        const token = response;
        if (token) {
          this.authService.loginAdmin(token);
          this.snackBar.open('Login Successful! Welcome Admin!', "X", {
            duration: 7000,               // Adjust duration as needed
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: [`snackbar`]
          });
          this.router.navigate(['Admin']);
        } else {
          this.snackBar.open('Login failed.', "X", {
            duration: 7000,               // Adjust duration as needed
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: [`snackbar`]
          });
        }
      },
      (error) => {
        this.appCompo.isLoading=false;
        console.error('Admin login error:', error);
        alert('Invalid username or password for Admin');
      }
    );
  }

  // User Login
  private loginUser() {

    this.appCompo.isLoading=true;
    

    this.certificateService.login(this.data).subscribe(
      (response) => {
        this.appCompo.isLoading=false;
        const token = response;
        if (token) {
          localStorage.setItem('Id', this.data.userEmailOrPhone);
          this.authService.login(token);
          this.snackBar.open('Login Successful as User', "X", {
            duration: 7000,               // Adjust duration as needed
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: [`snackbar`]
          });
          this.router.navigate(['/']);
        } else {
          this.snackBar.open('Login failed.', "X", {
            duration: 7000,               // Adjust duration as needed
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: [`snackbar`]
          });
        }
      },
      (error) => {
        this.appCompo.isLoading=false;
        const errorMessage = error?.error || error?.error?.message || error?.message || 'An error occurred during login';

        Swal.fire({
          title: 'Login Failed',
          text: `${errorMessage} for User`,
          icon: 'error',
          confirmButtonText: 'OK'
        });

      }
    );
  }

  



}
