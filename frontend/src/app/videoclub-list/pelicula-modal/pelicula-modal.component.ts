import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

import { PhotoService } from '../../photo.service';        // ✔ en app/
import { Pelicula } from '../../pelicula-service';         // ✔ en app/

@Component({
  selector: 'app-pelicula-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './pelicula-modal.component.html',
  styleUrls: ['./pelicula-modal.component.scss']
})
export class PeliculaModalComponent {
  @Input() pelicula!: Pelicula;
  @Input() modo!: 'crear' | 'editar';

  imagenBlob: Blob | null = null;
  imagenPreview: string | null = null;

  constructor(
    private modalCtrl: ModalController,
    private photo: PhotoService
  ) {}

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  async takePhoto() {
    this.imagenBlob = await this.photo.takePhoto();
    this.imagenPreview = URL.createObjectURL(this.imagenBlob);
  }

  async pickImage() {
    this.imagenBlob = await this.photo.pickImage();
    this.imagenPreview = URL.createObjectURL(this.imagenBlob);
  }

  guardar() {
    this.modalCtrl.dismiss({ pelicula: this.pelicula, imagenBlob: this.imagenBlob }, 'ok');
  }
}


