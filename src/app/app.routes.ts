import { Routes } from '@angular/router';
import { CategoriaCrudComponent } from './pages/categoria-crud/categoria-crud';

export const routes: Routes = [
  { path: 'crud-produto', component: CategoriaCrudComponent },
  { path: '', redirectTo: '/crud-produto', pathMatch: 'full' },
  {path: 'configuracoes', loadComponent: () =>
    import('./pages/configuracoes/configuracoes')
    .then(m => m.Configuracoes)
  }
];