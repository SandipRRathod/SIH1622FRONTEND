import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CertificateService } from '../Mservice/certificate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent {

  data={
    userFName:'',
    userEmail:'',
    userMN:'',
    subject:'',
    massage:''
  }

  constructor(private service :CertificateService,private snackBar:MatSnackBar,private appCompo:AppComponent){
   
    this.service.getUser().subscribe(
      (data)=>{
        this.data.userFName=data.userName;
        this.data.userEmail=data.userEmail;
        this.data.userMN=data.userMob;
       });
      
    
      
  }

  Send(){
    this.appCompo.isLoading=true;
    this.service.sendFeedback(this.data).subscribe(
      response=>{
        this.appCompo.isLoading=false;
        this.snackBar.open(response, "X", {
          duration: 7000,               // Adjust duration as needed
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: [`snackbar`]
        }).onAction().subscribe(() => {
          window.location.reload();     // Reload the page when "X" is clicked
        });
      },
      error=>{
        this.appCompo.isLoading=false;
        this.snackBar.open(error?.error, "X", {
          duration: 7000,               // Adjust duration as needed
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: [`snackbar`]
        }).onAction().subscribe(() => {
          window.location.reload();     // Reload the page when "X" is clicked
        });
      }
    );
  }
}
