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
  private readonly STORAGE_KEY = 'delivery_produtos';

  constructor() { }

  obterProdutos(): Produto[] {
    const dados = localStorage.getItem(this.STORAGE_KEY);
    if (dados) {
      return JSON.parse(dados);
    }
    return [];
  }

  adicionarProduto(novoProduto: Produto): void {
    const produtosAtuais = this.obterProdutos();
    
    produtosAtuais.push(novoProduto);
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(produtosAtuais));
  }
}