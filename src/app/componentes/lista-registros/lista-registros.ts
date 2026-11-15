import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Registro } from '../../modelos/registro';
import { RegistrosService } from '../../servicios/registros.service';

@Component({
  selector: 'app-lista-registros',
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-registros.html',
  styleUrl: './lista-registros.scss'
})
export class ListaRegistros implements OnInit {
  private readonly registrosService = inject(RegistrosService);
  protected registros: Registro[] = [];
  protected cargando = true;
  protected mensajeError = '';
  protected idPendienteEliminar: number | null = null;

  ngOnInit(): void {
    this.cargarRegistros();
  }

  protected cargarRegistros(): void {
    this.cargando = true;
    this.mensajeError = '';
    this.registrosService.listar().subscribe({
      next: (registros) => {
        this.registros = registros;
        this.cargando = false;
      },
      error: () => {
        this.mensajeError = 'No se pudieron cargar los registros. Comprueba que JSON Server esté ejecutándose.';
        this.cargando = false;
      }
    });
  }

  protected solicitarEliminacion(id: number): void {
    this.idPendienteEliminar = id;
  }

  protected cancelarEliminacion(): void {
    this.idPendienteEliminar = null;
  }

  protected eliminarRegistro(): void {
    if (this.idPendienteEliminar === null) return;
    this.registrosService.eliminar(this.idPendienteEliminar).subscribe({
      next: () => {
        this.registros = this.registros.filter((registro) => registro.id !== this.idPendienteEliminar);
        this.idPendienteEliminar = null;
      },
      error: () => {
        this.mensajeError = 'No se pudo eliminar el registro. Inténtalo nuevamente.';
        this.idPendienteEliminar = null;
      }
    });
  }
}
