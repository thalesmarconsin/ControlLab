import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/auth/auth';
import { NotifyService } from '../../core/notify/notify.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './login.html',
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private notify: NotifyService,
    private router: Router
  ) {}

  submit() {
    this.error = '';

    // validação simples (front)
    if (!this.email.trim() || !this.password.trim()) {
      this.error = 'Preencha email e senha.';
      this.notify.error(this.error);
      return;
    }
    if (!this.email.includes('@')) {
      this.error = 'Informe um email válido.';
      this.notify.error(this.error);
      return;
    }

    this.loading = true;

    this.auth.login(this.email.trim(), this.password).subscribe({
      next: () => {
        this.notify.success('Login realizado!');
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        // Laravel pode retornar message
        const msg = err?.error?.message ?? 'Falha ao entrar.';
        this.error = msg;
        this.notify.error(msg);
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }
}
