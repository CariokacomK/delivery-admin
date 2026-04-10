import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosComponent } from './funcionarios';

describe('Funcionarios', () => {
  let component: FuncionariosComponent;
  let fixture: ComponentFixture<FuncionariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionariosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FuncionariosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
