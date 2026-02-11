import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,

    canActivate: [authGuard],
  },

  { path: 'labs', loadComponent: () => import('./pages/labs/labs-list/labs-list').then(m => m.LabsList) },
  { path: 'labs/new', loadComponent: () => import('./pages/labs/labs-form/labs-form').then(m => m.LabsForm) },
  { path: 'labs/:id/edit', loadComponent: () => import('./pages/labs/labs-form/labs-form').then(m => m.LabsForm) },
  
  { path: 'computers', loadComponent: () => import('./pages/computers/computers-list/computers-list').then(m => m.ComputersList) },
  { path: 'computers/new', loadComponent: () => import('./pages/computers/computers-form/computers-form').then(m => m.ComputersForm) },
  { path: 'computers/:id/edit', loadComponent: () => import('./pages/computers/computers-form/computers-form').then(m => m.ComputersForm) },

  { path: 'equipments', loadComponent: () => import('./pages/equipments/equipments-list/equipments-list').then(m => m.EquipmentsList) },
  { path: 'equipments/new', loadComponent: () => import('./pages/equipments/equipments-form/equipments-form').then(m => m.EquipmentsForm) },
  { path: 'equipments/:id/edit', loadComponent: () => import('./pages/equipments/equipments-form/equipments-form').then(m => m.EquipmentsForm) },


  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];
