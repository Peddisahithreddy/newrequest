import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkAttendanceFormComponent } from './mark-attendance-form.component';

describe('MarkAttendanceFormComponent', () => {
  let component: MarkAttendanceFormComponent;
  let fixture: ComponentFixture<MarkAttendanceFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkAttendanceFormComponent]
    });
    fixture = TestBed.createComponent(MarkAttendanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
