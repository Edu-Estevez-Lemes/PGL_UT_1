import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlquileresListPage } from './alquileres-list.page';

const routes: Routes = [
  {
    path: '',
    component: AlquileresListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlquileresListPageRoutingModule {}
