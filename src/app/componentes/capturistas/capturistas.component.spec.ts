import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturistasComponent } from './capturistas.component';

describe('CapturistasComponent', () => {
  let component: CapturistasComponent;
  let fixture: ComponentFixture<CapturistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapturistasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
