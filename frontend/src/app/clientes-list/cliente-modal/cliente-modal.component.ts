import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Cliente } from '../../cliente-service';

@Component({
  selector: 'app-cliente-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './cliente-modal.component.html',
  styleUrls: ['./cliente-modal.component.scss'],
})
export class ClienteModalComponent {
  @Input() cliente!: Cliente;
  @Input() modo!: 'crear' | 'editar';

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  guardar() {
    this.modalCtrl.dismiss(this.cliente, 'ok');
  }
}


