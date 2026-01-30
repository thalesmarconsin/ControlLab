import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { DashboardService } from '../../core/dashboard/dashboard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent {
  vm$: Observable<any>;

  constructor(private dashboard: DashboardService) {
    this.vm$ = this.dashboard.getDashboard();
  }


  badgeTonePriority(p: 'Baixa'|'Média'|'Alta') {
    return p === 'Alta' ? 'bad' : p === 'Média' ? 'warn' : 'muted';
  }
  badgeToneTicketStatus(s: 'Aberto'|'Em andamento'|'Aguardando'|'Resolvido') {
    if (s === 'Resolvido') return 'good';
    if (s === 'Em andamento') return 'brand';
    if (s === 'Aguardando') return 'warn';
    return 'bad';
  }
  badgeToneReservation(s: 'Confirmada'|'Pendente'|'Cancelada') {
    if (s === 'Confirmada') return 'good';
    if (s === 'Pendente') return 'warn';
    return 'bad';
  }
}
