import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pelicula {
  id: number;
  titulo: string;
  genero?: string;
  anio?: number;
  disponible?: boolean;
}

@Injectable({ providedIn: 'root' })
export class PeliculaService {
  private base = 'http://localhost:8080/api/peliculas'; // tal cual, directo al backend

  constructor(private http: HttpClient) {}

  getAll(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.base);
  }
}

