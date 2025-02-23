import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { EmployeeListComponent } from './employee-list/employee-list.component';

export const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'employees' }
];