import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-categoria-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria-crud.html',
  styleUrls: ['./categoria-crud.css']
})
export class CategoriaCrudComponent implements OnInit {
  produtoForm!: FormGroup;

  constructor(private fb: FormBuilder, private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      preco: ['', [Validators.required, Validators.min(0.1)]],
      categoria: ['', Validators.required],
      descricao: ['']
    });
  }

  salvarProduto(): void {
    if (this.produtoForm.valid) {
      
      this.produtoService.adicionarProduto(this.produtoForm.value);
      
      alert('Sucesso! O produto foi salvo no LocalStorage.');
      this.produtoForm.reset();
      
    } else {
      this.produtoForm.markAllAsTouched();
      alert('Preencha os campos obrigatórios corretamente.');
    }
  }
}