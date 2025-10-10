import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AlquilerService, Alquiler } from '../alquiler-service';
import { AlquilerModalComponent } from './alquiler-modal/alquiler-modal.component';

@Component({
  selector: 'app-alquileres-list',
  templateUrl: './alquileres-list.page.html',
  styleUrls: ['./alquileres-list.page.scss'],
  standalone: false,
})
export class AlquileresListPage implements OnInit {

  alquileres: Alquiler[] = [];
  cargando = false;
  error?: string;

  constructor(
    private alquileresApi: AlquilerService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit(): void {
    this.cargarAlquileres();
  }

  private cargarAlquileres(): void {
    this.cargando = true;
    this.alquileresApi.getAll().subscribe({
      next: rows => { this.alquileres = rows; this.cargando = false; },
      error: e => {
        this.error = (e as any)?.error?.message ?? 'Error cargando alquileres';
        this.cargando = false;
      }
    });
  }

  // ───────── Añadir ─────────
  async nuevoAlquiler() {
    const nuevo: Alquiler = {
      clienteId: null,
      peliculaId: null,
      fecha_inicio: new Date().toISOString(),
      fecha_fin: null,
      precio: 0
    };

    const modal = await this.modalCtrl.create({
      component: AlquilerModalComponent,
      componentProps: { alquiler: nuevo, modo: 'crear' }
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'ok' && data) {
      this.alquileresApi.create(data).subscribe(() => this.cargarAlquileres());
    }
  }

  // ───────── Editar ─────────
  async editarAlquiler(a: Alquiler) {
    const modal = await this.modalCtrl.create({
      component: AlquilerModalComponent,
      componentProps: { alquiler: { ...a }, modo: 'editar' }
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'ok' && data) {
      this.alquileresApi.update(a.id!, data).subscribe(() => this.cargarAlquileres());
    }
  }

  // ───────── Eliminar ─────────
  async eliminarAlquiler(a: Alquiler) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Seguro que quieres eliminar el alquiler de <strong>${a.Cliente?.nombre ?? 'Cliente'}</strong> para <strong>${a.Pelicula?.titulo ?? 'Película'}</strong>?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'ok',
          handler: () => {
            this.alquileresApi.delete(a.id!).subscribe(() => this.cargarAlquileres());
          }
        }
      ]
    });
    await alert.present();
  }
}


