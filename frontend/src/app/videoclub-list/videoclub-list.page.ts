import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';

import { PeliculaService, Pelicula } from '../pelicula-service';
import { PeliculaModalComponent } from './pelicula-modal/pelicula-modal.component';

@Component({
  selector: 'app-videoclub-list',
  templateUrl: './videoclub-list.page.html',
  styleUrls: ['./videoclub-list.page.scss'],
  standalone: false,
})
export class VideoclubListPage implements OnInit {
  peliculas: Pelicula[] = [];
  cargando = false;
  error?: string;

  // Base URL de imágenes del backend
  readonly IMG_BASE = 'http://localhost:8080/images/';

  constructor(
    private peliculasApi: PeliculaService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  private cargarPeliculas(): void {
    this.cargando = true;
    this.peliculasApi.getAll().subscribe({
      next: (rows) => {
        this.peliculas = rows;
        this.cargando = false;
      },
      error: (e) => {
        this.error = (e as any)?.error?.message ?? 'Error cargando películas';
        this.cargando = false;
      },
    });
  }

  // ───────── Añadir ─────────
  async nuevaPelicula() {
    const modal = await this.modalCtrl.create({
      component: PeliculaModalComponent,
      componentProps: {
        pelicula: { titulo: '', genero: '', anio: new Date().getFullYear() } as Pelicula,
        modo: 'crear',
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'ok' && data?.pelicula) {
      const formData = new FormData();
      formData.append('titulo', data.pelicula.titulo || '');
      formData.append('genero', data.pelicula.genero || '');
      formData.append('anio', data.pelicula.anio?.toString() || '');

      if (data.imagenBlob) {
        const fecha = new Date();
        const nombreArchivo = `poster_${fecha.getFullYear()}${(fecha.getMonth() + 1)
          .toString()
          .padStart(2, '0')}${fecha.getDate().toString().padStart(2, '0')}_${fecha
          .getHours()
          .toString()
          .padStart(2, '0')}${fecha.getMinutes().toString().padStart(2, '0')}${fecha
          .getSeconds()
          .toString()
          .padStart(2, '0')}.jpg`;
        formData.append('file', data.imagenBlob, nombreArchivo);
      }

      this.peliculasApi.create(formData).subscribe({
        next: () => this.cargarPeliculas(),
        error: (err) => console.error('❌ Error al crear película:', err),
      });
    }
  }

  // ───────── Editar ─────────
  async editarPelicula(p: Pelicula) {
    const modal = await this.modalCtrl.create({
      component: PeliculaModalComponent,
      componentProps: {
        pelicula: { ...p },
        modo: 'editar',
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'ok' && data?.pelicula) {
      const formData = new FormData();
      formData.append('titulo', data.pelicula.titulo || '');
      formData.append('genero', data.pelicula.genero || '');
      formData.append('anio', data.pelicula.anio?.toString() || '');

      if (data.imagenBlob) {
        const fecha = new Date();
        const nombreArchivo = `poster_${fecha.getFullYear()}${(fecha.getMonth() + 1)
          .toString()
          .padStart(2, '0')}${fecha.getDate().toString().padStart(2, '0')}_${fecha
          .getHours()
          .toString()
          .padStart(2, '0')}${fecha.getMinutes().toString().padStart(2, '0')}${fecha
          .getSeconds()
          .toString()
          .padStart(2, '0')}.jpg`;
        formData.append('file', data.imagenBlob, nombreArchivo);
      }

      this.peliculasApi.update(p.id!, formData).subscribe({
        next: () => this.cargarPeliculas(),
        error: (err) => console.error('❌ Error al actualizar película:', err),
      });
    }
  }

  // ───────── Eliminar ─────────
  async eliminarPelicula(p: Pelicula) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Seguro que quieres eliminar <strong>${p.titulo}</strong>?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'ok',
          handler: () => {
            this.peliculasApi.delete(p.id!).subscribe({
              next: () => this.cargarPeliculas(),
              error: (err) => console.error('❌ Error al eliminar película:', err),
            });
          },
        },
      ],
    });
    await alert.present();
  }
}

