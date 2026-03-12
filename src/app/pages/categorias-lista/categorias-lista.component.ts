import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categorias-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorias-lista.component.html',
  styleUrl: './categorias-lista.component.css'
})
export class CategoriasListaComponent {

  categorias = [
    { nome: 'Lanches', icone: '🍔' },
    { nome: 'Bebidas', icone: '🥤' },
    { nome: 'Sobremesas', icone: '🍰' }
  ];

  constructor(private router: Router) {}

  cadastrarNovoProduto() {
    this.router.navigate(['/crud-produto']);
  }
}
