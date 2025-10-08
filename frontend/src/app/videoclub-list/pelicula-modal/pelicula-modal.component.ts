import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../pelicula-service';

@Component({
  selector: 'app-pelicula-modal',
  templateUrl: './pelicula-modal.component.html',
  styleUrls: ['./pelicula-modal.component.scss'],
  standalone: false,
})
export class PeliculaModalComponent {
  @Input() pelicula!: Pelicula;              // objeto a editar o base para crear
  @Input() modo!: 'crear' | 'editar';        // texto del botón y título

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  guardar() {
    // Devuelvo la película al padre
    this.modalCtrl.dismiss(this.pelicula, 'ok');
  }
}

