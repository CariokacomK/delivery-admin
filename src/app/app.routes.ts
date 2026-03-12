import { Routes } from '@angular/router';
import { CategoriaCrudComponent } from './pages/categoria-crud/categoria-crud';
import { Configuracoes } from './pages/configuracoes/configuracoes';
import { DashboardVendasComponent } from './pages/dashboard-vendas/dashboard-vendas';
import { CategoriasListaComponent } from './pages/categorias-lista/categorias-lista.component';

export const routes: Routes = [
  { path: 'dashboard-vendas', component: DashboardVendasComponent },
  { path: 'categorias-lista', component: CategoriasListaComponent},
  { path: 'crud-produto', component: CategoriaCrudComponent },
  { path: 'configuracoes', component: Configuracoes },
  { path: '', redirectTo: '/dashboard-vendas', pathMatch: 'full' }
];
