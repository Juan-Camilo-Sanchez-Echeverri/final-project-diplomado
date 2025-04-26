import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      FontAwesomeModule,
      ReactiveFormsModule,
      HttpClientModule,
      BrowserAnimationsModule, // Requerido por ngx-toastr
      ToastrModule.forRoot({
        positionClass: 'toast-top-right', // Posición de las notificaciones
        timeOut: 3000, // Duración de las notificaciones
        closeButton: true, // Mostrar botón de cierre
        progressBar: true, // Mostrar barra de progreso
      })
    ),
  ],
};
