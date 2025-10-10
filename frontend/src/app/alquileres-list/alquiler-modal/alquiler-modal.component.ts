import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Alquiler } from '../../alquiler-service';
import { PeliculaService } from '../../pelicula-service';
import { ClienteService } from '../../cliente-service';

@Component({
  selector: 'app-alquiler-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './alquiler-modal.component.html',
  styleUrls: ['./alquiler-modal.component.scss']
})
export class AlquilerModalComponent {
  @Input() alquiler!: Alquiler;
  @Input() modo!: 'crear' | 'editar';

  peliculas: any[] = [];
  clientes: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private peliculasApi: PeliculaService,
    private clientesApi: ClienteService
  ) {}

  ngOnInit() {
    this.peliculasApi.getAll().subscribe({ next: d => this.peliculas = d });
    this.clientesApi.getAll().subscribe({ next: d => this.clientes = d });
  }

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  guardar() {
    this.modalCtrl.dismiss(this.alquiler, 'ok');
  }

  calcularPrecio() {
    if (!this.alquiler.fecha_inicio || !this.alquiler.fecha_fin) {
      this.alquiler.precio = 0;
      return;
    }
    const inicio = new Date(this.alquiler.fecha_inicio);
    const fin = new Date(this.alquiler.fecha_fin);
    const dias = Math.max(Math.ceil((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24)), 0);
    const extras = dias > 3 ? dias - 3 : 0;
    this.alquiler.precio = 5 + extras * 1.5;
  }
}

