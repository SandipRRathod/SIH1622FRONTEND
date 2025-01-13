import { Component } from '@angular/core';
import { CertificateService } from '../../Mservice/certificate.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { error } from 'console';
import Swal from 'sweetalert2';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-change-pass',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.css'
})
export class ChangePassComponent {
  model = {
    oldUsername: localStorage.getItem('Id'),
    oldPassword: '',
    newPassword: ''
  }

  constructor(private service: CertificateService,private appCompo:AppComponent) { }

  updatePass() {

    this.appCompo.isLoading=true;

    this.service.changePass(this.model).subscribe(
      response => {
        this.appCompo.isLoading=false;
        Swal.fire({
          title: 'Success',
          text: 'Password updated successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        console.log("Response", response);
      },
      error => {

      this.appCompo.isLoading=false;
        const errorMessage = error?.error || error?.error?.message || error?.message || 'An error occurred during password update';
  
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  
}
