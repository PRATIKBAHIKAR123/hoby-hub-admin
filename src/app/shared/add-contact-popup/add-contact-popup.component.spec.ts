import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactPopupComponent } from './add-contact-popup.component';

describe('AddContactPopupComponent', () => {
  let component: AddContactPopupComponent;
  let fixture: ComponentFixture<AddContactPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddContactPopupComponent]
    });
    fixture = TestBed.createComponent(AddContactPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
