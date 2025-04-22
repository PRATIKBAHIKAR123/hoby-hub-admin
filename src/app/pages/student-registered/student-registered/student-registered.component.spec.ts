import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegisteredComponent } from './student-registered.component';

describe('StudentRegisteredComponent', () => {
  let component: StudentRegisteredComponent;
  let fixture: ComponentFixture<StudentRegisteredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRegisteredComponent]
    });
    fixture = TestBed.createComponent(StudentRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
