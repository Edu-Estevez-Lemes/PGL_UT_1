import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
})
export class HomePage implements OnInit {
  constructor(private clientes: ClienteService) {}

  ngOnInit(): void {
    this.clientes.getAll().subscribe({
      next: (rows) => console.log('CLIENTES:', rows),
      error: (e)   => console.error('ERROR CLIENTES:', e),
    });
  }
}



