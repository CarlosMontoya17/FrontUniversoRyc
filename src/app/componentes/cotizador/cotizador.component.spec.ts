import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizadorComponent } from './cotizador.component';

describe('CotizadorComponent', () => {
  let component: CotizadorComponent;
  let fixture: ComponentFixture<CotizadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
