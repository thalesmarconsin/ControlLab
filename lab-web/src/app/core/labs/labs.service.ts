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

export type LabCreate = {
  name: string;
  location?: string | null;
  capacity?: number;
  active?: boolean;
};

@Injectable({ providedIn: 'root' })
export class LabsService {
  private baseUrl = `${environment.apiUrl}/laboratories`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Lab[]>(this.baseUrl);
  }

  get(id: number) {
    return this.http.get<Lab>(`${this.baseUrl}/${id}`);
  }

  create(payload: LabCreate) {
    return this.http.post<Lab>(this.baseUrl, payload);
  }

  update(id: number, payload: LabCreate) {
    return this.http.put<Lab>(`${this.baseUrl}/${id}`, payload);
  }

  remove(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
