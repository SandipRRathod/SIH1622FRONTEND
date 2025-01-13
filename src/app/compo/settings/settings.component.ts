import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel, MatOption, MatSelect } from '@angular/material/select';
import { EditPDComponent } from '../subCompo/edit-pd/edit-pd.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../Security/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatFormField,MatSelect,MatLabel,MatOption,MatIcon,EditPDComponent,RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {


constructor( private authService: AuthService,private router:Router){}

//dynamic route for small screen mappad in html 
onNavigate(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const selectedValue = selectElement.value;

  if (selectedValue) {
    this.router.navigate([selectedValue]);
  }
}

logout(){
  this.authService.logout();
}

}
