import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveimageComponent } from './saveimage.component';

describe('SaveimageComponent', () => {
  let component: SaveimageComponent;
  let fixture: ComponentFixture<SaveimageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveimageComponent]
    });
    fixture = TestBed.createComponent(SaveimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
