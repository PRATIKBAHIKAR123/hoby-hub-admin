import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropImagePopupComponent } from './crop-image-popup.component';

describe('CropImagePopupComponent', () => {
  let component: CropImagePopupComponent;
  let fixture: ComponentFixture<CropImagePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CropImagePopupComponent]
    });
    fixture = TestBed.createComponent(CropImagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
