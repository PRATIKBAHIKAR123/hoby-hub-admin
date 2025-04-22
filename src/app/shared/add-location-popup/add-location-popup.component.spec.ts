import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocationPopupComponent } from './add-location-popup.component';

describe('AddLocationPopupComponent', () => {
  let component: AddLocationPopupComponent;
  let fixture: ComponentFixture<AddLocationPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLocationPopupComponent]
    });
    fixture = TestBed.createComponent(AddLocationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
