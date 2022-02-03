import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaCapturistaComponent } from './vista-capturista.component';

describe('VistaCapturistaComponent', () => {
  let component: VistaCapturistaComponent;
  let fixture: ComponentFixture<VistaCapturistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaCapturistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaCapturistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
