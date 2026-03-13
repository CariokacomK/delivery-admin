import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendaService, Venda } from '../../services/venda';

@Component({
  selector: 'app-dashboard-vendas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-vendas.html',
  styleUrls: ['./dashboard-vendas.css']
})
export class DashboardVendasComponent implements OnInit {
  vendas: Venda[] = [];

  constructor(private vendaService: VendaService) {}

  ngOnInit(): void {
    this.vendas = this.vendaService.obterVendasDoDia();
  }

  formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  calcularTotal(): number {
    return this.vendas.reduce((total, venda) => total + venda.total, 0);
  }

  calcularQuantidade(): number {
    return this.vendas.reduce((total, venda) => total + venda.quantidade, 0);
  }

  calcularTicketMedio(): number {
    if (this.vendas.length === 0) return 0;
    return this.calcularTotal() / this.vendas.length;
  }
}
