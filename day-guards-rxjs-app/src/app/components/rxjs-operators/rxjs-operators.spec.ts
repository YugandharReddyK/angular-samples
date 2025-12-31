import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsOperators } from './rxjs-operators';

describe('RxjsOperators', () => {
  let component: RxjsOperators;
  let fixture: ComponentFixture<RxjsOperators>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsOperators]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsOperators);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
