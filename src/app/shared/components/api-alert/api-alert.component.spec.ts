import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiAlertComponent } from './api-alert.component';

describe('ApiAlertComponent', () => {
  let component: ApiAlertComponent;
  let fixture: ComponentFixture<ApiAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
