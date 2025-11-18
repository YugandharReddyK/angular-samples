import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDashboard } from './status-dashboard';

describe('StatusDashboard', () => {
  let component: StatusDashboard;
  let fixture: ComponentFixture<StatusDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
