import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EquipmentsService, Equipment, EquipmentStatus } from '../../../core/equipments/equipments.service';
import { LabsService, Lab } from '../../../core/labs/labs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-equipments-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './equipments-form.html',
  styleUrls: ['./equipments-form.scss'],
})
export class EquipmentsForm {
  private fb = inject(FormBuilder);
  private equipmentsService = inject(EquipmentsService);
  private labsService = inject(LabsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id: number | null = null;
  loading = false;
  error: string | null = null;

  labs$: Observable<Lab[]> = this.labsService.list();

  statuses: { value: EquipmentStatus; label: string }[] = [
    { value: 'active', label: 'Ativo' },
    { value: 'maintenance', label: 'Manutenção' },
    { value: 'retired', label: 'Baixado' },
  ];

  form = this.fb.group({
    laboratory_id: [null as number | null, [Validators.required]],
    asset_tag: ['', [Validators.required, Validators.maxLength(50)]],
    type: ['', [Validators.required, Validators.maxLength(80)]],
    brand: [''],
    model: [''],
    status: ['active' as EquipmentStatus, [Validators.required]],
    notes: [''],
  });

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;

    if (this.id) {
      this.loading = true;

      this.equipmentsService.get(this.id).subscribe({
        next: (e) => {
          this.form.patchValue({
            laboratory_id: e.laboratory_id,
            asset_tag: e.asset_tag,
            type: e.type,
            brand: e.brand ?? '',
            model: e.model ?? '',
            status: e.status,
            notes: e.notes ?? '',
          });
          this.loading = false;
        },
        error: () => {
          this.error = 'Não foi possível carregar o equipamento.';
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

    const payload = this.form.getRawValue() as Equipment;

    const req$ = this.id
      ? this.equipmentsService.update(this.id, payload)
      : this.equipmentsService.create(payload);

    req$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/equipments');
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.status === 422 ? 'Validação: verifique os campos.' : 'Falha ao salvar.';
      },
    });
  }
}
