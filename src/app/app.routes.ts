import { Routes } from '@angular/router';
import { CategoriaCrudComponent } from './pages/categoria-crud/categoria-crud';
import { CardapioComponent } from './pages/cardapio/cardapio';
import { Configuracoes } from './pages/configuracoes/configuracoes';
import { DashboardVendasComponent } from './pages/dashboard-vendas/dashboard-vendas';
import { CategoriasListaComponent } from './pages/categorias-lista/categorias-lista.component';

export const routes: Routes = [
  { path: 'dashboard-vendas', component: DashboardVendasComponent },
  { path: 'categorias-lista', component: CategoriasListaComponent},
  { path: 'crud-produto', component: CategoriaCrudComponent },
  { path: 'cardapio', component: CardapioComponent },
  { path: 'configuracoes', component: Configuracoes },
  { path: '', redirectTo: '/cardapio', pathMatch: 'full' }
];