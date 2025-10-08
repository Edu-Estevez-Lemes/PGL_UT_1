import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  hora: string = '';
  fecha: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.actualizarFechaHora();
    setInterval(() => this.actualizarFechaHora(), 1000);
  }

  actualizarFechaHora() {
    const ahora = new Date();

    const opcionesHora = {
      timeZone: 'Atlantic/Canary',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    } as const;

    const opcionesFecha = {
      timeZone: 'Atlantic/Canary',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    } as const;

    this.hora = ahora.toLocaleTimeString('es-ES', opcionesHora);
    this.fecha = ahora.toLocaleDateString('es-ES', opcionesFecha);
  }
}

