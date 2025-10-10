import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';

import { ClienteService, Cliente } from '../cliente-service';
import { ClienteModalComponent } from './cliente-modal/cliente-modal.component';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.page.html',
  styleUrls: ['./clientes-list.page.scss'],
  standalone: false, // 👈 igual que en películas
})
export class ClientesListPage implements OnInit {
  clientes: Cliente[] = [];
  cargando = false;
  error?: string;

  constructor(
    private clientesApi: ClienteService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

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

  // ───────── Añadir ─────────
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
    if (role === 'ok' && data) {
      this.clientesApi.create(data).subscribe(() => this.cargarClientes());
    }
  }

  // ───────── Editar ─────────
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
    if (role === 'ok' && data) {
      this.clientesApi.update(c.id!, data).subscribe(() => this.cargarClientes());
    }
  }

  // ───────── Eliminar ─────────
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
            this.clientesApi.delete(c.id!).subscribe(() => this.cargarClientes());
          },
        },
      ],
    });
    await alert.present();
  }
}


