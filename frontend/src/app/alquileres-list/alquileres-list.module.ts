import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlquileresListPageRoutingModule } from './alquileres-list-routing.module';

import { AlquileresListPage } from './alquileres-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlquileresListPageRoutingModule
  ],
  declarations: [AlquileresListPage]
})
export class AlquileresListPageModule {}
