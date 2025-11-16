import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Ya NO usamos fecha ni hora porque se quitaron del HTML
    // así que no llamamos a setInterval ni a actualizarFechaHora()
  }

  // Método de logout – limpia el token y vuelve al login
  logout() {
    this.authService.logout();  // Borra token
    this.router.navigate(['/login']); // Redirige al login
  }

}


