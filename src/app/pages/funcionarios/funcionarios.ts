import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '../../services/funcionario';

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ESSENCIAL para o HTML funcionar
  templateUrl: './funcionarios.html',
  styleUrl: './funcionarios.css',
})
export class FuncionariosComponent implements OnInit {
  funcionarioForm!: FormGroup;
  funcionarios: any[] = [];
  editandoId: number | null = null;

  constructor(private fb: FormBuilder, private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
    this.funcionarioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cargo: ['', Validators.required],
      cpf: ['', Validators.required],
      telefone: ['']
    });
    this.atualizarLista();
  }

  atualizarLista() {
    this.funcionarios = this.funcionarioService.obterFuncionarios();
  }

  salvar() {
    if (this.funcionarioForm.valid) {
      const dados = this.funcionarioForm.value;
      if (this.editandoId) {
        this.funcionarioService.editarFuncionario(this.editandoId, dados);
      } else {
        this.funcionarioService.adicionarFuncionario(dados);
      }
      this.cancelarEdicao();
      this.atualizarLista();
    }
  }

  editar(f: any) {
    this.editandoId = f.id;
    this.funcionarioForm.patchValue(f);
  }

  excluir(id: number) {
    this.funcionarioService.removerFuncionario(id);
    this.atualizarLista();
  }

  cancelarEdicao() {
    this.editandoId = null;
    this.funcionarioForm.reset();
  }
}
