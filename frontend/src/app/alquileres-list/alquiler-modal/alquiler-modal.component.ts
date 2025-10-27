import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

import { lastValueFrom } from 'rxjs';

import { ClienteService, Cliente } from '../../cliente-service';
import { PeliculaService, Pelicula } from '../../pelicula-service';
import { Alquiler } from '../../alquiler-service';

@Component({
  selector: 'app-alquiler-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './alquiler-modal.component.html',
  styleUrls: ['./alquiler-modal.component.scss']
})
export class AlquilerModalComponent {
  @Input() modo!: 'crear' | 'editar';
  @Input() alquiler!: Partial<Alquiler>;

  clientes: Cliente[] = [];
  peliculas: Pelicula[] = [];

  constructor(
    private modalCtrl: ModalController,
    private clientesSrv: ClienteService,
    private peliculasSrv: PeliculaService
  ) {
    // inicializa si no viene nada
    if (!this.alquiler) {
      this.alquiler = { clienteId: null, peliculaId: null, fecha_inicio: '', fecha_fin: '' };
    }
  }

  // usa ionViewWillEnter para que se ejecute cada vez que se abra el modal
  async ionViewWillEnter() {
    try {
      // <- aquí está la corrección: usamos lastValueFrom, no toPromise()
      this.clientes = await lastValueFrom(this.clientesSrv.getAll());
      this.peliculas = await lastValueFrom(this.peliculasSrv.getAll());

      // si vienes en modo "crear" asegúrate de tener campos inicializados
      if (!this.alquiler.fecha_inicio) this.alquiler.fecha_inicio = '';
      if (!this.alquiler.fecha_fin)    this.alquiler.fecha_fin = '';
    } catch (err) {
      console.error('Error cargando clientes/películas:', err);
      // opcional: podrías mostrar un alert si quieres notificar al usuario
    }
  }

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  guardar() {
    if (!this.alquiler.clienteId || !this.alquiler.peliculaId ||
        !this.alquiler.fecha_inicio || !this.alquiler.fecha_fin) {
      console.warn('Todos los campos son obligatorios');
      return;
    }

    const payload: Alquiler = {
      clienteId: this.alquiler.clienteId!,
      peliculaId: this.alquiler.peliculaId!,
      fecha_inicio: this.alquiler.fecha_inicio!,
      fecha_fin: this.alquiler.fecha_fin!
    } as Alquiler;

    // el padre (alquileres-list) hace la llamada HTTP; aquí devolvemos el objeto
    this.modalCtrl.dismiss(payload, 'ok');
  }
}







