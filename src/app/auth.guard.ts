import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { KeycloakService } from './keycloak.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const keycloakService = inject(KeycloakService);

  await keycloakService.init(); // ✅ Ensure Keycloak is initialized before checking token

  if (!keycloakService.getToken()) {
    console.warn('AuthGuard: User not authenticated. Redirecting to login.');
    keycloakService.login(); // Safe call since Keycloak is initialized in `main.ts`
    return false;
  }

  return true;
};
