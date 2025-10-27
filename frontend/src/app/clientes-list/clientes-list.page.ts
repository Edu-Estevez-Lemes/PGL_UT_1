import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';

import { ClienteService, Cliente } from '../cliente-service';
import { ClienteModalComponent } from './cliente-modal/cliente-modal.component';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.page.html',
  styleUrls: ['./clientes-list.page.scss'],
  standalone: false,
})
export class ClientesListPage implements OnInit {
  clientes: Cliente[] = [];
  cargando = false;
  error?: string;

  // Base de imágenes
  readonly IMG_BASE = 'http://localhost:8080/images/';

  constructor(
    private clientesApi: ClienteService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  private cargarClientes(): void {
    this.cargando = true;
    this.clientesApi.getAll().subscribe({
      next: (rows) => {
        this.clientes = rows;
        this.cargando = false;
      },
      error: (e) => {
        this.error = (e as any)?.error?.message ?? 'Error cargando clientes';
        this.cargando = false;
      },
    });
  }

  // ───────── Añadir cliente ─────────
  async nuevoCliente() {
    const modal = await this.modalCtrl.create({
      component: ClienteModalComponent,
      componentProps: {
        cliente: { nombre: '', email: '', telefono: '' },
        modo: 'crear',
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'ok' && data?.cliente) {
      const formData: any = new FormData();
      formData.append('nombre', data.cliente.nombre || '');
      formData.append('email', data.cliente.email || '');
      formData.append('telefono', data.cliente.telefono || '');

      if (data.imagenBlob) {
        const fecha = new Date();
        const nombreArchivo = `cliente_${fecha.getFullYear()}${(fecha.getMonth() + 1)
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

      this.clientesApi.create(formData).subscribe({
        next: () => this.cargarClientes(),
        error: (err) => console.error('❌ Error al crear cliente:', err),
      });
    }
  }

  // ───────── Editar cliente ─────────
  async editarCliente(c: Cliente) {
    const modal = await this.modalCtrl.create({
      component: ClienteModalComponent,
      componentProps: {
        cliente: { ...c },
        modo: 'editar',
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'ok' && data?.cliente) {
      const formData: any = new FormData();
      formData.append('nombre', data.cliente.nombre || '');
      formData.append('email', data.cliente.email || '');
      formData.append('telefono', data.cliente.telefono || '');

      if (data.imagenBlob) {
        const fecha = new Date();
        const nombreArchivo = `cliente_${fecha.getFullYear()}${(fecha.getMonth() + 1)
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

      this.clientesApi.update(c.id!, formData).subscribe({
        next: () => this.cargarClientes(),
        error: (err) => console.error('❌ Error al actualizar cliente:', err),
      });
    }
  }

  // ───────── Eliminar cliente ─────────
  async eliminarCliente(c: Cliente) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Seguro que quieres eliminar a <strong>${c.nombre}</strong>?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'ok',
          handler: () => {
            this.clientesApi.delete(c.id!).subscribe({
              next: () => this.cargarClientes(),
              error: (err) => console.error('❌ Error al eliminar cliente:', err),
            });
          },
        },
      ],
    });
    await alert.present();
  }
}



