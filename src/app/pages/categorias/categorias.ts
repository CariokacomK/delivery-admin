import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Categoria, CategoriaService } from '../../services/categoria';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css'
})
export class CategoriasComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly categoriaService = inject(CategoriaService);

  categorias: Categoria[] = [];
  editandoId: number | null = null;
  carregando = false;
  erro = '';

  readonly categoriaForm = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    descricao: ['', [Validators.required, Validators.minLength(5)]],
    icone: ['📦', [Validators.required, Validators.maxLength(2)]]
  });

  ngOnInit(): void {
    this.carregarCategorias();
  }

  get emEdicao(): boolean {
    return this.editandoId !== null;
  }

  carregarCategorias(): void {
    this.carregando = true;
    this.erro = '';

    this.categoriaService.listarCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.carregando = false;
      },
      error: () => {
        this.erro = 'Nao foi possivel carregar as categorias. Verifique se o json-server esta rodando.';
        this.carregando = false;
      }
    });
  }

  salvar(): void {
    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();
      return;
    }

    const categoria = {
      nome: this.categoriaForm.value.nome ?? '',
      descricao: this.categoriaForm.value.descricao ?? '',
      icone: this.categoriaForm.value.icone ?? '📦'
    };

    const requisicao = this.emEdicao && this.editandoId !== null
      ? this.categoriaService.atualizarCategoria(this.editandoId, categoria)
      : this.categoriaService.adicionarCategoria(categoria);

    requisicao.subscribe({
      next: () => {
        this.cancelarEdicao();
        this.carregarCategorias();
      },
      error: () => {
        this.erro = 'Nao foi possivel salvar a categoria.';
      }
    });
  }

  editar(categoria: Categoria): void {
    this.editandoId = categoria.id ?? null;
    this.erro = '';
    this.categoriaForm.patchValue({
      nome: categoria.nome,
      descricao: categoria.descricao,
      icone: categoria.icone
    });
  }

  excluir(categoria: Categoria): void {
    if (!categoria.id) {
      return;
    }

    const confirmou = globalThis.confirm?.(`Deseja excluir a categoria "${categoria.nome}"?`) ?? true;
    if (!confirmou) {
      return;
    }

    this.categoriaService.removerCategoria(categoria.id).subscribe({
      next: () => {
        if (this.editandoId === categoria.id) {
          this.cancelarEdicao();
        }
        this.carregarCategorias();
      },
      error: () => {
        this.erro = 'Nao foi possivel excluir a categoria.';
      }
    });
  }

  cancelarEdicao(): void {
    this.editandoId = null;
    this.erro = '';
    this.categoriaForm.reset({
      nome: '',
      descricao: '',
      icone: '📦'
    });
  }

  trackById(_: number, categoria: Categoria): number | string {
    return categoria.id ?? categoria.nome;
  }
}
