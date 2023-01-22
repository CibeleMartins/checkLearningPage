import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutLoginRegistrationComponent } from './layout-login-registration.component';

describe('LayoutLoginRegistrationComponent', () => {
  let component: LayoutLoginRegistrationComponent;
  let fixture: ComponentFixture<LayoutLoginRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutLoginRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutLoginRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
