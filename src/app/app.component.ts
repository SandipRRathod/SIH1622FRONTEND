import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CertificateListComponent } from './compo/certificate-list/certificate-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ApplicationFormComponent } from './compo/application-form/application-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CertificateService } from './compo/Mservice/certificate.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AuthInterceptor } from './compo/Security/auth.interceptor';
import { AuthService } from './compo/Security/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditPDComponent } from './compo/subCompo/edit-pd/edit-pd.component';
import { FooterComponent } from './compo/footer/footer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    RouterLink,
    CertificateListComponent,
    NgFor, HttpClientModule,
    ApplicationFormComponent,
    EditPDComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    NgIf, MatFormFieldModule, FooterComponent, MatSnackBarModule,CommonModule,MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [CertificateService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})

export class AppComponent {
  title = 'Certificate';

  
  isLoading: boolean = false;



  @ViewChild('drawer') drawer!: MatDrawer;

  drawerMode: MatDrawerMode = 'over';
  draweropend = false;
  isAuthenticated = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router) {
    // Check authentication status
    this.authService.isAuthenticated().subscribe((authStatus) => {
      this.isAuthenticated = authStatus;
    });

    // Responsive drawer mode
    this.breakpointObserver.observe('(min-width:200px) and (max-width: 480px)').subscribe((result: BreakpointState) => {
      this.drawerMode = result.matches ? 'over' : 'side';
      this.draweropend = result.matches ? false : true;
    });


  }

  logout() {
    this.authService.logout();
  }

  toggleDrawer(drawer: any) {
    if (this.isAuthenticated) {
      this.drawer.toggle();
    } else {
      Swal.fire({
        title: 'Authentication Required!',
        text: 'You Must Be Logged In As User To Access This Page.',
        icon: 'error',
        confirmButtonText: 'Login',
        timer: 15000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });
    }
  }



}

