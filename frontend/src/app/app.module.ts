// frontend/src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import {  provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    // Estrategia de rutas de Ionic
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // HttpClient moderno + fetch + que lea los interceptores registrados por DI
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()
    ),

    // Nuestro interceptor de auth (Bearer)
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
