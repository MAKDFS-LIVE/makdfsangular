import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoonComponent } from './soon.component';

describe('SoonComponent', () => {
  let component: SoonComponent;
  let fixture: ComponentFixture<SoonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoonComponent]
    });
    fixture = TestBed.createComponent(SoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
