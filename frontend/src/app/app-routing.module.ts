import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // 👉 Página de login (nueva)
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule),
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule),
  },

  // 👉 Arrancamos la app en /login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'videoclub-list',
    loadChildren: () =>
      import('./videoclub-list/videoclub-list.module')
        .then(m => m.VideoclubListPageModule),
  },
  {
    path: 'clientes-list',
    loadChildren: () =>
      import('./clientes-list/clientes-list.module')
        .then(m => m.ClientesListPageModule),
  },
  {
    path: 'alquileres-list',
    loadChildren: () =>
      import('./alquileres-list/alquileres-list.module')
        .then(m => m.AlquileresListPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

