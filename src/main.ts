import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { ConfirmationService } from 'primeng/api'
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    ConfirmationService
  ],
})
.catch((err) => console.error(err));
