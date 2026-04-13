import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupomComponent } from './cupons';

describe('CupomComponent', () => {
  let component: CupomComponent;
  let fixture: ComponentFixture<CupomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CupomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CupomComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
