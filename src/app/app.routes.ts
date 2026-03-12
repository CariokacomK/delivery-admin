import { Routes } from '@angular/router';
import { CategoriaCrudComponent } from './pages/categoria-crud/categoria-crud';
import { CategoriasListaComponent } from './pages/categorias-lista/categorias-lista.component';

export const routes: Routes = [
  {path: 'categorias', component: CategoriasListaComponent},

  { path: 'crud-produto', component: CategoriaCrudComponent },
  { path: '', redirectTo: '/categorias', pathMatch: 'full' }
];
