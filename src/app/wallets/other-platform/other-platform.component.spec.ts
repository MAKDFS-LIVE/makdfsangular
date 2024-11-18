import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPlatformComponent } from './other-platform.component';

describe('OtherPlatformComponent', () => {
  let component: OtherPlatformComponent;
  let fixture: ComponentFixture<OtherPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherPlatformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
