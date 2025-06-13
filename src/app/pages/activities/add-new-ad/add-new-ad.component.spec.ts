import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAdComponent } from './add-new-ad.component';

describe('AddNewAdComponent', () => {
  let component: AddNewAdComponent;
  let fixture: ComponentFixture<AddNewAdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewAdComponent]
    });
    fixture = TestBed.createComponent(AddNewAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
