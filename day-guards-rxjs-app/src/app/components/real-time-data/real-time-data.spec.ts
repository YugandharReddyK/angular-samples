import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeData } from './real-time-data';

describe('RealTimeData', () => {
  let component: RealTimeData;
  let fixture: ComponentFixture<RealTimeData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealTimeData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealTimeData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
