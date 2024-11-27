import { enableProdMode, importProvidersFrom } from '@angular/core';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, MatToolbarModule),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(APP_ROUTES, withPreloading(PreloadAllModules))
    ]
})
  .catch(err => console.error(err));
