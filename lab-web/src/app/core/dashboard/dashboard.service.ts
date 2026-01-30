import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export type Kpi = { label: string; value: number; hint?: string; tone?: 'good'|'warn'|'bad'|'brand'|'muted' };

export type Ticket = {
  id: string;
  title: string;
  lab: string;
  priority: 'Baixa' | 'Média' | 'Alta';
  status: 'Aberto' | 'Em andamento' | 'Aguardando' | 'Resolvido';
  assignedTo?: string;
  updatedAt: string;
};

export type Reservation = {
  id: string;
  lab: string;
  course: string;
  teacher: string;
  time: string;
  status: 'Confirmada' | 'Pendente' | 'Cancelada';
};

export type DashboardData = {
  kpis: Kpi[];
  alerts: { tone: 'warn'|'bad'|'info'; title: string; msg: string }[];
  tickets: Ticket[];
  reservations: Reservation[];
};

@Injectable({ providedIn: 'root' })
export class DashboardService {
  getDashboard(): Observable<DashboardData> {
    return of({
      kpis: [
        { label: 'Computadores ativos', value: 48, hint: 'em operação', tone: 'good' },
        { label: 'Em manutenção', value: 6, hint: 'priorizar', tone: 'warn' },
        { label: 'Chamados abertos', value: 9, hint: 'últimos 7 dias', tone: 'brand' },
        { label: 'Reservas hoje', value: 4, hint: 'agenda', tone: 'muted' },
      ],
      alerts: [
        { tone: 'warn', title: 'Atualizações pendentes', msg: '3 máquinas com updates atrasados.' },
        { tone: 'bad', title: 'Manutenção atrasada', msg: '1 PC está há 7+ dias em manutenção.' },
      ],
      tickets: [
        { id: 'CH-1029', title: 'PC não liga', lab: 'Lab 02', priority: 'Alta', status: 'Aberto', assignedTo: '—', updatedAt: '10:22' },
        { id: 'CH-1026', title: 'Teclado falhando', lab: 'Lab 01', priority: 'Média', status: 'Em andamento', assignedTo: 'Carlos', updatedAt: '09:58' },
        { id: 'CH-1023', title: 'Internet instável', lab: 'Lab 03', priority: 'Média', status: 'Aguardando', assignedTo: 'Fernanda', updatedAt: '09:12' },
        { id: 'CH-1018', title: 'Monitor piscando', lab: 'Lab 02', priority: 'Baixa', status: 'Resolvido', assignedTo: 'Carlos', updatedAt: 'Ontem' },
      ],
      reservations: [
        { id: 'RS-210', lab: 'Lab 01', course: 'Algoritmos I', teacher: 'Prof. Ana', time: '13:30–15:10', status: 'Confirmada' },
        { id: 'RS-211', lab: 'Lab 02', course: 'Banco de Dados', teacher: 'Prof. Marcos', time: '15:20–17:00', status: 'Pendente' },
        { id: 'RS-212', lab: 'Lab 03', course: 'Redes', teacher: 'Prof. Beatriz', time: '19:00–20:40', status: 'Confirmada' },
      ],
    });
  }
}
