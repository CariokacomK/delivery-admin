import { Routes } from '@angular/router';
import { CategoriaCrudComponent } from './pages/categoria-crud/categoria-crud';
import { CardapioComponent } from './pages/cardapio/cardapio';

export const routes: Routes = [
  { path: 'crud-produto', component: CategoriaCrudComponent },
  { path: 'cardapio', component: CardapioComponent },
  { path: '', redirectTo: '/cardapio', pathMatch: 'full' }
];