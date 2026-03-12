import { Injectable } from '@angular/core';

export interface Produto {
  nome: string;
  preco: number;
  categoria: string;
  descricao?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private produtos: Produto[] = [];

  constructor() {
    this.carregarProdutos();
  }

  obterProdutos(): Produto[] {
    return this.produtos;
  }

  private carregarProdutos(): void {
    this.produtos = [
      { nome: 'Duplo Salada', preco: 22.00, categoria: 'Lanches', descricao: 'Hambúrguer duplo com salada fresca' },
      { nome: 'Duplo com Ovo', preco: 26.00, categoria: 'Lanches', descricao: 'Hambúrguer duplo com ovo frito' },
      { nome: 'Duplo Cheddar', preco: 28.00, categoria: 'Lanches', descricao: 'Hambúrguer duplo com muito queijo cheddar' },
      { nome: 'Duplo Bacon', preco: 30.00, categoria: 'Lanches', descricao: 'Hambúrguer duplo crocante com bacon' },
      { nome: 'Pizza Calabresa', preco: 45.00, categoria: 'Lanches', descricao: 'Pizza grande com calabresa' },
      { nome: 'Coca-Cola 2L', preco: 12.00, categoria: 'Bebidas', descricao: 'Bebida gelada' },
      { nome: 'Fanta Uva', preco: 10.00, categoria: 'Bebidas', descricao: 'Refrigerante sabor uva' },
      { nome: 'Guaraná 2L', preco: 11.00, categoria: 'Bebidas', descricao: 'Guaraná bem gelado' },
      { nome: 'Suco Natural', preco: 8.50, categoria: 'Bebidas', descricao: 'Suco fresquinho do dia' },
      { nome: 'Sorvete de Baunilha', preco: 15.00, categoria: 'Sobremesas', descricao: 'Sorvete cremoso' },
      { nome: 'Pudim de Leite', preco: 12.00, categoria: 'Sobremesas', descricao: 'Pudim caseiro delicioso' },
      { nome: 'Brownie com Sorvete', preco: 18.00, categoria: 'Sobremesas', descricao: 'Brownie quente com sorvete' }
    ];
  }
}
