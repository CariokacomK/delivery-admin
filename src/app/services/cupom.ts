import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cupom {
  id?: number;
  codigo: string;
  desconto: number;
  ativo: boolean;
}

type CupomPayload = Omit<Cupom, 'id'>;

@Injectable({
  providedIn: 'root'
})
export class CupomService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/cupons';

  listarCupons(): Observable<Cupom[]> {
    return this.http.get<Cupom[]>(this.apiUrl);
  }

  adicionarCupom(cupom: CupomPayload): Observable<Cupom> {
    return this.http.post<Cupom>(this.apiUrl, cupom);
  }

  atualizarCupom(id: number, cupom: CupomPayload): Observable<Cupom> {
    return this.http.put<Cupom>(`${this.apiUrl}/${id}`, cupom);
  }

  removerCupom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
