import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

import { Cliente } from '../../cliente-service';            // ✔ servicios en app/
import { PhotoService } from '../../photo.service';          // ✔ servicios en app/

@Component({
  selector: 'app-cliente-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './cliente-modal.component.html',
  styleUrls: ['./cliente-modal.component.scss']
})
export class ClienteModalComponent {
  @Input() cliente!: Cliente;
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
    // Mantengo tu patrón: el padre hace la llamada HTTP.
    this.modalCtrl.dismiss({ cliente: this.cliente, imagenBlob: this.imagenBlob }, 'ok');
  }
}



