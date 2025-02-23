import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { tokenInterceptor } from './app/token.interceptor';
import { KeycloakService } from './app/keycloak.service';


  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes),
      provideHttpClient(withInterceptors([tokenInterceptor])),
      KeycloakService
    ]
  }).catch(err => console.error('Bootstrap failed to initialize:', err));
