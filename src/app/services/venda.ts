import { Injectable } from '@angular/core';

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
  private readonly STORAGE_KEY = 'delivery_vendas';

  constructor() { 
    if (typeof localStorage !== 'undefined') {
      this.inicializarDadosDemonstrativos();
    }
  }

  obterVendas(): Venda[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }
    const dados = localStorage.getItem(this.STORAGE_KEY);
    if (dados) {
      return JSON.parse(dados);
    }
    return [];
  }

  obterVendasDoDia(): Venda[] {
    const vendas = this.obterVendas();
    const hoje = new Date();
    const dataHoje = hoje.toLocaleDateString('pt-BR');

    return vendas.filter(venda => {
      const dataVenda = new Date(venda.dataHora).toLocaleDateString('pt-BR');
      return dataVenda === dataHoje;
    });
  }

  adicionarVenda(novaVenda: Omit<Venda, 'id' | 'dataHora'>): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    const vendas = this.obterVendas();
    
    const venda: Venda = {
      id: this.gerarId(),
      ...novaVenda,
      dataHora: new Date().toISOString()
    };

    vendas.push(venda);
    this.salvarNoStorage(vendas);
  }

  removerVenda(id: string): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    const vendas = this.obterVendas().filter(v => v.id !== id);
    this.salvarNoStorage(vendas);
  }

  atualizarVenda(vendaAtualizada: Venda): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    const vendas = this.obterVendas().map(v => 
      v.id === vendaAtualizada.id ? vendaAtualizada : v
    );
    this.salvarNoStorage(vendas);
  }

  private salvarNoStorage(vendas: Venda[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(vendas));
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

  private inicializarDadosDemonstrativos(): void {
    const dado = localStorage.getItem(this.STORAGE_KEY);
    
    if (!dado) {
      const hoje = new Date();
      const vendaHoje = (dataHora: string): string => {
        const data = new Date(dataHora);
        data.setHours(hoje.getHours(), hoje.getMinutes());
        return data.toISOString();
      };

      const vendasDemonstrativos: Venda[] = [
        {
          id: this.gerarId(),
          nomeProduto: 'X-Burguer Duplo',
          categoria: 'Lanches',
          preco: 25.00,
          quantidade: 2,
          total: 50.00,
          dataHora: vendaHoje('2026-03-12T10:30:00')
        },
        {
          id: this.gerarId(),
          nomeProduto: 'Refrigerante 2L',
          categoria: 'Bebidas',
          preco: 8.50,
          quantidade: 3,
          total: 25.50,
          dataHora: vendaHoje('2026-03-12T10:45:00')
        },
        {
          id: this.gerarId(),
          nomeProduto: 'Sorvete Sundae',
          categoria: 'Sobremesas',
          preco: 12.00,
          quantidade: 1,
          total: 12.00,
          dataHora: vendaHoje('2026-03-12T11:15:00')
        },
        {
          id: this.gerarId(),
          nomeProduto: 'Pizza Grande',
          categoria: 'Lanches',
          preco: 45.00,
          quantidade: 1,
          total: 45.00,
          dataHora: vendaHoje('2026-03-12T11:30:00')
        },
        {
          id: this.gerarId(),
          nomeProduto: 'Suco Natural',
          categoria: 'Bebidas',
          preco: 7.00,
          quantidade: 2,
          total: 14.00,
          dataHora: vendaHoje('2026-03-12T12:00:00')
        }
      ];

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(vendasDemonstrativos));
    }
  }

  private gerarId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
