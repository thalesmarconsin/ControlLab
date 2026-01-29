import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/auth/auth';
import { NotifyService } from '../../core/notify/notify.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './register.html',
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  error = '';
  loading = false;

  constructor(
    private auth: AuthService,
    private notify: NotifyService,
    private router: Router
  ) {}

  private setError(msg: string) {
    this.error = msg;
    this.notify.error(msg);
  }

  submit() {
    this.error = '';

    // validação front
    if (!this.name.trim()) return this.setError('Informe seu nome.');
    if (!this.email.trim() || !this.email.includes('@')) return this.setError('Informe um email válido.');
    if (!this.password || this.password.length < 6) return this.setError('A senha deve ter pelo menos 6 caracteres.');
    if (this.password !== this.confirmPassword) return this.setError('As senhas não conferem.');

    this.loading = true;

    this.auth.register(this.name.trim(), this.email.trim(), this.password).subscribe({
      next: () => {
        // IMPORTANTE: você pediu para voltar para login para o usuário logar.
        this.notify.success('Conta criada! Agora faça login.');
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        // Laravel 422: errors: { field: [msgs] }
        const errors = err?.error?.errors;
        if (errors) {
          const msg = Object.values(errors).flat().join(' | ');
          this.error = msg;
          this.notify.error(msg);
        } else {
          const msg = err?.error?.message ?? 'Erro ao cadastrar.';
          this.error = msg;
          this.notify.error(msg);
        }
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }
}
