import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminosycondicionesComponent } from './terminosycondiciones.component';

describe('TerminosycondicionesComponent', () => {
  let component: TerminosycondicionesComponent;
  let fixture: ComponentFixture<TerminosycondicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminosycondicionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminosycondicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
