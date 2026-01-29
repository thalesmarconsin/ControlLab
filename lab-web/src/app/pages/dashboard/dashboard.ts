import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  user: any = null;
  error = '';

  constructor(private auth: AuthService) {}

  loadMe() {
    this.error = '';
    this.auth.me().subscribe({
      next: (u) => (this.user = u),
      error: (err) => (this.error = err?.error?.message ?? 'Erro ao buscar /me'),
    });
  }

  logout() {
    this.auth.logout();
    this.user = null;
  }
}
