import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../Security/auth.service';
import test from 'node:test';
import { text } from 'stream/consumers';
import { AppComponent } from '../../app.component';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  //api url for backend  depolyed api fro backend 
  private apiUrl = 'https://certificate-sih1622.up.railway.app/main';
  



  constructor(private http: HttpClient, private authService: AuthService) { }

  //------------------------------For User----------------------------------------------
  //starting from scratch

  //login for user
  login(data: { userEmailOrPhone: string; userPassword: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, data, { responseType: 'text' as 'json' });
  }

  //after login getting user details 
  getUser(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${localStorage.getItem('Id')}`);
  }

  //after login getting 
  //list of applied certificates 
  getCertificates(): Observable<any> {
    return this.http.get(`${this.apiUrl}/certificate/${localStorage.getItem('Id')}`);
  }

  //if not then registeer
  cardentials(data: any): Observable<any> {
    console.log("requesting")
    return this.http.post<any>(`${this.apiUrl}/register`, data, { responseType: 'text' as 'json' });
  }

  //after registeration saving user details
  saveUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/${localStorage.getItem('Id')}`, data, { responseType: 'text' as 'json' });
  }

  //if user Wants Update Or Edit Personal Details 
  updateUser(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${localStorage.getItem('Id')}`, data);
  }

  //comman for all applicatipon files apploading 
  uploadFiles(data: any): Observable<any> {
    return this.http.post<string[]>(`${this.apiUrl}/upload-multiple-files`, data);
  }

  //post application for user of income
  applyForIncome(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/income`, data, { responseType: 'text' as 'json' });
  }

  //post application for user of Caste
  applyForCaste(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/caste`, data, { responseType: 'text' as 'json' });
  }

  //post application for user of ANAD
  applyForANAD(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ANAD`, data, { responseType: 'text' as 'json' });
  }


  //Download Certificate If Apprved From Admin/Autority
  downloadCertificate(id: any, name: any): Observable<ArrayBuffer> {
    return this.http.get<ArrayBuffer>(`${this.apiUrl}/genrate/${id}?name=${name}`, {
      responseType: 'arraybuffer' as 'json' // Type assertion workaround
    });
  }


  // -------------------------------------track Application-----------------------------------

  //tracking status
  trackApplication(trackingId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/certificate/track/${trackingId}`);
  }

  //---------------------------------Admin Pannel--------------------------------------------------
  //if user is admin 
  loginAdmin(data: { userEmailOrPhone: string; userPassword: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate-Admin`, data, { responseType: 'text' as 'json' });
  }

  //getAll Income Application for admin
  getAllIncome(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/INCM-Applications`);
  }

  //gatAll Caste Applications for admin
  getAllCaste(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/caste-Applications`);
  }

  //gatAll ANAD Applications for admin
  getAllANAD(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ANAD-Applications`);
  }

  getdetails(id:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getADetails/${id}`);
  }

  //For approving the application by admin
  approveApplication(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/status/${id}`, data, { responseType: 'text' as 'json' });
  }

  //For Rejecting the application by admin
  rejectApplication(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/status/${id}`, data, { responseType: 'text' as 'json' });
  }



  //-----------------------------------------Change Cardentials------------------------------------------

  changePass(data:any):Observable<any>{
return this.http.post<any>(`${this.apiUrl}/changepassword`,data,{ responseType: 'text' as 'json' });
  }


  changeUsername(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/changeusername`,data,{responseType:'text'as'json'});
  }

  //---------------------------------Feedback / complainet---------------------------

  sendFeedback(data:any):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/feedback/${localStorage.getItem('Id')}`,data,{responseType:'text' as 'json'});
  }
}
