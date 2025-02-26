import Keycloak from 'keycloak-js';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class KeycloakService {
  private keycloak!: Keycloak;
  private initialized = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.keycloak = new Keycloak({
        url: 'http://localhost:8080/',
        realm: 'MyRealm',
        clientId: 'angular-app',
      });
    }
  }

  async init(): Promise<void> {
    if (this.initialized || !isPlatformBrowser(this.platformId)) return;

    try {    
      await this.keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false, // Prevents CSP errors
        scope: 'angular-client-scope',
      }
      );
      this.initialized = true;
    } catch (error) {
      console.error('Keycloak initialization failed', error);
    }
  }

  /** ✅ New method to check if Keycloak is ready */
  isInitialized(): boolean {
    return this.initialized;
  }

  login(): void {
    if (!this.initialized) {
      console.error('KeycloakService [Login]: Keycloak is not initialized.');
      return;
    }
    this.keycloak.login().catch(err => console.error('Login failed:', err));
  }

  logout(): void {
    if (!this.initialized) {
      console.error('Keycloak is not initialized.');
      return;
    }
    this.keycloak.logout().catch(err => console.error('Logout failed:', err));
  }

  getToken(): string | null {
    if (!this.initialized) {
      console.error('KeycloakService [getToken]: Keycloak is not initialized.');
      return null;
    }
    return this.keycloak.token || null;
  }

  isLoggedIn(): boolean | undefined {
    if (!this.initialized) {
      console.error('KeycloakService [isLoggedIn]: Keycloak is not initialized.');
      return false;
    }
    return this.keycloak.authenticated;
  }
}
