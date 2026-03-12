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
  totalVendas: number = 0;
  quantidadeProdutos: number = 0;
  ticketMedio: number = 0;

  constructor(private vendaService: VendaService) {}

  ngOnInit(): void {
    this.vendas = this.vendaService.obterVendasDoDia();
    this.calcularResumo();
  }

  calcularResumo(): void {
    if (this.vendas.length > 0) {
      this.totalVendas = this.vendas.reduce((total, venda) => total + venda.total, 0);
      this.quantidadeProdutos = this.vendas.reduce((total, venda) => total + venda.quantidade, 0);
      this.ticketMedio = this.totalVendas / this.vendas.length;
    }
  }

  formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }
}
