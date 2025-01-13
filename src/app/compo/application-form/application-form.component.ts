
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient
import { __values } from 'tslib';
import { PdetailsComponent } from '../pdetails/pdetails.component';
import { CertificateService } from '../Mservice/certificate.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgIf,
    ReactiveFormsModule,
    MatDatepickerModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    MatProgressSpinnerModule
  ],
  providers: [provideNativeDateAdapter(), PdetailsComponent],
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {


  isOk: boolean = false;

  //progress spinner condition
  isLoading: boolean = false;

  //array for files to be stored in backend 
  files: File[] = [];

  // Declared a FormGroup named certificateForm to manage a group of form controls
  certificateForm: FormGroup;

  //this is for dynamic selecetion of certificate name
  selected: any = ""

  // Properties to store selected file names
  identityProofFileName: string = '';
  addressProofFileName: string = '';
  proofOfIncomeFileName: string = '';
  affidavitFileName: string = '';
  birthOrTcFileName: string = '';
  casteProofFileName: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private al: PdetailsComponent, private service: CertificateService, private router: Router, private cdRef: ChangeDetectorRef,private appCompo:AppComponent) {
    this.certificateForm = this.fb.group({
      certificateType: ['-'],
      identityProof: [null],
      addressProof: [null],
      proofOfIncome: [null],
      affidavit: [null],
      proofOfResidence: [null],
      casteProof: [null],
      birthOrTc: [null],

    });
   
  }





//method for onCertificateTypeChange then change the files name to be submited with application dynamicaly
  onCertificateTypeChange(event: any) {

    const selectedType = event.value || event.target.value;
    this.selected = selectedType;
    // Reset the file inputs when the certificate type changes
    this.certificateForm.patchValue({
      identityProof: null,
      addressProof: null,
      proofOfIncome: null,
      affidavit: null,
      proofOfResidence: null,
      casteProof: null,
      birthOrTc: null,
    });
  }



//for files
  onFileSelected(event: any, type: string): void {
    const file: File = event.target.files[0];

    if (file) {

      switch (type) {
        case 'identityProof':
          this.identityProofFileName = file.name;
          break;
        case 'addressProof':
          this.addressProofFileName = file.name;
          break;
        case 'proofOfIncome':
          this.proofOfIncomeFileName = file.name;
          break;
        case 'affidavit':
          this.affidavitFileName = file.name;
          break;
        case 'birthOrTc':
          this.birthOrTcFileName = file.name;
          break;
        case 'casteProof':
          this.casteProofFileName = file.name;
          break;
      }
      this.files.push(file);
    }
  }



  // Dynamic getter for `income`
  get income(): boolean {
    return (
      this.selected === 'Income' &&
      this.identityProofFileName !== '' &&
      this.proofOfIncomeFileName !== '' &&
      this.addressProofFileName !== ''
    );
  }

  // Dynamic getter for `caste`
  get caste(): boolean {
    return (
      this.selected === 'Caste' &&
      this.identityProofFileName !== '' &&
      this.birthOrTcFileName !== '' &&
      this.addressProofFileName !== '' &&
      this.casteProofFileName !== ''
    );
  }

  //// Dynamic getter for `anad`
  get anad(): boolean {
    return (
      this.selected == 'Age Nationality and Domicile Certificate' &&
      this.identityProofFileName != '' &&
      this.birthOrTcFileName != '' &&
      this.addressProofFileName != ''
    );
  }


  //respone array for files uri from backend 
  reponse: any[] = []

//method for uploading files before the application
  onUpload() {
    
    const formData: FormData = new FormData();

    this.files.forEach(element => {
      formData.append('files', element)
    });

    this.appCompo.isLoading=true;
    // Send the file to the backend
    this.service.uploadFiles(formData).subscribe(
      (response: string[]) => {
        this.appCompo.isLoading=false;
        console.log('Success:', response);
        alert("Uploded Succesfully..")
        this.reponse.push(response)

        // Use the file URIs returned from the backend Of Income
        if (this.selected == "Income") {
          this.IncomeData.identityProof = response[0];
          this.IncomeData.addressProof = response[1];
          this.IncomeData.proofOfIncome = response[2];
        }

        // Use the file URIs returned from the backend Of Caste
        if (this.selected == "Caste") {
          this.CasteData.identityProof = response[0];
          this.CasteData.addressProof = response[1];
          this.CasteData.birthProof = response[2];
          this.CasteData.casteProof = response[3];
        }

        // Use the file URIs returned from the backend Of ANAD
        if (this.selected == "Age Nationality and Domicile Certificate") {
          this.ANADdata.identityProof = response[0];
          this.ANADdata.addressProof = response[1];
          this.ANADdata.birthProof = response[2];
        }

      },
      (error) => {
        console.error('Error:', error);
      }
    );

this.isOk=true;
  }


  //dynamic years for income anual income 
  currentYear: number = new Date().getFullYear();
  academicYear3: string = `${this.currentYear - 3}-${this.currentYear - 2}`;
  academicYear2: string = `${this.currentYear - 2}-${this.currentYear - 1}`;
  academicYear1: string = `${this.currentYear - 1}-${this.currentYear}`;

//model for income application
  IncomeData = {
    certiName: this.selected,
    incomeFor: '-',
    relation: '-',
    solutation: '-',
    annualThirdIncome:'',
    annualsecondIncome:'',
    annualIncome:'',
    benificaryName: '',
    certiReasion: '-',
    farmaccHolderName: '',
    farmArea: '',
    area: '-',
    identityProof: '',
    addressProof: '',
    proofOfIncome: '',
    certiStatus: 'In Process',
    paymentStatus: 'Not Paid',
    registerdId: localStorage.getItem('Id')
  }


//model for caste application
  CasteData = {
    relation: '-',
    solutation: '-',
    benificaryName: '',
    certiName: this.selected,
    casteType: '-',
    certiStatus: 'In Process',
    paymentStatus: 'Not Paid',
    gender: '-',
    identityProof: '',
    addressProof: '',
    casteProof: '',
    birthProof: '',
    registerdId: localStorage.getItem('Id')
  }

  //model for anad application
  ANADdata = {
    identityProof: '',
    addressProof: '',
    birthProof: '',
    certiName: this.selected,
    certiType: '-',
    relation: '-',
    solutation: '-',
    certiStatus: 'In Process',
    benificaryName: '',
    certiReasion: '-',
    residingSince: '-',
    paymentStatus: 'Not Paid',
    registerdId: localStorage.getItem('Id')
  }


  ngOnInit(): void {
    this.service.getUser().subscribe(
      (data) => {
        localStorage.setItem('data', JSON.stringify(data)); //setting user deatils for user 
      }
    );
  }


//method for form submition of application
  onSubmit(): void {

    this.appCompo.isLoading = true;

    const postIncomeData = {
      ...this.IncomeData,
      certiName: this.selected //readding Otherdetails if not added 
    };


    //if selcetd in income should be call this.service.applyForIncome method from main service
    if (this.selected == "Income") {
      console.log(postIncomeData)
      this.service.applyForIncome(postIncomeData).subscribe(
        (response) => {
          this.appCompo.isLoading = false;
          this.showSucces(this.selected, response);
        },
        (error) => {
          this.appCompo.isLoading=false;
          this.showError(error?.error);
        })
    }

    const postCasteData = {
      ...this.CasteData,
      certiName: this.selected             //readding Otherdetails if not added
    };

      //if selcetd in income should be call this.service.applyForCaste method from main service
    if (this.selected == "Caste") {
      this.service.applyForCaste(postCasteData).subscribe(
        (response) => {
          this.appCompo.isLoading=false;
          this.showSucces(this.selected, response);
        },
        (error) => {
          this.appCompo.isLoading=false;
          this.showError(error?.error);
        })
    }

    const postDomecileData = {
      ...this.ANADdata,
      certiName: this.selected
    };


          //if selcetd in income should be call this.service.applyForANAD method from main service

    if (this.selected == "Age Nationality and Domicile Certificate") {

      this.service.applyForANAD(postDomecileData).subscribe(
        (response) => {
          this.appCompo.isLoading=false;
          this.showSucces(this.selected, response);
        },
        (error) => {
          this.appCompo.isLoading=false;
          this.showError(error?.error);
        })
    }
  }

  //sweet alert for succes 
  showSucces(certiName: string, id: string) {
    Swal.fire({
      title: "You Have Succesfully Applied For " + certiName + " Certificate This Is Your Application Id " + id,
      text: "Redirecting To Profile....",
      icon: "success",
      timer: 15000,
      timerProgressBar: true
    }).then(result => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        this.router.navigate(['/profile']);
      }
    }
    );
  }

   //sweet alert for error 
  showError(eror:string){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: eror || "Something went wrong!",
    }).then(a=>{
      
    });
  }


}

