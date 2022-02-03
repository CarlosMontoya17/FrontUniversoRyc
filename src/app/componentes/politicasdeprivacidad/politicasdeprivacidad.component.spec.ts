import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticasdeprivacidadComponent } from './politicasdeprivacidad.component';

describe('PoliticasdeprivacidadComponent', () => {
  let component: PoliticasdeprivacidadComponent;
  let fixture: ComponentFixture<PoliticasdeprivacidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticasdeprivacidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticasdeprivacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
