import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EquipmentsService, Equipment } from '../../../core/equipments/equipments.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-equipments-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink],
  templateUrl: './equipments-list.html',
  styleUrls: ['./equipments-list.scss'],
})
export class EquipmentsList {
  private equipmentsService = inject(EquipmentsService);

  equipments$: Observable<Equipment[]> = this.equipmentsService.list();

  refresh() {
    this.equipments$ = this.equipmentsService.list();
  }

  statusLabel(s: Equipment['status']) {
    if (s === 'active') return 'Ativo';
    if (s === 'maintenance') return 'Manutenção';
    return 'Baixado';
  }

  deleteEquipment(e: Equipment) {
    const ok = confirm(`Excluir equipamento ${e.asset_tag}?`);
    if (!ok) return;

    this.equipmentsService.remove(e.id).subscribe({
      next: () => this.refresh(),
      error: () => alert('Não foi possível excluir o equipamento.'),
    });
  }
}
