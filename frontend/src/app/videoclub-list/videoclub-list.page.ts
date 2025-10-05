import { Component, OnInit } from '@angular/core';
import { PeliculaService, Pelicula } from '../pelicula-service';

@Component({
  selector: 'app-videoclub-list',
  templateUrl: './videoclub-list.page.html',
  styleUrls: ['./videoclub-list.page.scss'],
  standalone: false
})
export class VideoclubListPage implements OnInit {
  peliculas: Pelicula[] = [];
  cargando = false;
  error?: string;

  constructor(private peliculasApi: PeliculaService) {}

  ngOnInit(): void { this.cargarPeliculas(); }

  private cargarPeliculas(): void {
    this.cargando = true;
    this.peliculasApi.getAll().subscribe({
      next: (rows: Pelicula[]) => {
        this.peliculas = rows;
        this.cargando = false;
      },
      error: (e: unknown) => {
        const msg = (e as any)?.error?.message ?? 'Error cargando películas';
        this.error = msg;
        this.cargando = false;
        console.error('PELIS ERROR:', e);
      }
    });
  }
}
