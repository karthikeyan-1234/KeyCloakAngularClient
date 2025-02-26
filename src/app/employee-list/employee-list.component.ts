import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { KeycloakService } from '../keycloak.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true, // Standalone component
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {
    this.initializeKeycloak();
  }

  async initializeKeycloak() {
    await this.keycloakService.init();
  }

  ngOnInit() {


    if(this.keycloakService.isLoggedIn()) {
    }


    var token = this.keycloakService.getToken();
    this.http.get('https://localhost:7289/api/Employee', { headers: { Authorization: `Bearer ${token}` } }).subscribe((data: any) => this.employees = data);
  }

  logout() {
    this.keycloakService.logout();
  }
}
