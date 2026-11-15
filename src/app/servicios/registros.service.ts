import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Registro, RegistroSinId } from '../modelos/registro';

@Injectable({ providedIn: 'root' })
export class RegistrosService {
  private readonly clienteHttp = inject(HttpClient);
  private readonly urlApi = 'http://localhost:3000/registros';

  listar(): Observable<Registro[]> {
    return this.clienteHttp.get<Registro[]>(this.urlApi);
  }

  obtenerPorId(id: number): Observable<Registro> {
    return this.clienteHttp.get<Registro>(`${this.urlApi}/${id}`);
  }

  crear(registro: RegistroSinId): Observable<Registro> {
    return this.clienteHttp.post<Registro>(this.urlApi, registro);
  }

  actualizar(id: number, registro: RegistroSinId): Observable<Registro> {
    return this.clienteHttp.put<Registro>(`${this.urlApi}/${id}`, registro);
  }

  eliminar(id: number): Observable<void> {
    return this.clienteHttp.delete<void>(`${this.urlApi}/${id}`);
  }
}
