import { Component, NgModule } from '@angular/core';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { CertificateService } from '../Mservice/certificate.service';
import { FormControl, FormsModule, NgForm, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { response } from 'express';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-after-login',
  standalone: true,
  imports: [MatFormField, MatLabel, MatInputModule, MatDatepickerModule, MatIcon, MatSelect, MatOption, FormsModule, ReactiveFormsModule, MatInput, CommonModule, RouterLink],
  providers: [provideNativeDateAdapter()],
  templateUrl: './after-login.component.html',
  styleUrl: './after-login.component.css'
})
export class AfterLoginComponent {

  
  // Created a new FormControl for the email input field
// The initial value is set to an empty string '' (no value)
// The control has two validators applied:
// - Validators.required: Ensures the email field is not left empty
// - Validators.email: Ensures the input follows a valid email format (e.g., user@example.com)
emailFormControl = new FormControl('', [Validators.required, Validators.email]);

//username of user getting from local storage that is stored while registring first time 
  username = localStorage.getItem('Id');

//model for personal other detaisls two way binding is applied
  model = {
    userName: '',
    fatherName: '',
    motherName: '',
    userAge: '',
    userDob: '',
    userMob: '',
    userEmail: '',
    userGender: '',
    userCast: '',
    userAdhar: '',
    userPan: '',
    userNationlity: '',
    userOccup: '',
    userVillage: '',
    userDist: '',
    userTq: '',
    userState: '',
    userPincode: ''
  }


  constructor(private data: CertificateService, private route: Router,private appCompo:AppComponent) {

    //condition for username on mob or email showing in dynamicaly
    if (this.username?.includes('@')) {
      this.model.userEmail = this.username
    }
    if (this.username?.length == 10) {
      this.model.userMob = this.username
    }
    else {
      return;
    }

  }


//method mapped with html for submiting data
  SubmitData() {

    if (this.emailFormControl.invalid) {
      alert('Please enter a valid email address.');
      return;
    }

    //progress spinner 
    this.appCompo.isLoading=true;

    //saveUser() from service to call backend
    this.data.saveUser(this.model).subscribe(
      response => {

        //if the response get from backend then spinner will stop automaticaly by giving false
        this.appCompo.isLoading=false;

        //using sweetalert for best ui
        Swal.fire({
          title: 'Success!',
          text: `Hey ${this.model.userName}, Your data is saved! You can now proceed to the Profile Page.`,
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 15000,
          timerProgressBar: true
        }).then(a => {
          if (a.isConfirmed || a.dismiss === Swal.DismissReason.timer) {
            this.route.navigate(['/profile']);
          }
        });


      },
      error => {
        this.appCompo.isLoading=false;
         Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error?.error || "Something went wrong!",
            })
      }
    );


  }


}
