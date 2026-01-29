import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info';

export type Toast = {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  timeoutMs?: number;
};

@Injectable({ providedIn: 'root' })
export class NotifyService {
  private readonly _toasts = new BehaviorSubject<Toast[]>([]);
  readonly toasts$ = this._toasts.asObservable();

  show(toast: Omit<Toast, 'id'>) {
    const id = crypto.randomUUID();
    const item: Toast = { id, timeoutMs: 3000, ...toast };

    this._toasts.next([...this._toasts.value, item]);

    if (item.timeoutMs && item.timeoutMs > 0) {
      setTimeout(() => this.dismiss(id), item.timeoutMs);
    }
  }

  success(message: string, title = 'Sucesso') {
    this.show({ type: 'success', title, message });
  }

  error(message: string, title = 'Erro') {
    this.show({ type: 'error', title, message, timeoutMs: 4500 });
  }

  info(message: string, title = 'Info') {
    this.show({ type: 'info', title, message });
  }

  dismiss(id: string) {
    this._toasts.next(this._toasts.value.filter(t => t.id !== id));
  }

  clear() {
    this._toasts.next([]);
  }
}
