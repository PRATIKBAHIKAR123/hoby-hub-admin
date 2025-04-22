import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsRegisteredComponent } from './programs-registered.component';

describe('ProgramsRegisteredComponent', () => {
  let component: ProgramsRegisteredComponent;
  let fixture: ComponentFixture<ProgramsRegisteredComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramsRegisteredComponent]
    });
    fixture = TestBed.createComponent(ProgramsRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
