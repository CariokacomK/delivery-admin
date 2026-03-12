import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaCrudComponent } from './categoria-crud';

describe('CategoriaCrud', () => {
  let component: CategoriaCrudComponent;
  let fixture: ComponentFixture<CategoriaCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaCrudComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaCrudComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
