import { Component } from '@angular/core';
import { CertificateService } from '../../Mservice/certificate.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Security/auth.service';
import Swal from 'sweetalert2';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-change-username',
  standalone: true,
  imports: [FormsModule,
    CommonModule],
  templateUrl: './change-username.component.html',
  styleUrl: './change-username.component.css'
})
export class ChangeUsernameComponent {


  model = {
    oldUsername: localStorage.getItem('Id'),
    oldPassword: '',
    newUsername: ''
  }

  constructor(private service: CertificateService, private authService: AuthService,private appCompo:AppComponent) { }



  updateUsername() {

    this.appCompo.isLoading=true;

    this.service.changeUsername(this.model).subscribe(
      (response: string) => {

        this.appCompo.isLoading=false;

        localStorage.removeItem('Id');
        localStorage.setItem('Id', response);

        Swal.fire({
          title: 'Username Updated',
          text: `Username is successfully updated to: ${response}`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(a => {
          if (a.isConfirmed) {
            Swal.fire({
              title: 'Re-login Required',
              text: `Please re-login with this ID: ${response}`,
              icon: 'info',
              confirmButtonText: 'OK'
            }).then(a => {
              if (a.isConfirmed) {
                this.authService.logout();
              }
            }
            );
          }
        }
        );
      },
      (error) => {

        this.appCompo.isLoading=false;

        const errorMessage = error?.error || error?.error?.message || error?.message || 'An error occurred during the username update';

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
