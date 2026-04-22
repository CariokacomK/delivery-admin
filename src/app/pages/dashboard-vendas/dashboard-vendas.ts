import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendaService, Venda } from '../../services/venda';

@Component({
  selector: 'app-dashboard-vendas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard-vendas.html',
  styleUrls: ['./dashboard-vendas.css']
})
export class DashboardVendasComponent implements OnInit {
  vendas: Venda[] = [];
  vendaForm!: FormGroup;
  editandoVendaId: string | null = null;
  mostrarFormulario = false;

  constructor(
    private vendaService: VendaService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.atualizarLista();
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.vendaForm = this.fb.group({
      nomeProduto: ['', [Validators.required, Validators.minLength(3)]],
      categoria: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0.01)]],
      quantidade: [1, [Validators.required, Validators.min(1)]]
    });
  }

  atualizarLista(): void {
    this.vendaService.obterVendasDoDia().subscribe(vendas => {
      this.vendas = vendas;
    });
  }

  salvarVenda(): void {
    if (this.vendaForm.valid) {
      const dadosForm = this.vendaForm.value;
      const total = dadosForm.preco * dadosForm.quantidade;
      
      if (this.editandoVendaId) {
        const vendaExistente = this.vendas.find(v => v.id === this.editandoVendaId);
        if (vendaExistente) {
          const vendaAtualizada: Venda = {
            ...vendaExistente,
            ...dadosForm,
            total
          };
          this.vendaService.atualizarVenda(vendaAtualizada).subscribe(() => {
            this.resetarFormulario();
            this.atualizarLista();
          });
        }
      } else {
        this.vendaService.adicionarVenda({
          ...dadosForm,
          total
        }).subscribe(() => {
          this.resetarFormulario();
          this.atualizarLista();
        });
      }
    } else {
      this.vendaForm.markAllAsTouched();
    }
  }

  editarVenda(venda: Venda): void {
    this.editandoVendaId = venda.id;
    this.mostrarFormulario = true;
    this.vendaForm.patchValue({
      nomeProduto: venda.nomeProduto,
      categoria: venda.categoria,
      preco: venda.preco,
      quantidade: venda.quantidade
    });
  }

  excluirVenda(id: string): void {
    if (confirm('Tem certeza que deseja excluir esta venda?')) {
      this.vendaService.removerVenda(id).subscribe(() => {
        this.atualizarLista();
      });
    }
  }

  resetarFormulario(): void {
    this.vendaForm.reset({ preco: 0, quantidade: 1 });
    this.editandoVendaId = null;
    this.mostrarFormulario = false;
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
