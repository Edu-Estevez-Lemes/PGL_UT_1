import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface AuthUser {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

interface LoginResponse {
  token: string;
  user: AuthUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Al arrancar la app, intenta cargar usuario desde localStorage
    const token = this.getToken();
    const rawUser = localStorage.getItem('tape_user');
    if (token && rawUser) {
      try {
        this.currentUserSubject.next(JSON.parse(rawUser));
      } catch {
        this.logout();
      }
    }
  }

  /** Devuelve el token guardado (o null) */
  getToken(): string | null {
    return localStorage.getItem('tape_token');
  }

  /** ¿Hay usuario logueado? (sincronamente) */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /** Login contra /api/auth/login */
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((res) => {
          localStorage.setItem('tape_token', res.token);
          localStorage.setItem('tape_user', JSON.stringify(res.user));
          this.currentUserSubject.next(res.user);
        })
      );
  }

  /** Registro contra /api/auth/register */
  register(nombre: string, email: string, password: string, telefono?: string) {
    return this.http.post(`${this.apiUrl}/register`, {
      nombre,
      email,
      password,
      telefono: telefono || ''
    });
  }

  /** Logout: limpia token y usuario */
  logout(): void {
    localStorage.removeItem('tape_token');
    localStorage.removeItem('tape_user');
    this.currentUserSubject.next(null);
  }
}
