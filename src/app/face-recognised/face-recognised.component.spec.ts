import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceRecognisedComponent } from './face-recognised.component';

describe('FaceRecognisedComponent', () => {
  let component: FaceRecognisedComponent;
  let fixture: ComponentFixture<FaceRecognisedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaceRecognisedComponent]
    });
    fixture = TestBed.createComponent(FaceRecognisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
