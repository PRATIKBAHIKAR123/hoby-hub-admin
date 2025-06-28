import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonsColumnComponent } from './action-buttons-column.component';

describe('ActionButtonsColumnComponent', () => {
  let component: ActionButtonsColumnComponent;
  let fixture: ComponentFixture<ActionButtonsColumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionButtonsColumnComponent]
    });
    fixture = TestBed.createComponent(ActionButtonsColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
