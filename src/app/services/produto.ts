import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Produto {
  nome: string;
  preco: number;
  categoria: string;
  descricao?: string;
  quantidade?: number;
  icone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly STORAGE_KEY = 'delivery_produtos';

  private readonly MOCK_PRODUTOS: Produto[] = [
    { nome: 'Duplo Salada', preco: 25.90, categoria: 'Lanches', descricao: 'Pão, 2 blends bovinos, queijo prato, alface e tomate fresco.' },
    { nome: 'Duplo com Ovo', preco: 27.90, categoria: 'Lanches', descricao: 'Pão, 2 blends bovinos, queijo prato e ovo frito na chapa.' },
    { nome: 'Duplo Cheddar', preco: 29.90, categoria: 'Lanches', descricao: 'Pão australiano, 2 blends bovinos e muito creme de cheddar.' },
    { nome: 'Duplo Bacon', preco: 32.90, categoria: 'Lanches', descricao: 'Pão, 2 blends bovinos, queijo prato e tiras de bacon crocante.' },
    { nome: 'Pizza Calabresa', preco: 45.00, categoria: 'Pizzas', descricao: 'Massa de longa fermentação, molho de tomate, mussarela e calabresa.' },
    { nome: 'Coca-Cola 2L', preco: 12.00, categoria: 'Bebidas', descricao: 'Refrigerante garrafa 2 litros.' },
    { nome: 'Fanta Uva', preco: 8.00, categoria: 'Bebidas', descricao: 'Refrigerante lata 350ml.' },
    { nome: 'Guaraná 2L', preco: 10.00, categoria: 'Bebidas', descricao: 'Refrigerante garrafa 2 litros.' },
    { nome: 'Suco Natural', preco: 9.00, categoria: 'Bebidas', descricao: 'Copo 500ml de suco de laranja espremido na hora.' },
    { nome: 'Sorvete de Baunilha', preco: 15.00, categoria: 'Sobremesas', descricao: 'Duas bolas de sorvete artesanal.' },
    { nome: 'Pudim de Leite', preco: 12.00, categoria: 'Sobremesas', descricao: 'Fatia de pudim caseiro sem furinhos.' },
    { nome: 'Brownie com Sorvete', preco: 22.00, categoria: 'Sobremesas', descricao: 'Brownie de chocolate quentinho acompanhado de sorvete.' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  obterProdutos(): Produto[] {
    if (isPlatformBrowser(this.platformId)) {
      const dados = localStorage.getItem(this.STORAGE_KEY);
      
      if (dados && dados !== '[]') {
        return JSON.parse(dados);
      } else {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.MOCK_PRODUTOS));
        return JSON.parse(JSON.stringify(this.MOCK_PRODUTOS)); 
      }
    }
    
    return JSON.parse(JSON.stringify(this.MOCK_PRODUTOS)); 
  }

  adicionarProduto(novoProduto: Produto): void {
    if (isPlatformBrowser(this.platformId)) {
      const produtosAtuais = this.obterProdutos();
      produtosAtuais.push(novoProduto);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(produtosAtuais));
    }
  }
}