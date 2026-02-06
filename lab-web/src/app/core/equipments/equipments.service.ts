import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export type EquipmentStatus = 'active' | 'maintenance' | 'retired';

export type Equipment = {
  id: number;
  laboratory_id: number;
  asset_tag: string;
  type: string;
  brand?: string | null;
  model?: string | null;
  status: EquipmentStatus;
  notes?: string | null;

  laboratory?: { id: number; name: string };
};

export type EquipmentPayload = Omit<Equipment, 'id' | 'laboratory'>;

@Injectable({ providedIn: 'root' })
export class EquipmentsService {
  private baseUrl = `${environment.apiUrl}/equipments`;

  constructor(private http: HttpClient) {}

  list() { return this.http.get<Equipment[]>(this.baseUrl); }
  get(id: number) { return this.http.get<Equipment>(`${this.baseUrl}/${id}`); }
  create(payload: EquipmentPayload) { return this.http.post<Equipment>(this.baseUrl, payload); }
  update(id: number, payload: EquipmentPayload) { return this.http.put<Equipment>(`${this.baseUrl}/${id}`, payload); }
  remove(id: number) { return this.http.delete<void>(`${this.baseUrl}/${id}`); }
}
