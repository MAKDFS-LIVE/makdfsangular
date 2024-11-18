import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingProfileComponent } from './pending-profile.component';

describe('PendingProfileComponent', () => {
  let component: PendingProfileComponent;
  let fixture: ComponentFixture<PendingProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingProfileComponent]
    });
    fixture = TestBed.createComponent(PendingProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
