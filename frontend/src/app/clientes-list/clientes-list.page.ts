import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from '../cliente-service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.page.html',
  styleUrls: ['./clientes-list.page.scss'],
  standalone: false
})
export class ClientesListPage implements OnInit {
  clientes: Cliente[] = [];
  cargando = false;
  error?: string;

  constructor(private clientesApi: ClienteService) {}

  ngOnInit(): void {
    this.cargar();
  }

  private cargar(): void {
    this.cargando = true;
    this.clientesApi.getAll().subscribe({
      next: (rows: Cliente[]) => { this.clientes = rows; this.cargando = false; },
      error: (e: unknown) => {
        this.error = (e as any)?.error?.message ?? 'Error cargando clientes';
        this.cargando = false;
        console.error('CLIENTES ERROR:', e);
      }
    });
  }
}

