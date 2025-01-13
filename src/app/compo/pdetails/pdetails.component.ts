import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { CertificateService } from '../Mservice/certificate.service';

@Component({
  selector: 'app-pdetails',
  standalone: true,
  imports: [MatIcon,MatFormField,MatInput,MatLabel,MatDatepickerModule,MatSelect,MatOption],
  providers: [provideNativeDateAdapter()],
  templateUrl: './pdetails.component.html',
  styleUrl: './pdetails.component.css'
})
export class PdetailsComponent  {

  //profilr data to be shown for user 
  profileData: any={};


  constructor(private service :CertificateService){
 
   
    const userEmailOrPhone=localStorage.getItem('Id')
    if (userEmailOrPhone) {

      //method for backend data retrivel
      this.service.getUser().subscribe(
        (data)=>{
          this.profileData=data;
         });
    } else {
      console.log("not found")
    }
  }


  




}
