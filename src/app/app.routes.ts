import { Routes } from '@angular/router';
import { CardapioComponent } from './pages/cardapio/cardapio';
import { CupomComponent } from './pages/cupons/cupons';
import { DashboardVendasComponent } from './pages/dashboard-vendas/dashboard-vendas';
import { CategoriasComponent } from './pages/categorias/categorias';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios';

export const routes: Routes = [
  { path: 'dashboard-vendas', component: DashboardVendasComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'categorias-lista', redirectTo: 'categorias', pathMatch: 'full' },
  { path: 'crud-produto', redirectTo: 'categorias', pathMatch: 'full' },
  { path: 'cardapio', component: CardapioComponent },
  { path: 'cupons', component: CupomComponent },
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: '', redirectTo: '/cardapio', pathMatch: 'full' }

];
