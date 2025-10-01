import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoclubListPage } from './videoclub-list.page';

const routes: Routes = [
  {
    path: '',
    component: VideoclubListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoclubListPageRoutingModule {}
