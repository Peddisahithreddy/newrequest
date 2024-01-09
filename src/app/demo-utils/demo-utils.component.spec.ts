import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoUtilsComponent } from './demo-utils.component';

describe('DemoUtilsComponent', () => {
  let component: DemoUtilsComponent;
  let fixture: ComponentFixture<DemoUtilsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemoUtilsComponent]
    });
    fixture = TestBed.createComponent(DemoUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
