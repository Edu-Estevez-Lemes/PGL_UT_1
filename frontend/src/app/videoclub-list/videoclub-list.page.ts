import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private peliculasApi: PeliculaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPeliculas();
  }

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

  verPelicula(p: Pelicula) {
    console.log('Ver detalles:', p);
    // Aquí podrías abrir un modal con más info o navegar a /peliculas-form/:id
  }

  editarPelicula(p: Pelicula) {
    this.router.navigate(['/peliculas-form', p.id]);
  }

  eliminarPelicula(p: Pelicula) {
    if (confirm(`¿Eliminar "${p.titulo}"?`)) {
      this.peliculasApi.delete(p.id!).subscribe(() => this.cargarPeliculas());
    }
  }

  nuevaPelicula() {
    this.router.navigate(['/peliculas-form']);
  }
}
