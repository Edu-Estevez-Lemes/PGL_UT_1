import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoclubListPageRoutingModule } from './videoclub-list-routing.module';

import { VideoclubListPage } from './videoclub-list.page';
import { PeliculaModalComponent } from './pelicula-modal/pelicula-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoclubListPageRoutingModule
  ],
  declarations: [VideoclubListPage, PeliculaModalComponent]
})
export class VideoclubListPageModule {}
