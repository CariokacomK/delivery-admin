import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardVendasComponent } from './dashboard-vendas';
import { VendaService } from '../../services/venda';

describe('DashboardVendasComponent', () => {
  let component: DashboardVendasComponent;
  let fixture: ComponentFixture<DashboardVendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardVendasComponent],
      providers: [VendaService]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load vendas do dia on init', () => {
    expect(component.vendas).toBeDefined();
  });
});
