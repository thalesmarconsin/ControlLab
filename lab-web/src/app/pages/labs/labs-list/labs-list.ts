import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LabsService, Lab } from '../../../core/labs/labs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-labs-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink],
  templateUrl: './labs-list.html',
  styleUrls: ['./labs-list.scss'],
})
export class LabsList {
  private labsService = inject(LabsService);

  labs$: Observable<Lab[]> = this.labsService.list();

  refresh() {
    this.labs$ = this.labsService.list();
  }

  async deleteLab(lab: Lab) {
    const ok = confirm(`Deseja excluir o laboratório "${lab.name}"?`);
    if (!ok) return;

    this.labsService.remove(lab.id);
    this.refresh();
  }
}
