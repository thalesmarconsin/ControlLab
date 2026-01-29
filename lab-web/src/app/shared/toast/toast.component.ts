import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { NotifyService } from '../../core/notify/notify.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  constructor(public notify: NotifyService) {}
  dismiss(id: string) { this.notify.dismiss(id); }
}
