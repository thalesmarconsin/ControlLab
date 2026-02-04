import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LabsService } from '../../../core/labs/labs';

@Component({
  selector: 'app-labs-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './labs-form.html',
  styleUrls: ['./labs-form.scss'],
})
export class LabsForm {
  private fb = inject(FormBuilder);
  private labsService = inject(LabsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id: number | null = null;
  loading = false;
  error: string | null = null;

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
    location: [''],
    capacity: [0, [Validators.min(0), Validators.max(500)]],
    active: [true],
  });

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;

    if (this.id) {
      this.loading = true;

      this.labsService.get(this.id).subscribe({
        next: (lab) => {
          this.form.patchValue({
            name: lab.name,
            location: lab.location ?? '',
            capacity: lab.capacity ?? 0,
            active: lab.active,
          });
          this.loading = false;
        },
        error: () => {
          this.error = 'Não foi possível carregar o laboratório.';
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

    const rawValue = this.form.getRawValue();
    const payload = Object.fromEntries(
      Object.entries(rawValue).map(([key, value]) => [key, value ?? undefined])
    );

    const req$ = this.id
      ? this.labsService.update(this.id, payload)
      : this.labsService.create(payload);

    req$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/labs');
      },
      error: () => {
        this.loading = false;
        this.error = 'Falha ao salvar. Verifique os campos.';
      },
    });
  }
}
