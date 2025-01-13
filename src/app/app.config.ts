import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AuthInterceptor} from './compo/Security/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), 
  importProvidersFrom(HttpClientModule),
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  //  {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor2,multi: true, },
   provideHttpClient(withFetch()),
  ]
};
