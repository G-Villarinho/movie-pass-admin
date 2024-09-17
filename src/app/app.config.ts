import { routes } from './app.routes';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { lucideIconsProviders } from '@core/configs/lucide-icons-providers.config';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpErrorInterceptor } from '@core/interceptors/http-error.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([AuthInterceptor, HttpErrorInterceptor])
        ),
        lucideIconsProviders,
        provideAnimationsAsync(),
    ],
};
