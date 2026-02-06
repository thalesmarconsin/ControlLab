import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export type ComputerStatus = 'active' | 'maintenance' | 'retired';

export type Computer = {
  id: number;
  laboratory_id: number;
  asset_tag: string;
  hostname?: string | null;
  cpu?: string | null;
  ram_gb?: number | null;
  storage_gb?: number | null;
  os?: string | null;
  status: ComputerStatus;
  notes?: string | null;

  laboratory?: {
    id: number;
    name: string;
  };
};

export type ComputerPayload = Omit<Computer, 'id' | 'laboratory'>;

@Injectable({ providedIn: 'root' })
export class ComputersService {
  private baseUrl = `${environment.apiUrl}/computers`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Computer[]>(this.baseUrl);
  }

  get(id: number) {
    return this.http.get<Computer>(`${this.baseUrl}/${id}`);
  }

  create(payload: ComputerPayload) {
    return this.http.post<Computer>(this.baseUrl, payload);
  }

  update(id: number, payload: ComputerPayload) {
    return this.http.put<Computer>(`${this.baseUrl}/${id}`, payload);
  }

  remove(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
