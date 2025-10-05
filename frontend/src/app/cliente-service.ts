import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
}

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private base = 'http://localhost:8080/api/clientes'; // URL directa al backend

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.base);
  }

}

