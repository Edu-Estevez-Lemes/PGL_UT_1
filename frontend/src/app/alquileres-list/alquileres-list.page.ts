import { Component, OnInit } from '@angular/core';
import { AlquilerService, Alquiler } from '../alquiler-service';

@Component({
  selector: 'app-alquileres-list',
  templateUrl: './alquileres-list.page.html',
  styleUrls: ['./alquileres-list.page.scss'],
  standalone: false
})
export class AlquileresListPage implements OnInit {
  alquileres: Alquiler[] = [];
  cargando = false;
  error?: string;

  constructor(private api: AlquilerService) {}

  ngOnInit(): void {
    this.cargar();
  }

  private cargar(): void {
    this.cargando = true;
    this.api.getAll().subscribe({
      next: (rows: Alquiler[]) => { this.alquileres = rows; this.cargando = false; },
      error: (e: unknown) => {
        this.error = (e as any)?.error?.message ?? 'Error cargando alquileres';
        this.cargando = false;
        console.error('ALQUILERES ERROR:', e);
      }
    });
  }
}

