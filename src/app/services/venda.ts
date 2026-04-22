import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Venda {
  id: string;
  nomeProduto: string;
  categoria: string;
  preco: number;
  quantidade: number;
  total: number;
  dataHora: string;
}

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/vendas';

  obterVendas(): Observable<Venda[]> {
    return this.http.get<Venda[]>(this.apiUrl);
  }

  obterVendasDoDia(): Observable<Venda[]> {
    return this.obterVendas().pipe(
      map(vendas => {
        const hoje = new Date().toLocaleDateString('pt-BR');
        return vendas.filter(venda => {
          const dataVenda = new Date(venda.dataHora).toLocaleDateString('pt-BR');
          return dataVenda === hoje;
        });
      })
    );
  }

  adicionarVenda(novaVenda: Omit<Venda, 'id' | 'dataHora'>): Observable<Venda> {
    const venda: Omit<Venda, 'id'> = {
      ...novaVenda,
      dataHora: new Date().toISOString()
    };
    return this.http.post<Venda>(this.apiUrl, venda);
  }

  removerVenda(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  atualizarVenda(vendaAtualizada: Venda): Observable<Venda> {
    return this.http.put<Venda>(`${this.apiUrl}/${vendaAtualizada.id}`, vendaAtualizada);
  }

  calcularTotalVendas(vendas: Venda[]): number {
    return vendas.reduce((total, venda) => total + venda.total, 0);
  }

  calcularQuantidadeProdutos(vendas: Venda[]): number {
    return vendas.reduce((total, venda) => total + venda.quantidade, 0);
  }

  obterProdutoMaisVendido(vendas: Venda[]): { nome: string; quantidade: number } | null {
    if (vendas.length === 0) return null;

    const maisVendido = vendas.reduce((prev, curr) =>
      curr.quantidade > prev.quantidade ? curr : prev
    );

    return {
      nome: maisVendido.nomeProduto,
      quantidade: maisVendido.quantidade
    };
  }

  obterCategoriaMaisVendida(vendas: Venda[]): { categoria: string; total: number } | null {
    if (vendas.length === 0) return null;

    const categoriasMap = new Map<string, number>();

    vendas.forEach(venda => {
      const atual = categoriasMap.get(venda.categoria) || 0;
      categoriasMap.set(venda.categoria, atual + venda.quantidade);
    });

    let categoriaMais = '';
    let maiorQuantidade = 0;

    categoriasMap.forEach((quantidade, categoria) => {
      if (quantidade > maiorQuantidade) {
        maiorQuantidade = quantidade;
        categoriaMais = categoria;
      }
    });

    return {
      categoria: categoriaMais,
      total: maiorQuantidade
    };
  }
}
