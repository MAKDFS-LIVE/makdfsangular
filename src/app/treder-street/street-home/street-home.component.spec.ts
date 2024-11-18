import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetHomeComponent } from './street-home.component';

describe('StreetHomeComponent', () => {
  let component: StreetHomeComponent;
  let fixture: ComponentFixture<StreetHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StreetHomeComponent]
    });
    fixture = TestBed.createComponent(StreetHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
