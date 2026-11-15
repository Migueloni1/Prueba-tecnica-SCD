import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Registro } from '../../modelos/registro';
import { RegistrosService } from '../../servicios/registros.service';

@Component({
  selector: 'app-detalle-registro',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './detalle-registro.html',
  styleUrl: './detalle-registro.scss'
})
export class DetalleRegistro implements OnInit {
  private readonly registrosService = inject(RegistrosService);
  private readonly ruta = inject(ActivatedRoute);
  protected registro: Registro | null = null;
  protected cargando = true;
  protected mensajeError = '';

  ngOnInit(): void {
    const id = Number(this.ruta.snapshot.paramMap.get('id'));
    this.registrosService.obtenerPorId(id).subscribe({
      next: (registro) => { this.registro = registro; this.cargando = false; },
      error: () => { this.mensajeError = 'No se encontró el registro solicitado.'; this.cargando = false; }
    });
  }
}
