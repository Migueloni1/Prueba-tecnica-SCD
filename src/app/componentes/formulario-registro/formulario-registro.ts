import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { RegistroSinId } from '../../modelos/registro';
import { RegistrosService } from '../../servicios/registros.service';

@Component({
  selector: 'app-formulario-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-registro.html',
  styleUrl: './formulario-registro.scss'
})
export class FormularioRegistro implements OnInit {
  private readonly constructorFormularios = inject(FormBuilder);
  private readonly registrosService = inject(RegistrosService);
  private readonly ruta = inject(ActivatedRoute);
  private readonly enrutador = inject(Router);
  protected readonly idRegistro = Number(this.ruta.snapshot.paramMap.get('id'));
  protected readonly modoEdicion = Number.isInteger(this.idRegistro) && this.idRegistro > 0;
  protected guardando = false;
  protected cargando = this.modoEdicion;
  protected mensajeError = '';

  protected readonly formulario = this.constructorFormularios.nonNullable.group({
    fecha: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
    descripcion: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(200)]],
    cantidad: [0, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
    importe: [0, [Validators.required, Validators.min(0)]],
    activo: [true]
  });

  ngOnInit(): void {
    if (!this.modoEdicion) return;
    this.registrosService.obtenerPorId(this.idRegistro).subscribe({
      next: (registro) => {
        this.formulario.patchValue({
          fecha: this.convertirFechaAEntrada(registro.fecha),
          descripcion: registro.descripcion,
          cantidad: registro.cantidad,
          importe: registro.importe,
          activo: registro.activo
        });
        this.cargando = false;
      },
      error: () => {
        this.mensajeError = 'No se encontró el registro solicitado.';
        this.cargando = false;
      }
    });
  }

  protected guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.guardando = true;
    this.mensajeError = '';
    const valores = this.formulario.getRawValue();
    const registro: RegistroSinId = {
      fecha: this.convertirFechaAFormatoMostrar(valores.fecha),
      descripcion: valores.descripcion.trim(),
      cantidad: valores.cantidad,
      importe: valores.importe,
      activo: valores.activo
    };
    const operacion = this.modoEdicion
      ? this.registrosService.actualizar(this.idRegistro, registro)
      : this.registrosService.crear(registro);
    operacion.subscribe({
      next: () => this.enrutador.navigate(['/']),
      error: () => {
        this.mensajeError = 'No se pudo guardar el registro. Comprueba la conexión con la API.';
        this.guardando = false;
      }
    });
  }

  protected campoInvalido(nombre: 'fecha' | 'descripcion' | 'cantidad' | 'importe'): boolean {
    const campo = this.formulario.controls[nombre];
    return campo.invalid && (campo.dirty || campo.touched);
  }

  private convertirFechaAFormatoMostrar(fecha: string): string {
    const [anio, mes, dia] = fecha.split('-');
    return `${dia}-${mes}-${anio}`;
  }

  private convertirFechaAEntrada(fecha: string): string {
    const [dia, mes, anio] = fecha.split('-');
    return `${anio}-${mes}-${dia}`;
  }
}
