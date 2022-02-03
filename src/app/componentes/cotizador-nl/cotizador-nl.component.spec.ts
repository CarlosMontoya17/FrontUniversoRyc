import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizadorNlComponent } from './cotizador-nl.component';

describe('CotizadorNlComponent', () => {
  let component: CotizadorNlComponent;
  let fixture: ComponentFixture<CotizadorNlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizadorNlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizadorNlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
