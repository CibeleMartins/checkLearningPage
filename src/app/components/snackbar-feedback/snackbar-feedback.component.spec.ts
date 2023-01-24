import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarFeedbackComponent } from './snackbar-feedback.component';

describe('SnackbarFeedbackComponent', () => {
  let component: SnackbarFeedbackComponent;
  let fixture: ComponentFixture<SnackbarFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbarFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackbarFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
