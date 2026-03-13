import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardapio.html',
  styleUrl: './cardapio.css'
})
export class CardapioComponent implements OnInit {
  produtos: any[] = [];
  categorias: string[] = [];
  categoriaSelecionada: string = 'Todos';

  iconesDosProdutos: any = {
    'Duplo Salada': '🍔',
    'Duplo com Ovo': '🍳',
    'Duplo Cheddar': '🧀',
    'Duplo Bacon': '🥓',
    'Pizza Calabresa': '🍕',
    'Coca-Cola 2L': '🥤',
    'Fanta Uva': '🍇',
    'Guaraná 2L': '🥤',
    'Suco Natural': '🧃',
    'Sorvete de Baunilha': '🍦',
    'Pudim de Leite': '🍮',
    'Brownie com Sorvete': '🍫'
  };

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    let todosOsProdutos: any[] = this.produtoService.obterProdutos();
    
    this.produtos = todosOsProdutos.map(p => {
      p.quantidade = 1;
      p.icone = this.iconesDosProdutos[p.nome] || '🍽️';
      return p;
    });
    
    this.extrairCategorias();
  }

  extrairCategorias(): void {
    let categoriasUnicas: string[] = [];
    for (let produto of this.produtos) {
      if (!categoriasUnicas.includes(produto.categoria)) {
        categoriasUnicas.push(produto.categoria);
      }
    }
    this.categorias = ['Todos', ...categoriasUnicas];
  }

  filtrarProdutos(): any[] {
    if (this.categoriaSelecionada === 'Todos') {
      return this.produtos;
    } else {
      return this.produtos.filter(p => p.categoria === this.categoriaSelecionada);
    }
  }

  selecionarCategoria(categoria: string): void {
    this.categoriaSelecionada = categoria;
  }

  mais(produto: any): void {
    produto.quantidade = produto.quantidade + 1;
  }

  menos(produto: any): void {
    if (produto.quantidade > 1) {
      produto.quantidade = produto.quantidade - 1;
    }
  }
}
