import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalConformationComponent } from './final-conformation.component';

describe('FinalConformationComponent', () => {
  let component: FinalConformationComponent;
  let fixture: ComponentFixture<FinalConformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalConformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalConformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
