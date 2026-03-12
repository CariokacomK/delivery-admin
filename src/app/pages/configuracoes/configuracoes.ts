import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-configuracoes',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSnackBarModule,
  ],
  templateUrl: './configuracoes.html',
  styleUrl: './configuracoes.css',
})

export class Configuracoes implements OnInit {
  form!: FormGroup;

  diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      historia: [''],
      taxaEntrega: [0],
      endereco: this.fb.group({
        rua: [''],
        numero: [''],
        bairro: [''],
        cidade: [''],
        cep: [''],
      }),
      horarios: this.fb.array(
        this.diasSemana.map(dia => this.fb.group({
          dia: [dia],
          abertura: ['08:00'],
          fechamento: ['18:00'],
          aberto: [true]
        }))
      )
    });

    const salvo = localStorage.getItem('configuracoes-loja');
    if (salvo) {
      this.form.patchValue(JSON.parse(salvo));
    }
  }

  get horarios(): FormArray {
    return this.form.get('horarios') as FormArray;
  }

  salvar(): void {
    localStorage.setItem('configuracoes-loja', JSON.stringify(this.form.value));
    this.snackBar.open('Configurações salvas com sucesso!', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}