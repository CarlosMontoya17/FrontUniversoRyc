import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoterpriorityComponent } from './quoterpriority.component';

describe('QuoterpriorityComponent', () => {
  let component: QuoterpriorityComponent;
  let fixture: ComponentFixture<QuoterpriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoterpriorityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoterpriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
