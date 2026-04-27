import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cardapio.html'
})
export class CardapioComponent implements OnInit {
  produtos: any[] = [];
  categorias: string[] = ['Todos', 'Lanches', 'Bebidas', 'Sobremesas'];
  filtro: string = 'Todos';

  // Controle do CRUD
  exibirModal: boolean = false;
  item: any = { nome: '', categoria: '', preco: 0, descricao: '' };
  indexEditando: number | null = null;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtos = this.produtoService.obterProdutos();
  }

  salvar(): void {
    if (this.indexEditando !== null) {
      this.produtos[this.indexEditando] = { ...this.item };
    } else {
      this.produtos.push({ ...this.item });
    }
    this.fecharModal();
  }

  editar(i: number): void {
    this.item = { ...this.produtos[i] };
    this.indexEditando = i;
    this.exibirModal = true;
  }

  excluir(i: number): void {
    if(confirm('Remover este item?')) this.produtos.splice(i, 1);
  }

  fecharModal(): void {
    this.item = { nome: '', categoria: '', preco: 0, descricao: '' };
    this.indexEditando = null;
    this.exibirModal = false;
  }

  get produtosFiltrados() {
    return this.filtro === 'Todos' ? this.produtos : this.produtos.filter(p => p.categoria === this.filtro);
  }
}