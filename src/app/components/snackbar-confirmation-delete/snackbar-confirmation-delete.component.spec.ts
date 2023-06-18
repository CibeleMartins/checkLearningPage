import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarConfirmationDeleteComponent } from './snackbar-confirmation-delete.component';

describe('SnackbarConfirmationDeleteComponent', () => {
  let component: SnackbarConfirmationDeleteComponent;
  let fixture: ComponentFixture<SnackbarConfirmationDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbarConfirmationDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnackbarConfirmationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
