import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ComputersService, Computer, ComputerStatus } from '../../../core/computers/computer.service';
import { LabsService, Lab } from '../../../core/labs/labs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-computers-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './computers-form.html',
  styleUrls: ['./computers-form.scss'],
})
export class ComputersForm {
  private fb = inject(FormBuilder);
  private computersService = inject(ComputersService);
  private labsService = inject(LabsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id: number | null = null;
  loading = false;
  error: string | null = null;

  labs$: Observable<Lab[]> = this.labsService.list();

  statuses: { value: ComputerStatus; label: string }[] = [
    { value: 'active', label: 'Ativo' },
    { value: 'maintenance', label: 'Manutenção' },
    { value: 'retired', label: 'Baixado' },
  ];

  form = this.fb.group({
    laboratory_id: [null as number | null, [Validators.required]],
    asset_tag: ['', [Validators.required, Validators.maxLength(50)]],
    hostname: [''],
    cpu: [''],
    ram_gb: [null as number | null],
    storage_gb: [null as number | null],
    os: [''],
    status: ['active' as ComputerStatus, [Validators.required]],
    notes: [''],
  });

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;

    if (this.id) {
      this.loading = true;

      this.computersService.get(this.id).subscribe({
        next: (c) => {
          this.form.patchValue({
            laboratory_id: c.laboratory_id,
            asset_tag: c.asset_tag,
            hostname: c.hostname ?? '',
            cpu: c.cpu ?? '',
            ram_gb: c.ram_gb ?? null,
            storage_gb: c.storage_gb ?? null,
            os: c.os ?? '',
            status: c.status,
            notes: c.notes ?? '',
          });
          this.loading = false;
        },
        error: () => {
          this.error = 'Não foi possível carregar o computador.';
          this.loading = false;
        },
      });
    }
  }

  submit() {
    this.error = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const payload = this.form.getRawValue() as any;

    const req$ = this.id
      ? this.computersService.update(this.id, payload)
      : this.computersService.create(payload);

    req$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/computers');
      },
      error: (err) => {
        this.loading = false;
        // Se for 422, o backend manda "errors" por campo (depois a gente melhora UX)
        this.error = err?.status === 422 ? 'Validação: verifique os campos.' : 'Falha ao salvar.';
      },
    });
  }
}
