import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo simple (ajústalo si tu tabla tiene más campos)
export interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
}

@Injectable({ providedIn: 'root' })
export class ClienteService {
  // Usamos URL directa como en las diapositivas (sin environment ni proxy)
  private readonly base = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.base);
  }
}

