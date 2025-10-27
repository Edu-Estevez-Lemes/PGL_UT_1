import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { AlquilerService } from '../alquiler-service';
import { AlquilerModalComponent } from './alquiler-modal/alquiler-modal.component';

@Component({
  selector: 'app-alquileres-list',
  templateUrl: './alquileres-list.page.html',
  styleUrls: ['./alquileres-list.page.scss'],
  standalone: false,
})
export class AlquileresListPage implements OnInit {
  alquileres: any[] = [];           // <- any para no chocar con tipos 'imagen'
  cargando = false;
  error?: string;

  readonly IMG_BASE = 'http://localhost:8080/images/';

  constructor(
    private alquilerSrv: AlquilerService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit(): void {
    this.cargarAlquileres();
  }

  private cargarAlquileres(): void {
    this.cargando = true;
    this.alquilerSrv.getAll().subscribe({
      next: (rows: any[]) => {        // esperamos include de Cliente y Pelicula
        this.alquileres = rows ?? [];
        this.cargando = false;
      },
      error: (e) => {
        this.error = (e as any)?.error?.message ?? 'Error cargando alquileres';
        this.cargando = false;
      }
    });
  }

  // ───────── Añadir ─────────
  async nuevoAlquiler() {
    const modal = await this.modalCtrl.create({
      component: AlquilerModalComponent,
      componentProps: {
        alquiler: {
          clienteId: null,
          peliculaId: null,
          fecha_inicio: '',
          fecha_fin: ''
        },
        modo: 'crear',
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'ok' && data) {
      this.alquilerSrv.create(data).subscribe(() => this.cargarAlquileres());
    }
  }

  // ───────── Editar ─────────
  async editarAlquiler(a: any) {
    const modal = await this.modalCtrl.create({
      component: AlquilerModalComponent,
      componentProps: { alquiler: { ...a }, modo: 'editar' },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'ok' && data) {
      this.alquilerSrv.update(a.id!, data).subscribe(() => this.cargarAlquileres());
    }
  }

  // ───────── Eliminar ─────────
  async eliminarAlquiler(a: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Seguro que quieres eliminar el alquiler de <b>${a?.Cliente?.nombre ?? 'cliente'}</b>?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'ok',
          handler: () => {
            this.alquilerSrv.delete(a.id!).subscribe(() => this.cargarAlquileres());
          },
        },
      ],
    });
    await alert.present();
  }
}
