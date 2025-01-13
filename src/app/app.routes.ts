import { Routes } from '@angular/router';
import { ApplicationFormComponent } from './compo/application-form/application-form.component';

import { CertificateListComponent } from './compo/certificate-list/certificate-list.component';
import { CertificateTrackingComponent } from './compo/certificate-tracking/certificate-tracking.component';
import { HelpComponent } from './compo/help/help.component';
import { SettingsComponent } from './compo/settings/settings.component';
import { EditPDComponent } from './compo/subCompo/edit-pd/edit-pd.component';
import { ChangePassComponent } from './compo/subCompo/change-pass/change-pass.component';
import { ChangeUsernameComponent } from './compo/subCompo/change-username/change-username.component';
import { AfterLoginComponent } from './compo/after-login/after-login.component';
import { LoginComponent } from './compo/login/login.component';
import { RegisterComponent } from './compo/register/register.component';
import { authGuard, authGuardAdmin, noAuthGuard } from './compo/Security/auth.guard';
import { AdminComponent } from './compo/admin/admin.component';
import { BeforeLoginComponent } from './compo/before-login/before-login.component';


export const routes: Routes = [

    //firts page for new user
    {
        path: "",
        component:BeforeLoginComponent,
        pathMatch: "full",
    },

    //route for login to user
    {
        path: "login",
        component: LoginComponent,
        pathMatch: "full",
        canActivate:[noAuthGuard]              // Prevent authenticated users from accessing
    },

    //route for registering new user with cardentials
    {
        path: "register",
        component: RegisterComponent,
        pathMatch: "full",
        canActivate:[noAuthGuard]
    },

    //route for change username to user
    {
        path: "changeusername",
        component: ChangeUsernameComponent,
        pathMatch: "full",
    },

    //route for change password for user
    {
        path: "changepass",
        component: ChangePassComponent,
        pathMatch: "full",
    },

    //route for afte login adding personal details
    {
        path: "main",
        component: AfterLoginComponent,
        pathMatch: "full",
        canActivate: [authGuard],  // if user is authenticated then only can acces this features 
    },

    //route for user profile or personal details
    {
        path: "profile",
        component: CertificateListComponent,
        pathMatch: "full",
        canActivate: [authGuard]
    },

    //route for new application to user
    {
        path: "apply",
        component: ApplicationFormComponent,
        pathMatch: "full",
        // canActivate: [authGuard]
    },

    //route for tracking application to user 
    {
        path: "track",
        component: CertificateTrackingComponent,
        pathMatch: "full",
        canActivate: [authGuard]
    },

//route for settings to user 
    {
        path: "settings",
        component: SettingsComponent,
        pathMatch: "full",
        canActivate: [authGuard]
    },

    //route for Help to user like giving feedback and all
    {
        path: "help",
        component: HelpComponent,
        pathMatch: "full",
        canActivate: [authGuard]
    },

    //route for Edit user Personal details
    {
        path: "edit",
        component: EditPDComponent,
        pathMatch: "full",
        canActivate: [authGuard]
    },

    //route for adminlogin
    {
        path: "Admin",
        component: AdminComponent,
        pathMatch: "full",
     canActivate: [authGuardAdmin]
    },
];


export class AppRoutingModule { }
