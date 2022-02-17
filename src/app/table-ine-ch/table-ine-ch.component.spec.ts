import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableIneChComponent } from './table-ine-ch.component';

describe('TableIneChComponent', () => {
  let component: TableIneChComponent;
  let fixture: ComponentFixture<TableIneChComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableIneChComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableIneChComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
