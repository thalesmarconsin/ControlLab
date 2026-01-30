import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthService } from '../../core/auth/auth';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass],
  templateUrl: './shell.html',
  styleUrls: ['./shell.scss'],
})
export class ShellComponent {
  collapsed = false;

  constructor(public auth: AuthService) {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  logout() {
    this.auth.logout(); // logout local; se tiver endpoint, chama também
    // você pode navegar pra /login aqui se quiser
    window.location.href = '/login';
  }
}
