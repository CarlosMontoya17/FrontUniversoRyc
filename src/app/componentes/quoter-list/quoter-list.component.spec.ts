import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoterListComponent } from './quoter-list.component';

describe('QuoterListComponent', () => {
  let component: QuoterListComponent;
  let fixture: ComponentFixture<QuoterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
