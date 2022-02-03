import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeracruzComponent } from './veracruz.component';

describe('VeracruzComponent', () => {
  let component: VeracruzComponent;
  let fixture: ComponentFixture<VeracruzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeracruzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeracruzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
