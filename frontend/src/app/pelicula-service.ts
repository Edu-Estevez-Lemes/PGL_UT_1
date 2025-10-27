import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pelicula {
  id?: number;
  titulo: string;
  genero?: string;
  anio?: number;
  disponible?: boolean;
  imagen?: string; // ✅ campo de imagen
}

@Injectable({ providedIn: 'root' })
export class PeliculaService {
  private base = 'http://localhost:8080/api/peliculas';

  constructor(private http: HttpClient) {}

  // Obtener todas las películas
  getAll(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.base);
  }

  // Obtener una película por ID
  getById(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.base}/${id}`);
  }

  // Crear una nueva película (usa FormData)
  create(pelicula: any): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.base, pelicula);
  }

  // Actualizar película existente (usa FormData)
  update(id: number, pelicula: any): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${this.base}/${id}`, pelicula);
  }

  // Eliminar película
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}


