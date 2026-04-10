import { Component, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
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
  private readonly platformId = inject(PLATFORM_ID);
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

    if (isPlatformBrowser(this.platformId)) {
      const salvo = localStorage.getItem('configuracoes-loja');
      if (salvo) {
        this.form.patchValue(JSON.parse(salvo));
      }
    }
  }

  get horarios(): FormArray {
    return this.form.get('horarios') as FormArray;
  }

  salvar(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('configuracoes-loja', JSON.stringify(this.form.value));
    }

    this.snackBar.open('Configurações salvas com sucesso!', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}