import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceNotRecognisedComponent } from './face-not-recognised.component';

describe('FaceNotRecognisedComponent', () => {
  let component: FaceNotRecognisedComponent;
  let fixture: ComponentFixture<FaceNotRecognisedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaceNotRecognisedComponent]
    });
    fixture = TestBed.createComponent(FaceNotRecognisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
