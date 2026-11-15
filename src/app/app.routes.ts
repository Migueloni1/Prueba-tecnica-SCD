import { Routes } from '@angular/router';

export const rutas: Routes = [
  {
    path: '',
    loadComponent: () => import('./componentes/lista-registros/lista-registros').then((modulo) => modulo.ListaRegistros)
  },
  {
    path: 'nuevo',
    loadComponent: () => import('./componentes/formulario-registro/formulario-registro')
      .then((modulo) => modulo.FormularioRegistro)
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./componentes/formulario-registro/formulario-registro')
      .then((modulo) => modulo.FormularioRegistro)
  },
  {
    path: 'ver/:id',
    loadComponent: () => import('./componentes/detalle-registro/detalle-registro')
      .then((modulo) => modulo.DetalleRegistro)
  },
  { path: '**', redirectTo: '' }
];
