import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export type Lab = {
  id: number;
  name: string;
  location?: string | null;
  capacity: number;
  active: boolean;
  computers_count?: number;
  equipment_count?: number;
};

@Injectable({ providedIn: 'root' })
export class LabsService {
  remove(id: number) {
    throw new Error('Method not implemented.');
  }
  private base = `${environment.apiUrl}/laboratories`;

  constructor(private http: HttpClient) {}

  list() { return this.http.get<Lab[]>(this.base); }
  get(id: number) { return this.http.get<Lab>(`${this.base}/${id}`); }
  create(payload: Partial<Lab>) { return this.http.post<Lab>(this.base, payload); }
  update(id: number, payload: Partial<Lab>) { return this.http.put<Lab>(`${this.base}/${id}`, payload); }
  delete(id: number) { return this.http.delete<void>(`${this.base}/${id}`); }
}
