import { Routes } from '@angular/router';
import { CategoriaCrudComponent } from './pages/categoria-crud/categoria-crud';
import { Configuracoes } from './pages/configuracoes/configuracoes';

export const routes: Routes = [
  { path: 'crud-produto', component: CategoriaCrudComponent },
  { path: 'configuracoes', component: Configuracoes },
  { path: '', redirectTo: '/crud-produto', pathMatch: 'full' },
];