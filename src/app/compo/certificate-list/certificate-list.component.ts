import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../Mservice/certificate.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { PdetailsComponent } from '../pdetails/pdetails.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { response } from 'express';
import Swal from 'sweetalert2';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-certificate-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, PdetailsComponent],
  templateUrl: './certificate-list.component.html',
  styleUrl: './certificate-list.component.css'
})

export class CertificateListComponent implements OnInit {


  //columns for data to be shown 
  displayedColumns: string[] = ['column1', 'column2', 'column3', 'column4', 'column5'];


//datasource form backend geted
  dataSource: any[] = [];


  constructor(private certificateService: CertificateService, private http: HttpClient,private appCompo:AppComponent) {}

  ngOnInit() {
   
    const userEmailOrPhone =localStorage.getItem('Id'); // Get userEmailOrPhone from storage

    

    if (userEmailOrPhone) {

      //get all certificate of user all means alll rejected or approved
      this.certificateService.getCertificates().subscribe(
        (data: any) => {
          this.dataSource = data;
        },
        (error) => {
          console.error("Failed to fetch certificates:", error);
        }
      );
    } else {
      console.error("User email or phone is missing.");
    }
  }

//for downloading the approved certificate 
  download(id: string, name: string,certiname:string) {

    this.appCompo.isLoading=true;

    // Show loading alert while downloading
    Swal.fire({
      title: 'Downloading...',
      text: 'Your certificate is being downloaded. Please wait.',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  

    this.certificateService.downloadCertificate(id, name).subscribe(
      (response) => {
        this.appCompo.isLoading=false;
       
        // Created a new Blob object from the response, specifying that it's a PDF file
        const file = new Blob([response], { type: 'application/pdf' });

        // Generated a URL for the Blob object to be used as a downloadable link
        const fileURL = URL.createObjectURL(file);

        // Created a temporary anchor (<a>) element to trigger the download
        const a = document.createElement('a');

        a.href = fileURL; // Seted the anchor's href to the generated Blob URL

        a.download = `certificate-${id}.pdf`;  // Seted the filename for the download
  
        // Trigger the download by simulating a click on the anchor element
        a.click();
  
        // Close loading Swal and show success
        Swal.close();
        Swal.fire({
          title: 'Download Complete!',
          text: `Certificate ${certiname} has been downloaded successfully.`,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        this.appCompo.isLoading=false;
        // Handle errors
        console.error('Error generating certificate', error);
        
        // Close loading Swal and show error
        Swal.close();
        Swal.fire({
          title: 'Download Failed!',
          text: error?.error || 'An error occurred while downloading. Please try   again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
  
}
