import { Routes } from '@angular/router';
import { CategoriaCrudComponent } from './pages/categoria-crud/categoria-crud';
import { DashboardVendasComponent } from './pages/dashboard-vendas/dashboard-vendas';

export const routes: Routes = [
  { path: 'dashboard-vendas', component: DashboardVendasComponent },
  { path: 'crud-produto', component: CategoriaCrudComponent },
  { path: '', redirectTo: '/dashboard-vendas', pathMatch: 'full' }
];