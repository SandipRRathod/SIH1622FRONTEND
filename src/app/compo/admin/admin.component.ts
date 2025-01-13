import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CertificateService } from '../Mservice/certificate.service';
import { AuthService } from '../Security/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatTableModule, FormsModule, MatIcon
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  // columns of Income applications mapped with html 
  displayedColumnsIncome: string[] = ['column0', 'column1', 'column2', 'column3', 'column4', 'column5', 'column6', 'column7', 'column8', 'column9', 'column10', 'column11', 'column12', 'column13', 'column14', 'column15'];

  //datasource for above columns 
  dataSourceIncome: any[] = [];

// columns of caste applications mapped with html
  displayedColumnsCaste: string[] = ['column0', 'column1', 'column2', 'column3', 'column4', 'column5', 'column6', 'column7', 'column8', 'column9', 'column10', 'column11', 'column12', 'column13', 'column14'];

 //datasource for above columns 
  dataSourceCaste: any[] = [];

  // columns of anad applications mapped with html
  displayedColumnsANAD: string[] = ['column0', 'column1', 'column2', 'column3', 'column4', 'column5', 'column6', 'column7', 'column8', 'column9', 'column10', 'column11', 'column12', 'column13', 'column14'];

   //datasource for above columns 
  dataSourceANAD: any[] = [];


  constructor(private http: HttpClient, private service: CertificateService, private authService: AuthService) {
  }



//on initilozation of component data isfilterd in "certiStatus == 'In Process'" if in proces then only show the certificate otherwise dont for all certificates.
  ngOnInit(): void {
    this.service.getAllIncome().subscribe((data: any[]) => {
      this.dataSourceIncome = data.filter((app: { certiStatus: string }) =>
        app.certiStatus == 'In Process'
      );
    });

    this.service.getAllCaste().subscribe((data: any[]) => {
      this.dataSourceCaste = data.filter((app: { certiStatus: string }) =>
        app.certiStatus == 'In Process'
      );
    });

    this.service.getAllANAD().subscribe((data: any[]) => {
      this.dataSourceANAD = data.filter((app: { certiStatus: string }) =>
        app.certiStatus == 'In Process'
      );
    });

  }


  //approvel model 
  approvedData = {
    certiStatus: 'Approved',
    rejectionStatus: '-'
  }

//approvel method mapped with html 
  approve(id: any): void {
    // Display the confirmation prompt with approve/cancel options
    Swal.fire({
      title: "Do You Want To Approve?",
      showDenyButton: true,
      confirmButtonText: "Approve",
      denyButtonText: "Cancel Approval"
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms approval, call the service to approve the application
        this.approveApplication(id);
      } else if (result.isDenied) {
        // If user denies, show an informational message
        Swal.fire("Approval Canceled...", "", "info");
      }
    });
  }

  // Method to handle approval API call
  approveApplication(id: any): void {
    this.service.approveApplication(id, this.approvedData).subscribe(
      (response) => {
        // Show success message if approval is successful
        Swal.fire(response?.response || "Approved!", "", "success");
        window.location.reload();
      },
      (error) => {
        // Show error message if the approval fails
        this.handleError(error);
      }
    );
  }

  // Method to handle errors
  handleError(error: any): void {
    // Display a custom error message using Swal
    Swal.fire("Error", error?.error || "An unexpected error occurred.", "error");
  }





  // Object to store rejection status and visibility for each applicationID
  rejectedData: { [applicationID: string]: { isVisible: boolean } } = {
  };

  // Function to toggle the visibility of the rejection textarea for a specific applicationID
  toggleReject(applicationID: string) {
    // If we already have data for this application, toggle visibility
    if (this.rejectedData[applicationID]) {
      this.rejectedData[applicationID].isVisible = !this.rejectedData[applicationID].isVisible;
    } else {
      // If no data exists for this application, create an entry with visibility enabled
      this.rejectedData[applicationID] = { isVisible: true };
    }
  }

//rehection model
  data = {
    rejectionStatus: 'Rejected: ',
    certiStatus: '-',
  }

  // Function to submit the rejection reason
  submitRejection(applicationID: string): void {
    // Display the confirmation dialog for rejection
    Swal.fire({
      title: "Are you sure you want to reject this application?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Reject",
      denyButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms rejection, call the service to reject the application
        this.rejectApplication(applicationID);
      } else if (result.isDenied) {
        // If user denies, show an informational message
        Swal.fire("Rejection Canceled", "", "info");
      }
    });
  }

  // Method to handle rejection API call
  rejectApplication(applicationID: string): void {
    this.service.rejectApplication(applicationID, this.data).subscribe(
      (response) => {
        // Show success message if rejection is successful
        Swal.fire("Rejected", "", "success");
        window.location.reload();
        console.log(response);  // Log the response for debugging
      },
      (error) => {
        // Show error message if the rejection fails
        this.handleErrorFromBackend(error);
      }
    );
  }

  // Method to handle errors
  handleErrorFromBackend(error: any): void {
    // Display a custom error message using Swal
    Swal.fire("Error", error?.error || "An unexpected error occurred.", "error");
  }

  logout() {
    this.authService.logout();
  }




}

