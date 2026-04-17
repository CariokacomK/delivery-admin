import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Cupom, CupomService } from '../../services/cupom';

@Component({
  selector: 'app-cupom',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cupons.html',
  styleUrl: './cupons.css'
})
export class CupomComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly cupomService = inject(CupomService);

  cupons: Cupom[] = [];
  editandoId: number | null = null;
  carregando = false;
  erro = '';

  readonly cupomForm = this.fb.group({
    codigo: ['', [Validators.required, Validators.minLength(3)]],
    desconto: [null as number | null, [Validators.required, Validators.min(1), Validators.max(100)]],
    ativo: [true]
  });

  ngOnInit(): void {
    this.carregarCupons();
  }

  get emEdicao(): boolean {
    return this.editandoId !== null;
  }

  carregarCupons(): void {
    this.carregando = true;
    this.erro = '';

    this.cupomService.listarCupons().subscribe({
      next: (cupons) => {
        this.cupons = cupons;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Nao foi possivel carregar os cupons. Verifique se o json-server esta rodando.';
        this.carregando = false;
      }
    });
  }

  salvar(): void {
    if (this.cupomForm.invalid) {
      this.cupomForm.markAllAsTouched();
      return;
    }

    const cupom: Omit<Cupom, 'id'> = {
      codigo: (this.cupomForm.value.codigo ?? '').toUpperCase(),
      desconto: this.cupomForm.value.desconto ?? 0,
      ativo: this.cupomForm.value.ativo ?? true
    };

    const requisicao = this.emEdicao && this.editandoId !== null
      ? this.cupomService.atualizarCupom(this.editandoId, cupom)
      : this.cupomService.adicionarCupom(cupom);

    requisicao.subscribe({
      next: () => {
        this.cancelarEdicao();
        this.carregarCupons();
      },
      error: () => {
        this.erro = 'Nao foi possivel salvar o cupom.';
      }
    });
  }

  editar(cupom: Cupom): void {
    this.editandoId = cupom.id ?? null;
    this.erro = '';
    this.cupomForm.patchValue({
      codigo: cupom.codigo,
      desconto: cupom.desconto,
      ativo: cupom.ativo
    });
  }

  excluir(cupom: Cupom): void {
    if (!cupom.id) return;

    const confirmou = globalThis.confirm?.(`Deseja excluir o cupom "${cupom.codigo}"?`) ?? true;
    if (!confirmou) return;

    this.cupomService.removerCupom(cupom.id).subscribe({
      next: () => {
        if (this.editandoId === cupom.id) {
          this.cancelarEdicao();
        }
        this.carregarCupons();
      },
      error: () => {
        this.erro = 'Nao foi possivel excluir o cupom.';
      }
    });
  }

  cancelarEdicao(): void {
    this.editandoId = null;
    this.erro = '';
    this.cupomForm.reset({ codigo: '', desconto: null, ativo: true });
  }

  trackById(_: number, cupom: Cupom): number | string {
    return cupom.id ?? cupom.codigo;
  }
}
