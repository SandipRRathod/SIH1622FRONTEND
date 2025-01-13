import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CertificateService } from '../Mservice/certificate.service';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import Swal from 'sweetalert2';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-certificate-tracking',
  standalone: true,
  imports: [NgIf,FormsModule,MatLabel,MatFormField,MatInput],
  templateUrl: './certificate-tracking.component.html',
  styleUrl: './certificate-tracking.component.css'
})
export class CertificateTrackingComponent {
 
  trackingId: string = '';
  

  ispresent:boolean=false;

  //array of application data from backend 
  application: any = [];

  constructor(private service: CertificateService,private appCompo:AppComponent) { }
  
  trackApplication(id: any) {



    if (this.trackingId === '') {
      Swal.fire({
        title: 'Missing Application ID',
        text: 'Please Enter Application ID',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
  
    this.appCompo.isLoading=true;
    Swal.fire({
      title: 'Tracking Application...',
      text: 'Please wait while we fetch the application details.',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    this.service.trackApplication(this.trackingId).subscribe(
      (response: any) => {

        this.appCompo.isLoading=false;

        Swal.close(); // Close loading Swal
  
        if (response != null) {
          this.ispresent = true;
          this.application = response;
  
          Swal.fire({
            title: 'Application Found!',
            text: `Application details retrieved successfully.`,
            icon: 'success',
            confirmButtonText: 'OK'
          });
        } else {
          this.ispresent = false;
  
          Swal.fire({
            title: 'No Data Found',
            text: `No data available for the provided ID: ${id}`,
            icon: 'info',
            confirmButtonText: 'OK'
          });
        }
      },
      (error) => {
        this.appCompo.isLoading=false;
        this.ispresent = false;
        console.error('Error fetching application:', error);
  
        Swal.close(); // Close loading Swal
  
        Swal.fire({
          title: 'Error',
          text: 'Failed to fetch application details. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  
}
