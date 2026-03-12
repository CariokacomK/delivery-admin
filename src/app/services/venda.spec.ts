import { TestBed } from '@angular/core/testing';
import { VendaService } from './venda';

describe('VendaService', () => {
  let service: VendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a venda', () => {
    const novaVenda = {
      nomeProduto: 'X-Burger',
      categoria: 'Lanches',
      preco: 15.00,
      quantidade: 2,
      total: 30.00
    };

    service.adicionarVenda(novaVenda);
    const vendas = service.obterVendas();

    expect(vendas.length).toBeGreaterThan(0);
  });

  it('should calculate total sales', () => {
    const vendas = [
      {
        id: '1',
        nomeProduto: 'X-Burger',
        categoria: 'Lanches',
        preco: 15.00,
        quantidade: 2,
        total: 30.00,
        dataHora: new Date().toISOString()
      }
    ];

    const total = service.calcularTotalVendas(vendas);
    expect(total).toBe(30.00);
  });
});
