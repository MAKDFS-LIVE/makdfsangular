import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestrefferComponent } from './investreffer.component';

describe('InvestrefferComponent', () => {
  let component: InvestrefferComponent;
  let fixture: ComponentFixture<InvestrefferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestrefferComponent]
    });
    fixture = TestBed.createComponent(InvestrefferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
