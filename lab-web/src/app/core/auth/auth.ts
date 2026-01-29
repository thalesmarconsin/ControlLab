import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';

type LoginResponse = { access_token: string; token_type: string; expires_in: number };

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly tokenKey = 'lab_token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(tap(res => localStorage.setItem(this.tokenKey, res.access_token)));
  }

  register(name: string, email: string, password: string) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/register`, { name, email, password })
      .pipe(tap(res => localStorage.setItem(this.tokenKey, res.access_token)));
  }

  me() {
    return this.http.get(`${environment.apiUrl}/auth/me`);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
