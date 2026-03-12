import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'crud-produto',
    loadComponent: () =>
      import('./pages/categoria-crud/categoria-crud')
        .then(m => m.CategoriaCrudComponent)
  },
  { path: '', redirectTo: '/crud-produto', pathMatch: 'full' },
  {
    path: 'configuracoes',
    loadComponent: () =>
      import('./pages/configuracoes/configuracoes')
        .then(m => m.Configuracoes)
  }
];