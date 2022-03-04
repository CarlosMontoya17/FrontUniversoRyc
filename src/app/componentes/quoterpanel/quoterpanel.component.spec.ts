import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoterpanelComponent } from './quoterpanel.component';

describe('QuoterpanelComponent', () => {
  let component: QuoterpanelComponent;
  let fixture: ComponentFixture<QuoterpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoterpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoterpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
