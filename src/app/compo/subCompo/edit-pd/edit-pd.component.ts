import { Component } from '@angular/core';
import { AfterLoginComponent } from '../../after-login/after-login.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { MatSelect } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CertificateService } from '../../Mservice/certificate.service';
import { response } from 'express';
import { error } from 'console';
import Swal from 'sweetalert2';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-edit-pd',
  standalone: true,
  imports: [AfterLoginComponent,MatFormField,MatLabel,MatInputModule,MatDatepickerModule,MatIcon,MatSelect,MatOption,FormsModule,ReactiveFormsModule,MatInput,CommonModule,RouterLink],
  templateUrl: './edit-pd.component.html',
  styleUrl: './edit-pd.component.css',
  providers:[provideNativeDateAdapter()]
})
export class EditPDComponent  {

  username=localStorage.getItem('Id')
  model= {
    userName:'',
    fatherName:'',
    motherName:'',
    userAge: '',   
    userDob:'',
    userMob:'',
    userEmail:'',
    userGender:'',
    userCast:'',
    userAdhar:'',
    userPan:'',
    userNationlity:'',
    userOccup:'',
    userVillage:'',
    userDist:'',
    userTq:'',
    userState:'',
    userPincode: ''
  }
  
constructor(private service:CertificateService,private appCompo:AppComponent) {

  appCompo.isLoading=true;

  service.getUser().subscribe(
    (data)=>{
appCompo.isLoading=false;
      this.model=data;
     });

  if (this.username?.includes('@')) {
    this.model.userEmail=this.username
  } 
   if(this.username?.length==10){
    this.model.userMob=this.username
  }
  else{
    return;
  }
}



UpdateData() {

  this.appCompo.isLoading=true;

  this.service.updateUser(this.model).subscribe(
    response => {
      this.appCompo.isLoading=false;
      Swal.fire({
        title: 'Success!',
        text: 'Your data is updated!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    },
    error => {
      this.appCompo.isLoading=false;
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  );
}


}
