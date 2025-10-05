import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Reutilizamos los tipos de tus otros servicios (solo tipos)
import type { Cliente } from './cliente-service';
import type { Pelicula } from './pelicula-service';

export interface Alquiler {
  id: number;
  fecha_inicio: string;          // tal como viene del backend
  fecha_fin?: string | null;
  clienteId: number;
  peliculaId: number;
  Cliente?: Cliente;             // vienen por include en tu API
  Pelicula?: Pelicula;
}

@Injectable({ providedIn: 'root' })
export class AlquilerService {
  private base = 'http://localhost:8080/api/alquileres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Alquiler[]> {
    return this.http.get<Alquiler[]>(this.base);
  }
}

