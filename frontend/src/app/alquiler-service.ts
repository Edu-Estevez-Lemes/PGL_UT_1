import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Alquiler {
  id?: number;                     // <- opcional
  clienteId: number | null;        // <- permite null al crear
  peliculaId: number | null;       // <- permite null al crear
  fecha_inicio: string;            // ISO string
  fecha_fin: string | null;        // puede estar sin cerrar
  precio?: number;                 // <- opcional
  Cliente?: { id: number; nombre: string } | null;
  Pelicula?: { id: number; titulo: string } | null;
}

@Injectable({ providedIn: 'root' })
export class AlquilerService {
  private apiUrl = 'http://localhost:8080/api/alquileres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Alquiler[]> {
    return this.http.get<Alquiler[]>(this.apiUrl);
  }

  create(a: Alquiler): Observable<Alquiler> {
    return this.http.post<Alquiler>(this.apiUrl, a);
  }

  update(id: number, a: Alquiler): Observable<Alquiler> {
    return this.http.put<Alquiler>(`${this.apiUrl}/${id}`, a);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

