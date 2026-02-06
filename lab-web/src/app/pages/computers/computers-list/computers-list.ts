import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ComputersService, Computer } from '../../../core/computers/computer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-computers-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink],
  templateUrl: './computers-list.html',
  styleUrls: ['./computers-list.scss'],
})
export class ComputersList {
  private computersService = inject(ComputersService);

  computers$: Observable<Computer[]> = this.computersService.list();

  refresh() {
    this.computers$ = this.computersService.list();
  }

  statusLabel(status: Computer['status']) {
    if (status === 'active') return 'Ativo';
    if (status === 'maintenance') return 'Manutenção';
    return 'Baixado';
  }

  async deleteComputer(c: Computer) {
    const ok = confirm(`Excluir ${c.asset_tag}?`);
    if (!ok) return;

    this.computersService.remove(c.id).subscribe({
      next: () => this.refresh(),
      error: () => alert('Não foi possível excluir o computador.'),
    });
  }
}
