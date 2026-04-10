import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
  cpf: string;
  telefone: string;
}

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private readonly STORAGE_KEY = 'delivery_funcionarios';

  private readonly MOCK_FUNCIONARIOS: Funcionario[] = [
    { id: 1, nome: 'Maria', cargo: 'Gerente', cpf: '123.456.789-00', telefone: '(11) 99999-8888' },
    { id: 2, nome: 'Bruno', cargo: 'Cozinheiro', cpf: '987.654.321-11', telefone: '(11) 97777-6666' },
    { id: 3, nome: 'Gabriel', cargo: 'Cozinheiro', cpf: '123.654.321-11', telefone: '(11) 97777-2222' },
    { id: 4, nome: 'Rodrigo', cargo: 'Entregador', cpf: '987.123.321-22', telefone: '(11) 97777-3333' },
    { id: 5, nome: 'Nicolas', cargo: 'Atendente', cpf: '987.654.123-33', telefone: '(11) 97777-4444' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  obterFuncionarios(): Funcionario[] {
    if (isPlatformBrowser(this.platformId)) {
      const dados = localStorage.getItem(this.STORAGE_KEY);
      if (dados && dados !== '[]') {
        return JSON.parse(dados);
      } else {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.MOCK_FUNCIONARIOS));
        return [...this.MOCK_FUNCIONARIOS];
      }
    }
    return [...this.MOCK_FUNCIONARIOS];
  }

  adicionarFuncionario(novo: Funcionario): void {
    if (isPlatformBrowser(this.platformId)) {
      const lista = this.obterFuncionarios();
      novo.id = Date.now();
      lista.push(novo);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
    }
  }

  editarFuncionario(id: number, dadosAtualizados: Funcionario): void {
    if (isPlatformBrowser(this.platformId)) {
      let lista = this.obterFuncionarios();
      const index = lista.findIndex(f => f.id === id);
      if (index !== -1) {
        lista[index] = { ...dadosAtualizados, id: id };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
      }
    }
  }

  removerFuncionario(id: number): void {
    if (isPlatformBrowser(this.platformId)) {
      let lista = this.obterFuncionarios();
      lista = lista.filter(f => f.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
    }
  }
}
