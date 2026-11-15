export interface Registro {
  id: number;
  fecha: string;
  descripcion: string;
  cantidad: number;
  importe: number;
  activo: boolean;
}

export type RegistroSinId = Omit<Registro, 'id'>;
